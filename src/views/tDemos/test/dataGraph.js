export const nodeData = {
  nodes: [
    {
      id: "node1",
      x: 10,
      y: 100,
      label: "Homepage",
    },
    {
      id: "node2",
      x: 200,
      y: 100,
      label: "Subpage",
    },
  ],
  edges: [
    {
      source: "node1",
      target: "node2",
    },
  ],
};

export const diamondNodeData = {
  nodes: [
    { id: "node1", x: 50, y: 100, type: "diamond" }, // 最简单的
    { id: "node2", x: 150, y: 100, type: "diamond", size: [50, 100] }, // 添加宽高
    { id: "node3", x: 250, y: 100, color: "red", type: "diamond" }, // 添加颜色
    { id: "node4", x: 350, y: 100, label: "菱形", type: "diamond" }, // 附加文本
  ],
};

export const domNodeData = {
  nodes: [
    {
      id: "node1",
      x: 250,
      y: 0,
      label: "同一实控人",
      type: "icon-node" /*  type: "dom-node"  */,
    },
    { id: "node2", x: 50, y: 200, label: "邓冠华", type: "icon-node" },
    { id: "node3", x: 550, y: 200, label: "蒋广成", type: "icon-node" },
    { id: "node4", x: 250, y: 200, label: "马玉国", type: "icon-node" },
    { id: "node5", x: 350, y: 200, label: "周明萱", type: "icon-node" },
    { id: "node6", x: 350, y: 400, label: "周明萱", type: "icon-node" },
    // { id: "node4", x: 250, y: 300, label: "马玉国",type: 'rect',  },
  ],
  edges: [
    { source: "node1", target: "node2" },
    {
      source: "node1",
      target: "node3",
      /*  size: 10,
      label: "line2",
      position: "end", */
    },
    { source: "node1", target: "node4" },
    { source: "node1", target: "node5" },
    { source: "node2", target: "node6" },
  ],
};

export const commonNodeData = {
  nodes: [
    {
      id: "node1", // String，该节点存在则必须，节点的唯一标识
      x: 100, // Number，可选，节点位置的 x 值
      y: 200, // Number，可选，节点位置的 y 值
    },
    {
      id: "node2", // String，该节点存在则必须，节点的唯一标识
      x: 300, // Number，可选，节点位置的 x 值
      y: 200, // Number，可选，节点位置的 y 值
    },
  ],
  // 边集
  edges: [
    {
      source: "node1", // String，必须，起始点 id
      target: "node2", // String，必须，目标点 id
    },
  ],
};

export const ghData = {
  nodes: [
    {
      id: "rootId",
      name: "总公司",
    },
    {
      id: "subTree1",
      name: "分公司1",
      stockProportion: 30,
      hightlight: false,
    },
    {
      id: "subTree1-1",
      name: "分公司1-1",
      stockProportion: 90,
      comboId: "combos1",
    },
    {
      id: "subTree1-1-1",
      name: "分公司1-1-1",
      stockProportion: 100,
      comboId: "combos1",
    },
    {
      id: "subTree1-2",
      name: "员工1-2",
      staff: true,
      stockProportion: 10,
    },
    {
      id: "subTree1-2-1",
      name: "员工1-2-1",
      staff: true,
      stockProportion: 10,
    },
    {
      id: "subTree1-2-2",
      name: "员工1-2-2",
      staff: true,
      stockProportion: 10,
    },
    {
      id: "subTree2",
      name: "分公司2",
      stockProportion: 70,
    },
    {
      id: "subTree2-1",
      name: "分公司2-1",
      stockProportion: 100,
    },
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
      source: "subTree1-2",
      target: "subTree1-2-1",
    },
    {
      source: "subTree1-2",
      target: "subTree1-2-2",
    },
    
  ],
};
