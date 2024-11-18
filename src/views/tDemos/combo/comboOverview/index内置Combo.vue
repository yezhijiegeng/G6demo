<template>
  <div>
    <!-- 【步骤1】 创建容器 -->
    <div id="containerG6" ref="containerG6"></div>
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
        // 点集
        nodes: [
          {
            id: "node1",
            label: "Node1",
            comboId: "rect_combo",
          },
          {
            id: "node2",
            label: "Node 2",
          },
        ],
        combos: [
          {
            id: "circle_combo",
            type: "circle",
            label: "Circle",
          },
          {
            id: "rect_combo",
            type: "rect",
            label: "Rect Combo",
            // size:80,
            fixSize: 70,
            labelCfg: {
              position: "bottom",
              refX: 5,
              refY: -12,
              style: {
                fill: "#fff",
              },
            },
            style: {
              fill: "#fa8c16",
              stroke: "#000",
              lineWidth: 2,
            },
          },
          {
            id: "defult_combo",
            // type: "circle",
            label: "defult_combo",
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
      // 【步骤4】 创建关系图
      const graph = new G6.Graph({
        container: containerG6,
        width: 1500,
        height: 300,
        // 必须将 groupByTypes 设置为 false，带有 combo 的图中元素的视觉层级才能合理
        groupByTypes: false,
        fitCenter: true,
        defaultCombo: {
          // 1 实例化图时全局配置
          type: "rect", // Combo 类型
          // ... 其他配置
          style: {
            fill: "#bae637",
            stroke: "#eaff8f",
            lineWidth: 5,
          },
          labelCfg: {
            position: "left",
            refX: 5,
            style: {
              fill: "#eaff8f",
              fontSize: 15,
              // ... 其他文本样式的配置
            },
          },
        },

        stateStyles: {
          hover: {
            // keyShape 的状态样式
            fill: "#d3adf7",
            // name 为 node-label 的子图形在该状态值下的样式
            "node-label": {
              fontSize: 15,
            },
          },
        },
      });
      graph.data(this.graphData);
      graph.render();
    },
  },
  mounted() {
    this.initGraph();
  },
};
</script>

<style scoped>
/* .g6-x {
  width: 800px;
  height: 500px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  margin-left: 20px;
} */
</style>
