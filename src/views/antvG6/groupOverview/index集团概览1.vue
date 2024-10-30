<template>
  <div class="group-overview w-full h-full">
    <div class="w-full h-full" id="viewContianer"></div>
  </div>
</template>
<script>
import { Graph, register, ExtensionCategory } from "@antv/g6";
import { drageData } from "./dataGraph";
// import CustomNode from "./customNode.ts";
export default {
  name: "groupOverview",
  data() {},
  methods: {
    customNode() {
      // register(ExtensionCategory.NODE, "custom-html-node", {});
    },
  },
  mounted() {
    const graph = new Graph({
      container: "viewContianer",
      autoFit: "center",
      data: drageData,
     /*  data: {
        nodes: [
          {
            id: "node-1",
            data: { location: "East", status: "error", ip: "192.168.1.2" },
          },
          {
            id: "node-2",
            data: { location: "West", status: "overload", ip: "192.168.1.3" },
          },
          {
            id: "node-3",
            data: { location: "South", status: "running", ip: "192.168.1.4" },
          },
        ],
      }, */
      node: {
        type: "rect",
        // type: "custom-html-node",
        style: {
          size: [60, 30],
          radius: 8,
          labelText: (d) => d.text || d.id,
          labelBackground: true,
          ports: [{ placement: "top" }, { placement: "bottom" }],
        },
        palette: {
          field: (d) => d.category,
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

    // 绘制自定义节点
    this.customNode();

    graph.render();
  },
};
</script>
