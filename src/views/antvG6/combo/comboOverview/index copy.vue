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
        // 全局 Combo 配置
        defaultCombo: {
          // 指定 Combo 类型，也可以将 type 写到 combo 数据中
          type: "cCircle",
          labelCfg: {
            refY: 2,
          },
          // ... 此处可配置默认 Combo 的其他样式
        },
        modes: {
          default: [
            // 配置展开/收缩 Combo 交互，双击 Combo 可以触发
            // 将会修改响应 Combo 数据中的 collapsed 字段，从而标识该 Combo 是否处于收缩状态
            "collapse-expand-combo",
          ],
        },
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
      G6.registerCombo(
        "cRect",
        {
          drawShape: function drawShape(cfg, group) {
            const self = this;
            // 获取配置中的 Combo 内边距
            cfg.padding = cfg.padding || [50, 20, 20, 20];
            // 获取样式配置，style.width 与 style.height 对应 rect Combo 位置说明图中的 width 与 height
            const style = self.getShapeStyle(cfg);
            // 绘制一个矩形作为 keyShape，与 'rect' Combo 的 keyShape 一致
            const rect = group.addShape("rect", {
              attrs: {
                ...style,
                x: -style.height / 2 - padding[0],
                y: -style.width / 2 - padding[3],
                width: style.width,
                height: style.height,
              },
              draggable: true,
              name: "combo-keyShape", // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
            });
            // 增加右侧圆
            group.addShape("circle", {
              attrs: {
                ...style,
                fill: "#fff",
                opacity: 1,
                // cfg.style.width 与 cfg.style.heigth 对应 rect Combo 位置说明图中的 innerWdth 与 innerHeight
                x: cfg.style.width / 2 + cfg.padding[1],
                y: (cfg.padding[2] - cfg.padding[0]) / 2,
                r: 5,
              },
              draggable: true,
              name: "combo-circle-shape", // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
            });
            return rect;
          },
          // 定义新增的右侧圆的位置更新逻辑
          afterUpdate: function afterUpdate(cfg, combo) {
            const group = combo.get("group");
            // 在该 Combo 的图形分组根据 name 找到右侧圆图形
            const circle = group.find(
              (ele) => ele.get("name") === "combo-circle-shape"
            );
            // 更新右侧圆位置
            circle.attr({
              // cfg.style.width 与 cfg.style.heigth 对应 rect Combo 位置说明图中的 innerWdth 与 innerHeight
              x: cfg.style.width / 2 + cfg.padding[1],
              y: (cfg.padding[2] - cfg.padding[0]) / 2,
            });
          },
        },
        "rect"
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
