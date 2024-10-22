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
          {
            id: "0",
            comboId: "a",
          },
          {
            id: "1",
            comboId: "a",
          },
          {
            id: "2",
            comboId: "a",
          },
          {
            id: "3",
            comboId: "a",
          },
          {
            id: "4",
            comboId: "a",
          },
          {
            id: "5",
            comboId: "a",
          },
          {
            id: "6",
            comboId: "a",
          },
          {
            id: "7",
            comboId: "a",
          },
          {
            id: "8",
            comboId: "a",
          },
          {
            id: "9",
            comboId: "a",
          },
          {
            id: "10",
            comboId: "a",
          },
          {
            id: "11",
            comboId: "a",
          },
          {
            id: "12",
            comboId: "a",
          },
          {
            id: "13",
            comboId: "a",
          },
          {
            id: "14",
            comboId: "a",
          },
          {
            id: "15",
            comboId: "a",
          },
          {
            id: "16",
            comboId: "b",
          },
          {
            id: "17",
            comboId: "b",
          },
          {
            id: "18",
            comboId: "b",
          },
          {
            id: "19",
            comboId: "b",
          },
          {
            id: "20",
          },
          {
            id: "21",
          },
          {
            id: "22",
          },
          {
            id: "23",
            comboId: "c",
          },
          {
            id: "24",
            comboId: "a",
          },
          {
            id: "25",
          },
          {
            id: "26",
          },
          {
            id: "27",
            comboId: "c",
          },
          {
            id: "28",
            comboId: "c",
          },
          {
            id: "29",
            comboId: "c",
          },
          {
            id: "30",
            comboId: "c",
          },
          {
            id: "31",
            comboId: "c",
          },
          {
            id: "32",
            comboId: "d",
          },
          {
            id: "33",
            comboId: "d",
          },
        ],
        edges: [
          {
            source: "a",
            target: "b",
            label: "Combo A - Combo B",
            size: 3,
            labelCfg: {
              autoRotate: true,
              style: {
                stroke: "#fff",
                lineWidth: 5,
                fontSize: 20,
              },
            },
            style: {
              stroke: "red",
            },
          },
          {
            source: "a",
            target: "33",
            label: "Combo-Node",
            size: 3,
            labelCfg: {
              autoRotate: true,
              style: {
                stroke: "#fff",
                lineWidth: 5,
                fontSize: 20,
              },
            },
            style: {
              stroke: "blue",
            },
          },
          {
            source: "0",
            target: "1",
          },
          {
            source: "0",
            target: "2",
          },
          {
            source: "0",
            target: "3",
          },
          {
            source: "0",
            target: "4",
          },
          {
            source: "0",
            target: "5",
          },
          {
            source: "0",
            target: "7",
          },
          {
            source: "0",
            target: "8",
          },
          {
            source: "0",
            target: "9",
          },
          {
            source: "0",
            target: "10",
          },
          {
            source: "0",
            target: "11",
          },
          {
            source: "0",
            target: "13",
          },
          {
            source: "0",
            target: "14",
          },
          {
            source: "0",
            target: "15",
          },
          {
            source: "0",
            target: "16",
          },
          {
            source: "2",
            target: "3",
          },
          {
            source: "4",
            target: "5",
          },
          {
            source: "4",
            target: "6",
          },
          {
            source: "5",
            target: "6",
          },
          {
            source: "7",
            target: "13",
          },
          {
            source: "8",
            target: "14",
          },
          {
            source: "9",
            target: "10",
          },
          {
            source: "10",
            target: "22",
          },
          {
            source: "10",
            target: "14",
          },
          {
            source: "10",
            target: "12",
          },
          {
            source: "10",
            target: "24",
          },
          {
            source: "10",
            target: "21",
          },
          {
            source: "10",
            target: "20",
          },
          {
            source: "11",
            target: "24",
          },
          {
            source: "11",
            target: "22",
          },
          {
            source: "11",
            target: "14",
          },
          {
            source: "12",
            target: "13",
          },
          {
            source: "16",
            target: "17",
          },
          {
            source: "16",
            target: "18",
          },
          {
            source: "16",
            target: "21",
          },
          {
            source: "16",
            target: "22",
          },
          {
            source: "17",
            target: "18",
          },
          {
            source: "17",
            target: "20",
          },
          {
            source: "18",
            target: "19",
          },
          {
            source: "19",
            target: "20",
          },
          {
            source: "19",
            target: "33",
          },
          {
            source: "19",
            target: "22",
          },
          {
            source: "19",
            target: "23",
          },
          {
            source: "20",
            target: "21",
          },
          {
            source: "21",
            target: "22",
          },
          {
            source: "22",
            target: "24",
          },
          {
            source: "22",
            target: "25",
          },
          {
            source: "22",
            target: "26",
          },
          {
            source: "22",
            target: "23",
          },
          {
            source: "22",
            target: "28",
          },
          {
            source: "22",
            target: "30",
          },
          {
            source: "22",
            target: "31",
          },
          {
            source: "22",
            target: "32",
          },
          {
            source: "22",
            target: "33",
          },
          {
            source: "23",
            target: "28",
          },
          {
            source: "23",
            target: "27",
          },
          {
            source: "23",
            target: "29",
          },
          {
            source: "23",
            target: "30",
          },
          {
            source: "23",
            target: "31",
          },
          {
            source: "23",
            target: "33",
          },
          {
            source: "32",
            target: "33",
          },
        ],
        combos: [
          {
            id: "a",
            label: "Combo A",
          },
          {
            id: "b",
            label: "Combo B",
          },
          {
            id: "c",
            label: "Combo D",
          },
          {
            id: "d",
            label: "Combo D",
            parentId: "b",
          },
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
        fitView: true,
        fitViewPadding: 50,
        minZoom: 0.00000001,
        layout: {
          type: "comboForce",
          center: [200, 200],
          nodeSpacing: (d) => 8,
          linkDistance: 50, // 可选，边长
          preventOverlap:true, // 是否防止节点之间以及 combo 之间的重叠
          preventComboOverlap:true,
          gravity:10,
          comboGravity:10,
          // depthAttractiveForceScale:20,
          // nodeSpacing:5,
          // nodeStrength: 30,         // 可选
          // edgeStrength: 0.1,        // 可选
          onTick: () => {
            // 可选
            console.log("ticking");
          },
          onLayoutEnd: () => {
            // 可选
            console.log("combo force layout done");
          },
        },
        defaultNode: {
          size: 15,
          color: "#5B8FF9",
          style: {
            lineWidth: 2,
            fill: "#C6E5FF",
          },
        },
        defaultEdge: {
          size: 2,
          color: "#e2e2e2",
        },
        modes: {
          default: ["drag-combo", "drag-node", "drag-canvas", "zoom-canvas"],
        },
      });

      // 【步骤5】 匹配数据源并渲染
      this.graph.data(this.graphData); // 读取 Step 2 中的数据源到图上
      this.graph.render(); // 渲染图

      if (typeof window !== "undefined")
        window.onresize = () => {
          if (!graph || graph.get("destroyed")) return;
          if (!container || !container.scrollWidth || !container.scrollHeight)
            return;
          graph.changeSize(container.scrollWidth, container.scrollHeight);
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
