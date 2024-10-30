const data = {
    nodes: [
        {
            id: 'rootId',
            name: '一致行动人',
            isLeaf:false
            // data: {
            //     value: 'node1',
            // },
            // states: ['hightlight']
        },
        {
            id: 'rootStaffId1',
            name: '张名萱',
            stockProportion: 30,
            hightlight: false,
            staff: true,
            category:'staff',
        },
        {
            id: 'rootStaffId2',
            name: '蒋广成',
            stockProportion: 30,
            hightlight: false,
            staff: true,
            category:'staff',
        },
        {
            id: 'rootStaffId3',
            name: '马玉国',
            stockProportion: 30,
            hightlight: false,
            staff: true,
            category:'staff',
        },
        // {
        //     id: 'subTree1',
        //     name: '分公司1',
        //     stockProportion: 30,
        //     hightlight: false,
        // },
        {
            id: 'subTree1-1',
            name: "分公司1-1",
            combo: "A",
            stockProportion: 90,
            category:'rootCompany',
        },
        {
            id: 'subTree1-2',
            name: "分公司1-2",
            combo: "A",
            stockProportion: 90,
        },
        {
            id: 'subTree1-1-1',
            name: "分公司1-1-1",
            combo: "A",
            stockProportion: 100,
        },
        {
            id: 'subTree1-3',
            name: "分公司1-3",
            // staff: true,
            combo: "B",
            stockProportion: 10,
        },
        {
            id: 'subTree1-3-1',
            name: "员工1-3-1",
            combo: "B",
            staff: true,
            stockProportion: 10,
        },
        {
            id: 'subTree1-3-2',
            name: "员工1-3-2",
            staff: true,
            stockProportion: 10,
        },
        {
            id: 'subTree1-3-3',
            name: "分公司1-3-3",
        },
        // {
        //     id: 'subTree2',
        //     name: '分公司2',
        //     stockProportion: 70,
        // },
        {
            id: 'subTree2-1',
            name: '分公司2-1',
            stockProportion: 100,
        },
        {
            id: 'subTree1-4',
            name: '分公司1-4',
            category:'rootCompany',
        },
        // {
        //     id: 'subTree4',
        //     name: '分公司4',
        //     stockProportion: 30,
        //     hightlight: false,
        //     // staff: true,
        //     category:'company',
        // },
    ],
    edges: [
        // {
        //     source: 'rootId',
        //     target: 'subTree1',
        // },
        {
            source: 'rootId',
            target: 'rootStaffId1',
        },
        {
            source: 'rootId',
            target: 'rootStaffId2',
        },
        {
            source: 'rootId',
            target: 'rootStaffId3',
        },
        // {
        //     source: 'rootId',
        //     target: 'subTree4',
        // },
        {
            source: 'rootStaffId1',
            target: 'subTree1-1',
        },
        {
            source: 'subTree1-1',
            target: 'subTree1-1-1',
        },
        {
            source: 'rootStaffId1',
            target: 'subTree1-2',
        },
        {
            source: 'rootStaffId1',
            target: 'subTree1-3',
        },
        // {
        //     source: 'rootId',
        //     target: 'subTree2',
        // },
        {
            source: 'rootStaffId1',
            target: 'subTree2-1',
        },
        {
            source: 'rootStaffId1',
            target: 'subTree1-4',
        },
        // {
        //     source: 'subTree1-1',
        //     target: 'subTree1-1-1',
        // },
        {
            source: 'rootStaffId2',
            target: 'subTree2-1',
        },
        {
            source: 'subTree1-3',
            target: 'subTree1-3-1',
        },
        {
            source: 'subTree1-3-1',
            target: 'subTree1-1',
        },
        {
            source: 'subTree1-3',
            target: 'subTree1-3-2',
        },
        {
            source: 'subTree1-3',
            target: 'subTree1-3-3',
        },
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