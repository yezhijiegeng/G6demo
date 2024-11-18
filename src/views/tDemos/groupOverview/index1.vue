<template>
  <div  class="h-full w-full" >
    <div class="w-full h-full"  id="viewContianer"></div>
  </div>
</template>
<script>
import { Graph } from "@antv/g6";
import { drageData } from "./dataGraph";
export default {
  name: "groupOverview",
  data() {},
  mounted() {
    const graph = new Graph({
      container: "viewContianer",
      autoFit: "center",
      data: drageData,
      node: {
        type: "rect",
        style: {
          size: [60, 30],
          radius: 8,
          labelText: (d) => d.id,
          labelBackground: true,
          ports: [{ placement: "top" }, { placement: "bottom" }],
        },
        palette: {
          field: (d) => d.combo,
        },
      },
      edge: {
        type: "cubic-vertical",
        style: {
          endArrow: true,
        },
      },
      combo: {
        type: "rect",
        style: {
          radius: 8,
          labelText: (d) => d.id,
        },
      },
      layout: {
        type: "antv-dagre",
        ranksep: 50,
        nodesep: 5,
        sortByCombo: true,
      },
      behaviors: ["drag-element", "drag-canvas", "zoom-canvas"],
    });

    graph.render();
  },
};
</script>
