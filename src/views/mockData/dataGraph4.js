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
            name: '分公司1',
            stockProportion: 30,
        },
        {
            id: 'subTree1-1',
            name: "分公司1-1",
            // combo: "A",
            stockProportion: 90,
        },
        {
            id: 'subTree1-1-1',
            name: "分公司1-1-1",
            // combo: "A",
            stockProportion: 100,
        },
        {
            id: 'subTree1-2',
            name: "员工1-2",
            staff: true,
            // combo: "B",
            stockProportion: 10,
        },
        {
            id: 'subTree1-2-1',
            name: "员工1-2-1",
            // combo: "B",
            staff: true,
            stockProportion: 10,
        },
        {
            id: 'subTree1-2-2',
            name: "员工1-2-2",
            staff: true,
            stockProportion: 10,
        },
        {
            id: 'subTree2',
            name: '分公司2',
            stockProportion: 70,
        },
        {
            id: 'subTree2-1',
            name: '分公司2-1',
            stockProportion: 100,
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
    ],
    // combos: [
    //     {
    //         "id": "A",
    //         "style": {
    //             "type": "rect"
    //         }
    //     },
    //     {
    //         "id": "B",
    //         "style": {
    //             "type": "rect"
    //         }
    //     },
    // ]
}

export default data