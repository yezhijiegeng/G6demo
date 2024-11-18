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
        },
        {
            id: 'subTree1-1',
            name: "分公司1-1",
            category: 'rootCompany',
            list: {
                num1: '1111',
                num2: '1112',
                num3: '1113',
                num4: '1114',
                num5: '1115',
                num6: '1116',
                num7: '1117',
                num8: '1118',
                num9: '1119',
            },
            combo: "A",
        },
        {
            id: 'subTree1-1-1',
            name: "分公司1-1-1",
            combo: "A",
        },
        {
            id: 'subTree1-2',
            name: "员工1-2",
            category: 'staff',
            combo: "B",
        },
        // {
        //     id: 'subTree1-2-11',
        //     name: "员工企业-1",
        // },
        {
            id: 'subTree1-2-1',
            name: "员工1-2-1",
            combo: "B",
            category: 'staff',
        },
        {
            id: 'subTree1-2-2',
            name: "员工1-2-2",
            category: 'staff',
        },
        {
            id: 'subTree2',
            name: '分公司2',
        },
        {
            id: 'subTree2-1',
            name: '分公司2-1',
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
        // {
        //     id: 'edges10',
        //     source: 'subTree1-2',
        //     target: 'subTree1-2-11',
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