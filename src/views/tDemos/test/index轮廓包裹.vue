<template>
  <div class="page-x">
    <!-- 【步骤1】 创建容器 -->
    <div class="g6-x" id="containerG6" ref="containerG6"></div>
  </div>
</template>

<script>
// 【步骤2】 引入G6
import G6 from "@antv/g6";

export default {
  name: "Started",
  data() {
    return {
      graph: null,
      // 【步骤3】 准备数据
      graphData: {
        nodes: [
          { id: "node0", size: 50 },
          { id: "node1", size: 30 },
          { id: "node2", size: 30 },
          { id: "node3", size: 30 },
          { id: "node4", size: 30, isLeaf: true },
          { id: "node5", size: 30, isLeaf: true },
          { id: "node6", size: 15, isLeaf: true },
          { id: "node7", size: 15, isLeaf: true },
          { id: "node8", size: 15, isLeaf: true },
          { id: "node9", size: 15, isLeaf: true },
          { id: "node10", size: 15, isLeaf: true },
          { id: "node11", size: 15, isLeaf: true },
          { id: "node12", size: 15, isLeaf: true },
          { id: "node13", size: 15, isLeaf: true },
          { id: "node14", size: 15, isLeaf: true },
          { id: "node15", size: 15, isLeaf: true },
          { id: "node16", size: 15, isLeaf: true },
        ],
        edges: [
          { source: "node0", target: "node1" },
          { source: "node0", target: "node2" },
          { source: "node0", target: "node3" },
          { source: "node0", target: "node4" },
          { source: "node0", target: "node5" },
          { source: "node1", target: "node6" },
          { source: "node1", target: "node7" },
          { source: "node2", target: "node8" },
          { source: "node2", target: "node9" },
          { source: "node2", target: "node10" },
          { source: "node2", target: "node11" },
          { source: "node2", target: "node12" },
          { source: "node2", target: "node13" },
          { source: "node3", target: "node14" },
          { source: "node3", target: "node15" },
          { source: "node3", target: "node16" },
        ],
      },
    };
  },
  methods: {
    // 初始化关系图，并渲染数据
    initGraph() {
      // 【步骤4】 创建关系图
      const containerG6 = this.$refs.containerG6; // 获取容器（DOM元素）
      this.graph = new G6.Graph({
        container: containerG6, // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
        width: containerG6.offsetWidth, // Number，必须，图的宽度
        height: containerG6.offsetHeight, // Number，必须，图的高度
        modes: {
          default: ["drag-canvas", "zoom-canvas", "drag-node", "lasso-select"],
        },
        layout: {
          type: "force",
          preventOverlap: true,
          linkDistance: (d) => {
            if (d.source.id === "node0") {
              return 300;
            }
            return 60;
          },
          nodeStrength: (d) => {
            if (d.isLeaf) {
              return -50;
            }
            return -10;
          },
          edgeStrength: (d) => {
            if (
              d.source.id === "node1" ||
              d.source.id === "node2" ||
              d.source.id === "node3"
            ) {
              return 0.7;
            }
            return 0.1;
          },
        },
      });

      // 【步骤5】 匹配数据源并渲染
      this.graph.data(this.graphData); // 读取 Step 2 中的数据源到图上
      this.graph.render(); // 渲染图

      const nodes = this.graphData.nodes;

      this.graph.data({
        nodes,
        edges: this.graphData.edges.map(function (edge, i) {
          edge["id"] = "edge" + i;
          return Object.assign({}, edge);
        }),
      });
      this.graph.render();

      let centerNodes = this.graph
        .getNodes()
        .filter((node) => !node.getModel().isLeaf);

      this.graph.on("afterlayout", () => {
        // descriptionDiv.innerHTML = "";
        const hull1 = this.graph.createHull({
          id: "centerNode-hull",
          type: "bubble",
          members: centerNodes,
          padding: 10,
        });

        const hull2 = this.graph.createHull({
          id: "leafNode-hull1",
          members: ["node6", "node7"],
          padding: 10,
          style: {
            fill: "lightgreen",
            stroke: "green",
          },
        });

        const hull3 = this.graph.createHull({
          id: "leafNode-hull2",
          members: ["node8", "node9", "node10", "node11", "node12", "node13"],
          padding: 10,
          style: {
            fill: "lightgreen",
            stroke: "green",
          },
        });

        this.graph.on("afterupdateitem", (e) => {
          hull1.updateData(hull1.members);
          hull2.updateData(hull2.members);
          hull3.updateData(hull3.members);
        });
      });

      if (typeof window !== "undefined")
        window.onresize = () => {
          if (!graph || this.graph.get("destroyed")) return;
          if (!container || !container.scrollWidth || !container.scrollHeight)
            return;
          this.graph.changeSize(
            container.scrollWidth,
            container.scrollHeight - 20
          );
        };
    },
  },
  mounted() {
    this.initGraph();
  },
};
</script>

<style scoped>
.g6-x {
  width: 800px;
  height: 500px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  margin-left: 20px;
}
</style>
