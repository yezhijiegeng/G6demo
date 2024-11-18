<template>
  <div id="container"></div>
</template>

<script>
import { Graph } from "@/assets/js/g6V5.min";

const data = {
  nodes: Array.from({ length: 10 }).map((_, i) => ({ id: `node-${i}` })),
  edges: Array.from({ length: 9 }).map((_, i) => ({
    source: `node-0`,
    target: `node-${i + 1}`,
  })),
};

export default {
  data() {
    return {};
  },

  mounted() {
    /* const graphData = {
      nodes: Array.from({ length: 10 }).map((_, i) => ({ id: `node-${i}` })),
      edges: Array.from({ length: 9 }).map((_, i) => ({
        source: `node-0`,
        target: `node-${i + 1}`,
      })),
    }; */

    // 色板
    const graphData = {
      nodes: Array.from({ length: 10 }).map((_, i) => ({
        id: `node-${i}`,
        data: { category: i === 0 ? "central" : "around" },
      })),
      edges: Array.from({ length: 9 }).map((_, i) => ({
        source: `node-0`,
        target: `node-${i + 1}`,
      })),
    };

    const graph = new Graph({
      container: "container",
      data: graphData,
      node: {
        type:"star"
        /* type: (datum) => (datum.id === "node-0" ? "rect" : "circle"),
        style: {
          size: 20,
          fill: "pink",
        }, */
        // palette: {
        //   field: "category",
        //   color: "tableau",
        // },
      },
      edge: {
        style: {
          stroke: "lightgreen",
        },
      },
      behaviors: ["drag-canvas", "zoom-canvas", "drag-element"], // 拖拽、缩放画布，拖拽节点
      layout: {
        type: "d3-force",
      },
      plugins: [{ type: "grid-line", follow: true }],
    });

    graph.render();
  },
};
</script>
