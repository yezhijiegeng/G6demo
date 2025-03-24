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
    const iconFont = document.createElement("script");
    iconFont.src = "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js";
    document.head.appendChild(iconFont);

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

    /* const graph = new Graph({
      container: "container",
      data: graphData,
      node: {
        type: "star",
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
      // plugins: [{ type: "grid-line", follow: true }],
      plugins: [
        {
          type: "toolbar",
          position: "right-top",
          onClick: (item) => {
            alert("item clicked:" + item);
          },
          getItems: () => {
            return [
              { id: "icon-xinjian", value: "new" },
              { id: "icon-fenxiang", value: "share" },
              { id: "icon-chexiao", value: "undo" },
            ];
          },
        },
      ],
    }); */
    const graph = new Graph(
      {
        data: {
          nodes: [
            { id: "node-0" },
            { id: "node-1" },
            { id: "node-2" },
            { id: "node-3" },
            { id: "node-4" },
            { id: "node-5" },
          ],
          edges: [
            { source: "node-0", target: "node-1" },
            { source: "node-0", target: "node-2" },
            { source: "node-0", target: "node-3" },
            { source: "node-0", target: "node-4" },
            { source: "node-1", target: "node-0" },
            { source: "node-2", target: "node-0" },
            { source: "node-3", target: "node-0" },
            { source: "node-4", target: "node-0" },
            { source: "node-5", target: "node-0" },
          ],
        },
        node: { style: { fill: "#7e3feb" } },
        edge: { style: { stroke: "#8b9baf" } },
        layout: { type: "grid" },
        behaviors: ["zoom-canvas", "drag-canvas", "drag-element"],
        plugins: [
          {
            type: "toolbar",
            key: "toolbar",
            position: "top-left",
            onClick: (item) => {
              alert("item clicked:" + item);
            },
            getItems: () => {
              // G6 内置了 9 个 icon，分别是 zoom-in、zoom-out、redo、undo、edit、delete、auto-fit、export、reset
              return [
                { id: "zoom-in", value: "zoom-in" },
                { id: "zoom-out", value: "zoom-out" },
                { id: "redo", value: "redo" },
                { id: "undo", value: "undo" },
                { id: "edit", value: "edit" },
                { id: "delete", value: "delete" },
                { id: "auto-fit", value: "auto-fit" },
                { id: "export", value: "export" },
                { id: "reset", value: "reset" },
              ];
            },
          },
        ],
      },
      { width: 600, height: 300 },
      (gui, graph) => {
        const options = {
          type: "toolbar",
          position: "top-left",
        };
        const optionFolder = gui.addFolder("Toolbar Options");
        optionFolder.add(options, "type").disable(true);
        optionFolder.add(options, "position", [
          "left-top",
          "left-bottom",
          "right-top",
          "right-bottom",
          "top-left",
          "top-right",
          "bottom-left",
          "bottom-right",
        ]);

        optionFolder.onChange(({ property, value }) => {
          graph.updatePlugin({
            key: "toolbar",
            [property]: value,
          });
          graph.render();
        });
      }
    );

    graph.render();
  },
};
</script>
