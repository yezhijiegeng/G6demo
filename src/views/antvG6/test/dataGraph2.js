const data = {
  nodes: [
    {
      id: "rootId",
      name: "总公司1",
    },
    {
      id: "subTree1",
      name: "分公司1",
      stockProportion: 30,
      hightlight: false,
      comboId: "combo1",
    },
    {
      id: "subTree1-1",
      name: "分公司1-1",
      stockProportion: 90,
      comboId: "combo1",
    },
    {
      id: "subTree1-1-1",
      name: "分公司1-1-1",
      stockProportion: 100,
      comboId: "combo1",
      isLeaf: true,
    },
    {
      id: "subTree1-2",
      name: "员工1-2",
      staff: true,
      stockProportion: 10,
      comboId: "combo1",
    },
    {
      id: "subTree1-2-1",
      name: "员工1-2-1",
      staff: true,
      stockProportion: 10,
      comboId: "combo1",
      isLeaf: true,
    },
    {
      id: "subTree1-2-2",
      name: "员工1-2-2",
      staff: true,
      stockProportion: 10,
      comboId: "combo1",
      isLeaf: true,
    },
    {
      id: "subTree2",
      name: "分公司2",
      stockProportion: 70,
      comboId: "combo2",
    },
    {
      id: "subTree2-1",
      name: "分公司2-1",
      stockProportion: 100,
      comboId: "combo2",
      isLeaf: true,
    },
    {
      id: "subTree3",
      name: "员工3",
      stockProportion: 30,
      hightlight: false,
      staff: true,
      comboId: "combo3",
    },
    {
      id: "subTree4",
      name: "分公司4",
      stockProportion: 100,
      comboId: "combo2",
      isLeaf: true,
    },
    {
      id: "subTree5",
      name: "员工5",
      stockProportion: 30,
      hightlight: false,
      staff: true,
      comboId: "combo3",
    },
    {
      id: "subTree6",
      name: "员工6",
      stockProportion: 30,
      hightlight: false,
      staff: true,
      comboId: "combo3",
    },
    {
      id: "subTree7",
      name: "员工7",
      stockProportion: 30,
      hightlight: false,
      staff: true,
      comboId: "combo3",
    },
    {
      id: "subTree8",
      name: "公司8",
      stockProportion: 30,
      hightlight: false,
      comboId: "combo3",
    },
    // { id: "node1", x: 250, y: 100, comboId: "combo1" },
    // { id: "node2", x: 300, y: 100, comboId: "combo1" },
  ],
  edges: [
    {
      source: "rootId",
      target: "subTree1",
    },
   
    {
      source: "subTree1",
      target: "subTree1-1",
    },
    {
      source: "subTree1",
      target: "subTree1-2",
    },
    {
      source: "rootId",
      target: "subTree2",
    },
    {
      source: "subTree2",
      target: "subTree2-1",
    },
    {
      source: "subTree1-1",
      target: "subTree1-1-1",
    },
    {
      source: "subTree1",
      target: "subTree2-1",
    },
    {
      source: "subTree1",
      target: "subTree1-2-1",
    },
    {
      source: "subTree1-2-1",
      target: "subTree1-1-1",
    }, 
    {
      source: "subTree1",
      target: "subTree1-2-2",
    },
    {
      source: "rootId",
      target: "subTree3",
    },
    {
      source: "rootId",
      target: "subTree4",
    },
    {
      source: "rootId",
      target: "subTree5",
    },
    {
      source: "rootId",
      target: "subTree6",
    },
    {
      source: "rootId",
      target: "subTree7",
    },
    {
      source: "rootId",
      target: "subTree8",
    },
    {
      source: "subTree1-2-1",
      target: "subTree8",
    },
    {
      source: "subTree2",
      target: "subTree4",
    },
   /* {
      source: "subTree1-1-1",
      target: "subTree1",
    },
     {
      source: "subTree1-1-1",
      target: "subTree1",
    },
    {
      source: "subTree1",
      target: "subTree2",
    }, */
  ],

  combos: [
    // { id: "combo1", label: "Combo 1", parentId: "combo2" },

    /* {
      id: "combo0",
      label: "Combo 0",
    }, */
    {
      id: "combo1",
      label: "实控集团 1",
      /* style: {
        fill: "pink",
        stroke: "#C4E3B2",
      }, */
    },

    {
      id: "combo2",
      label: "实控集团 2",
      /*  style: {
        stroke: "#99C0ED",
        fill: "#99C0ED",
      }, */
    },
    {
      id: "combo3",
      label: "实控集团 3",
      /*  style: {
        stroke: "#99C0ED",
        fill: "#99C0ED",
      }, */
    },
    // { id: "combo3", label: "Combo 3" },
  ],
};

export default data;
