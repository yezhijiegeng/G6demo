const data = {
    nodes: [
        {
            id: 'rootId',
            name: '总公司',
        },
        {
            id: 'subTree1',
            name: '分公司1',
            stockProportion: 30,
            hightlight: false,
        },
        {
            id: 'subTree1-1',
            name: "分公司1-1",
            stockProportion: 90,
        },
        {
            id: 'subTree1-1-1',
            name: "分公司1-1-1",
            stockProportion: 100,
        },
        {
            id: 'subTree1-2',
            name: "员工1-2",
            staff: true,
            stockProportion: 10,
        },
        {
            id: 'subTree1-2-1',
            name: "员工1-2-1",
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
            source: 'rootId',
            target: 'subTree1',
        },
        {
            source: 'subTree1',
            target: 'subTree1-1',
        },
        {
            source: 'subTree1',
            target: 'subTree1-2',
        },
        {
            source: 'rootId',
            target: 'subTree2',
        },
        {
            source: 'subTree2',
            target: 'subTree2-1',
        },
        {
            source: 'subTree1-1',
            target: 'subTree1-1-1',
        },
        {
            source: 'subTree1',
            target: 'subTree2-1',
        },
        {
            source: 'subTree1-2',
            target: 'subTree1-2-1',
        },
        {
            source: 'subTree1-2',
            target: 'subTree1-2-2',
        },
    ],
}

export default data