const data = {
    id: 'sub1',
    name: "总公司",
    children: [
        {
            id: 'subTree1',
            name: "分公司1",
            stockProportion: 30,
            hasChild: true,
            collapsed: true,
            children: [
                {
                    id: 'subTree1-1',
                    name: "分公司1-1",
                    stockProportion: 90,
                },
                {
                    id: 'subTree1-2',
                    name: "员工1",
                    staff: true,
                    stockProportion: 10,
                },
            ]
        },
        {
            id: 'subTree2',
            name: "分公司2",
            stockProportion: 70,
            hasChild: true,
            collapsed: false,
            children: [
                {
                    id: 'subTree2-1',
                    name: "分公司2-1",
                    stockProportion: 100,
                }
            ]
        }
    ]
}

export default data