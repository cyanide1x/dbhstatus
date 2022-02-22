let nstatus = {
    "Nodes": [{
        name: 'Node 1',
        data: 'node1'
    }, {
        name: 'Node 2',
        data: 'node2'
    }, {
        name: 'Node 3',
        data: 'node3'
    }, {
        name: 'Node 4',
        data: 'node4'
    }, {
        name: 'Node 5',
        data: 'node5'
    },
    {
        name: 'Node 8', 
        data: 'node8' 
    },
    {
        name: 'Node 13',
        data: 'node13'
    }, 
    {
        name: 'Dono-01',
        data: 'dono01'
    },
    {
        name: 'Dono-02',
        data: 'dono02'
    },
    {
        name: 'Dono-03',
        data: 'dono03'
    }]
}

let parse = async() => {
    let toRetun = {};

    for (let [title, data] of Object.entries(nstatus)) {
        let temp = [];
        for (let d of data) {
            let stats = nodeData.get(d.data);
            temp.push(`**${d.name}:** ${stats != null ? `**CPU**: ${stats.cpuload}, **RAM**: ${stats.memused} / ${stats.memtotal}, **SSD**: ${stats.diskused} / ${stats.disktotal}` : 'No Stats available at the moment.'}`)
        }

        toRetun[title] = temp;
    }
    return toRetun;
}

module.exports = {
    nodes: nstatus,
    parse: parse,
}