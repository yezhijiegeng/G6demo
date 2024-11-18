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
    { id: "node1", x: 150, y: 100, label: "node 1", type: "dom-node" },
    { id: "node2", x: 50, y: 200, label: "node 2" },
    { id: "node3", x: 250, y: 200, label: "node 3" },
    { id: "node4", x: 250, y: 300, label: "node 4",type: 'rect',  },
  ],
  edges: [
    { source: "node1", target: "node2", size: 10, label: "line" },
    { source: "node1", target: "node3", size: 10, label: "line2" },
    { source: "node3", target: "node4", size: 10, label: "line3" },
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
