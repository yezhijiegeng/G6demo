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
        nodes: [
          { id: "node1", x: 250, y: 100, comboId: "combo1" },
          { id: "node2", x: 300, y: 100, comboId: "combo1" },
        ],
        combos: [
          { id: "combo1", label: "Combo 1", parentId: "combo2" },
          { id: "combo2", label: "Combo 2" },
          { id: "combo3", label: "Combo 3" },
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
        width: 800,
        height: 800,
        // 必须将 groupByTypes 设置为 false，带有 combo 的图中元素的视觉层级才能合理
        // groupByTypes: false,
        fitCenter: true,
        defaultCombo: {
          // 1 实例化图时全局配置
          type: "cRect", // Combo 类型
          // ... 其他配置
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
    initCombo() {
      // 定义下面需要使用的 symbol
      const collapseIcon = (x, y, r) => {
        return [
          ["M", x - r, y],
          ["a", r, r, 0, 1, 0, r * 2, 0],
          ["a", r, r, 0, 1, 0, -r * 2, 0],
          ["M", x - r + 4, y],
          ["L", x - r + 2 * r - 4, y],
        ];
      };
      const expandIcon = (x, y, r) => {
        return [
          ["M", x - r, y],
          ["a", r, r, 0, 1, 0, r * 2, 0],
          ["a", r, r, 0, 1, 0, -r * 2, 0],
          ["M", x - r + 4, y],
          ["L", x - r + 2 * r - 4, y],
          ["M", x - r + r, y - r + 4],
          ["L", x, y + r - 4],
        ];
      };

      G6.registerCombo(
        "cCircle",
        {
          drawShape: function draw(cfg, group) {
            const self = this;
            // 获取样式配置，style.r 是加上了 padding 的半径
            // 对应 Circle Combo 位置说明图中的 R
            const style = self.getShapeStyle(cfg);
            // 绘制一个 circle 作为 keyShape，与 'circle' Combo 的 keyShape 一致
            const circle = group.addShape("circle", {
              attrs: {
                ...style,
                x: 0,
                y: 0,
                r: style.r,
              },
              draggable: true,
              name: "combo-keyShape", // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
            });
            // 增加下方 marker
            const marker = group.addShape("marker", {
              attrs: {
                ...style,
                fill: "#fff",
                opacity: 1,
                x: 0,
                y: style.r,
                r: 10,
                symbol: collapseIcon,
              },
              draggable: true,
              name: "combo-marker-shape", // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
            });

            return circle;
          },
          // 定义新增的下方 marker 的位置更新逻辑
          afterUpdate: function afterUpdate(cfg, combo) {
            const self = this;
            // 获取样式配置，style.r 是加上了 padding 的半径
            // 对应 Circle Combo 位置说明图中的 R    const style = self.getShapeStyle(cfg);
            const group = combo.get("group");
            // 在该 Combo 的图形分组根据 name 找到下方 marker
            const marker = group.find(
              (ele) => ele.get("name") === "combo-marker-shape"
            );
            // 更新 marker
            marker.attr({
              x: 0,
              y: style.r,
              // 数据中的 collapsed 代表该 Combo 是否是收缩状态，根据该字段更新 symbol
              symbol: cfg.collapsed ? expandIcon : collapseIcon,
            });
          },
        },
        "circle"
      );
    },
  },
  mounted() {
    this.initGraph();
    this.initCombo();
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
