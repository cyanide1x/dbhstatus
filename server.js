const fastify = require('fastify')({ logger: false })
const db = require('quick.db')
const axios = require('axios')
const humanizeDuration = require("humanize-duration");
import('./globals.mjs')

fastify.register(require("point-of-view"), {
    engine: {
        ejs: require("ejs"),
    },
});

fastify.get("/", (req, reply) => {
    reply.view("/templates/views/home.ejs");
});

fastify.get("/status", (req, reply) => {
    reply.view("/templates/views/status.ejs")
})
const start = async () => {
    try {
        await fastify.listen(3000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()

const { nodes } = require("./utils/serverUsage.js");
const nodeData = new db.table("nodeData")

global.humanizeDuration = humanizeDuration
global.nodeData = nodeData
setInterval(async () => {
    let res = await axios({
        url: "https://status.danbot.host/json/stats.json",
        method: 'GET',
        followRedirect: true,
        maxRedirects: 5,
    })
    nodes.Nodes.forEach(node => {
        res.data.servers.forEach(server => {
            if (server.name === node.name) {
                if (server.online4 === false) return nodeData.set(node.data, false)
                nodeData.set(node.data, {
                    servername: server.name,
                    cpu: server.cpu,
                    cpuload: server.load,
                    memused: server.memory_used,
                    memtotal: server.memory_total,
                    swapused: server.swap_used,
                    swaptotal: server.swap_total,
                    diskused: server.hdd_used,
                    disktotal: server.hdd_total,
                    netrx: server.network_rx,
                    nettx: server.network_tx,
                    timestamp: res.data.updated
                })
            }
        })
    })
}, 2000);