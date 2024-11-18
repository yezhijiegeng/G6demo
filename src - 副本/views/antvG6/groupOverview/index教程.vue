<template>
  <div id="container"></div>
</template>

<script>
import { Graph } from "@antv/g6";
export default {
  mounted() {
    const graph = new Graph({
      container: document.getElementById("container"),
      width: 500,
      height: 500,
      /* data: {
        nodes: [
          {
            id: "node-1",
            style: { x: 50, y: 100, fill: 'pink' },
          },
          {
            id: "node-2",
            style: { x: 150, y: 100 },
          },
        ],
        edges: [{ id: "edge-1", source: "node-1", target: "node-2" }],
      }, */
      // 布局
      // 首先生成一组不包括位置信息的数据：
      /* data: {
        nodes: Array.from({ length: 10 }).map((_, i) => ({ id: `node-${i}` })),
        edges: Array.from({ length: 9 }).map((_, i) => ({
          source: `node-0`,
          target: `node-${i + 1}`,
        })),
      }, */
      data: {
        nodes: Array.from({ length: 10 }).map((_, i) => ({
          id: `node-${i}`,
          data: { category: i === 0 ? "central" : "around" },
          style: {
            labelText: `node-${i}`,
          },
        })),
        edges: Array.from({ length: 9 }).map((_, i) => ({
          source: `node-0`,
          target: `node-${i + 1}`,
          style: {
            fill: "red",
          },
        })),
        /* nodes: [
          { id: "node-1", data: { category: "A" } },
          { id: "node-2", data: { category: "B" } },
          { id: "node-3", data: { category: "C" } },
          { id: "node-4", data: { category: "A" } },
          { id: "node-5", data: { category: "B" } },
          { id: "node-6", data: { category: "C" } },
        ], */
      },
      layout: {
        type: "d3-force", // d3-force 布局算法，它是一种力导向布局算法，可以模拟节点之间的引力和斥力，使得节点自动调整到合适的位置。
      },
      node: {
        type: (datum) => (datum.id === "node-0" ? "circle" : "rect"),
        style: {
          // fill: "pink",
          size: [20, 10],
        },
        palette: {
          field: "category",
          color: "tableau",
        },
        animation: {
          update: "translate",
        },
        // badge:
        halo: true,
      },
      edge: {
        type: "line",
        style: {
          startArrow: false,
          endArrow: true,
        },
      },
      combos: [{ id: "combo-1", type: "circle", type: "circle" }],
      behaviors: [
        "drag-canvas",
        "drag-element",
        "drag-node",
        "click-select",
        {
          type: "zoom-canvas",
          sensitivity: 2,
        },
      ], //交互: 拖拽、缩放画布，拖拽节点。
      // plugins: ['grid-line'],
      // plugins: [{ type: "grid-line", follow: true }], // 网格？
      plugins: [
        "grid",
        "tooltip",
        "contextmenu",
        {
          type: "bubble-sets",
          members: ["node-1"],
        },
      ],
      animation: {
        duration: 500,
        enter: "fade",
        exit: "fade",
				update: 'translate',
      },
			// animation: false,
    });

    graph.render();

    // 如果要在初始化后更新交互行为，例如临时禁用某个交互行为，可以通过 updateBehavior 方法：
    // graph.updateBehavior({
    //   key: "zoom-canvas",
    //   enable: false,
    // });
  },
};
</script>
