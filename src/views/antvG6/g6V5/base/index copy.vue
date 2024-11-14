<template>
  <div id="container"></div>
</template>

<script>
import { Graph } from "@/assets/js/g6V5.min";

export default {
  data: {},
  mounted() {
    const graph = new Graph({
      container: "container",
      data: {
        nodes: [
          { id: "node-1", style: { x: 50, y: 50 } },
          { id: "node-2", style: { x: 150, y: 50 } },
        ],
        edges: [{ source: "node-1", target: "node-2" }],
      },
      node: {
        style: {
          fill: "pink",
        },
      },
      edge: {
        style: {
          stroke: "lightgreen",
        },
      },
    });

    graph.render();
  },
};
</script>
