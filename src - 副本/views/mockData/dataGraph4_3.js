const data = {
    nodes: [
        {
            id: 'rootId',
            name: '总公司',
            // data: {
            //     value: 'node1',
            // },
            // states: ['hightlight']
        },
        {
            id: 'subTree1',
            name: '邓冠华',
            category:'staff',
            staff:true,
            stockProportion: 30,
            data: { cluster: '员工' } 
        },
        {
            id: 'subTree1-1',
            name: "分公司1-1",
            // combo: "A",
            stockProportion: 90,
            category:'rootCompany',
            data: { cluster: '根公司' }
        },
        {
            id: 'subTree1-1-1',
            name: "分公司1-1-1",
            category:'company',
            combo: "A",
            stockProportion: 100,
        },
        {
            id: 'subTree1-2',
            name: "员工1-2",
            staff: true,
            category:'staff',
            combo: "B",
            stockProportion: 10,
        },
        {
            id: 'subTree1-2-1',
            name: "员工1-2-1",
            category:'company',
            combo: "B",
            staff: true,
            stockProportion: 10,
        },
        {
            id: 'subTree1-2-2',
            name: "员工1-2-2",
            category:'staff',
            staff: true,
            stockProportion: 10,
        },
        {
            id: 'subTree2',
            name: '周明萱',
            category:'staff',
            staff: true,
            stockProportion: 70,
        },
        {
            id: 'subTree2-1',
            name: '分公司2-1',
            category:'company',
            stockProportion: 100,
        },
        {
            id: 'subTree2-1-1',
            name: '分公司2-1-1',
            category:'company',
            staff:true
        },
    ],
    edges: [
        {
            id: 'edges1',
            source: 'rootId',
            target: 'subTree1',
            // states: ['myHighlight']
        },
        {
            id: 'edges2',
            source: 'subTree1',
            target: 'subTree1-1',
        },
        {
            id: 'edges3',
            source: 'subTree1',
            target: 'subTree1-2',
        },
        {
            id: 'edges4',
            source: 'rootId',
            target: 'subTree2',
        },
        {
            id: 'edges5',
            source: 'subTree2',
            target: 'subTree2-1',
        },
        {
            id: 'edges6',
            source: 'subTree1-1',
            target: 'subTree1-1-1',
        },
        {
            id: 'edges7',
            source: 'subTree1',
            target: 'subTree2-1',
        },
        {
            id: 'edges8',
            source: 'subTree1-2',
            target: 'subTree1-2-1',
        },
        {
            id: 'edges9',
            source: 'subTree1-2',
            target: 'subTree1-2-2',
        },
        {
            id: 'edges10',
            source: 'subTree2-1',
            target: 'subTree2-1-1',
        },
        // {
        //     id: 'edges11',
        //     source: 'subTree2-1-1',
        //     target: 'subTree1-1',
        // },
        // {
        //     id: 'edges12',
        //     source: 'subTree1',
        //     target: 'A',
        // },
    ],
    combos: [
        {
            "id": "A",
            "style": {
                "type": "rect"
            }
        },
        {
            "id": "B",
            "style": {
                "type": "rect"
            }
        },
    ]
}

export default data