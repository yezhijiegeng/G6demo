const data = {
    nodes: [
        {
            id: 'rootId',
            name: '总公司',
            comboId: 'combos0',
        },
        {
            id: 'subTree1',
            name: '分公司1',
            comboId: 'combos1',
            stockProportion: 30,
            hasChild: true,
            collapsed: false,
            hightlight: false,
        },
        {
            id: 'subTree1-1',
            name: "分公司1-1",
            comboId: 'combos1',
            stockProportion: 90,
        },
        {
            id: 'subTree1-1-1',
            name: "分公司1-1-1",
            comboId: 'combos1',
            stockProportion: 100,
        },
        {
            id: 'subTree1-2',
            name: "分公司1-2",
            comboId: 'combos1',
            stockProportion: 10,
        },
        {
            id: 'subTree2',
            name: '分公司2',
            comboId: 'combos2',
            stockProportion: 70,
            hasChild: true,
            collapsed: false,
        },
        {
            id: 'subTree2-1',
            name: '分公司2-1',
            comboId: 'combos2',
            stockProportion: 70,
            hasChild: true,
            collapsed: false,
        },
        {
            id: 'subTree2-2',
            name: '分公司2-2',
            comboId: 'combos2',
            stockProportion: 70,
        },
        {
            id: 'gttzgs1',
            name: '共同投资公司',
            stockProportion: 100,
        },
    ],
    edges: [
        {
            source: 'rootId',
            target: 'subTree1',
        },
        {
            source: 'rootId',
            target: 'subTree1-2',
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
            source: 'subTree2-1',
            target: 'gttzgs1',
        },
        {
            source: 'subTree2-1',
            target: 'subTree2-2',
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
            source: 'subTree1-2',
            target: 'subTree1-1-1',
        },
        {
            source: 'subTree1-2',
            target: 'gttzgs1',
        },
    ],
    combos: [
        {
            id: 'combos0',
        },
        {
            id: 'combos1',
        },
        {
            id: 'combos2',
        },
    ]
}

export default data