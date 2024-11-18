<template>
  <div class="page-x">
    <!-- 【步骤1】 创建容器 -->
    <div class="g6-x" id="containerG6" ref="containerG6"></div>
  </div>
</template>

<script>
// 【步骤2】 引入G6
import G6 from "@antv/g6";
import { diamondNodeData } from "./data/data2";

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
            id: "node1", // String，该节点存在则必须，节点的唯一标识
            x: 100, // Number，可选，节点位置的 x 值
            y: 200, // Number，可选，节点位置的 y 值
          },
          {
            id: "node2", // String，该节点存在则必须，节点的唯一标识
            x: 300, // Number，可选，节点位置的 x 值
            y: 200, // Number，可选，节点位置的 y 值
          },
        ],
        // 边集
        edges: [
          {
            source: "node1", // String，必须，起始点 id
            target: "node2", // String，必须，目标点 id
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
        // width: containerG6.offsetWidth, // Number，必须，图的宽度
        // height: containerG6.offsetHeight, // Number，必须，图的高度
        // renderer: "svg",
        defaultNode: {
          type: "diamond",
          size: [120, 40],
        },
      });

      // 【步骤5】 匹配数据源并渲染
      this.graph.data(diamondNodeData); // 读取 Step 2 中的数据源到图上
      this.graph.render(); // 渲染图

      // 鼠标移动到上面 running，移出结束
      this.graph.on("node:mouseenter", (ev) => {
        const node = ev.item;
        this.graph.setItemState(node, "running", true);
      });

      this.graph.on("node:mouseleave", (ev) => {
        const node = ev.item;
        this.graph.setItemState(node, "running", false);
      });
    },
    registerNode1() {
      G6.registerNode(
        "custom",
        {
          // 响应状态变化
          setState(name, value, item) {
            const group = item.getContainer();
            const shape = group.get("children")[0]; // 顺序根据 draw 时确定
            if (name === "running") {
              if (value) {
                shape.animate(
                  {
                    r: 20,
                  },
                  {
                    repeat: true,
                    duration: 1000,
                  }
                );
              } else {
                shape.stopAnimate();
                shape.attr("r", 10);
              }
            }
          },
        },
        "circle"
      );
    },
    registerNode() {
      G6.registerNode(
        "dom-node",
        {
          draw: (cfg, group) => {
            const size = this.getSize(cfg); // 转换成 [width, height] 的模式
            const color = cfg.color;
            const width = size[0];
            const height = size[1];
            //  / 1 \
            // 4     2
            //  \ 3 /
            const path = [
              ["M", 0, 0 - height / 2], // 上部顶点
              ["L", width / 2, 0], // 右侧顶点
              ["L", 0, height / 2], // 下部顶点
              ["L", -width / 2, 0], // 左侧顶点
              ["Z"], // 封闭
            ];
            const style = G6.Util.mix(
              {},
              {
                path: path,
                stroke: color,
              },
              cfg.style
            );
            // 增加一个 path 图形作为 keyShape
            const keyShape = group.addShape("path", {
              attrs: {
                ...style,
              },
              draggable: true,
              name: "diamond-keyShape", // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
            });
            // 返回 keyShape
            return keyShape;
          },
          update(cfg, node) {
            const group = node.getContainer(); // 获取容器
            const shape = group.get("children")[0]; // 按照添加的顺序
            const style = {
              path: this.getPath(cfg),
              stroke: cfg.color,
            };
            shape.attr(style); // 更新属性
            // 更新文本的逻辑类似，但是需要考虑 cfg.label 是否存在的问题
            // 通过 label.attr() 更新文本属性即可
          },
        },
        "single-node"
      );

      G6.registerNode("diamond", {
        draw(cfg, group) {
          // 如果 cfg 中定义了 style 需要同这里的属性进行融合
          const keyShape = group.addShape("path", {
            attrs: {
              path: this.getPath(cfg), // 根据配置获取路径
              stroke: cfg.color, // 颜色应用到描边上，如果应用到填充，则使用 fill: cfg.color
            },
            // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
            name: "path-shape",
            // 设置 draggable 以允许响应鼠标的图拽事件
            draggable: true,
          });
          if (cfg.label) {
            // 如果有文本
            // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
            // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
            // style.text = cfg.label;
            const label = group.addShape("text", {
              // attrs: style
              attrs: {
                x: 0, // 居中
                y: 0,
                textAlign: "center",
                textBaseline: "middle",
                text: cfg.label,
                fill: "#666",
              },
              // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
              name: "text-shape",
              // 设置 draggable 以允许响应鼠标的图拽事件
              draggable: true,
            });
          }
          return keyShape;
        },
        // 返回菱形的路径
        getPath(cfg) {
          const size = cfg.size || [40, 40]; // 如果没有 size 时的默认大小
          const width = size[0];
          const height = size[1];
          //  / 1 \
          // 4     2
          //  \ 3 /
          const path = [
            ["M", 0, 0 - height / 2], // 上部顶点
            ["L", width / 2, 0], // 右侧顶点
            ["L", 0, height / 2], // 下部顶点
            ["L", -width / 2, 0], // 左侧顶点
            ["Z"], // 封闭
          ];
          return path;
        },
      });

      // 自定义一个名为 inner-animate 的节点
      G6.registerNode(
        "inner-animate",
        {
          afterDraw(cfg, group) {
            const size = cfg.size;
            const width = size[0] - 14;
            const height = size[1] - 14;
            // 添加图片
            const image = group.addShape("image", {
              attrs: {
                x: -width / 2,
                y: -height / 2,
                width: width,
                height: height,
                img: cfg.img,
              },
              // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
              name: "image-shape",
            });
            // 执行旋转动画
            image.animate(
              (ratio) => {
                const matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
                const toMatrix = Util.transform(matrix, [
                  ["r", ratio * Math.PI * 2],
                ]);
                return {
                  matrix: toMatrix,
                };
              },
              {
                repeat: true,
                duration: 3000,
                easing: "easeCubic",
              }
            );
          },
        },
        // 继承了 rect 节点
        "rect"
      );
    },
  },
  mounted() {
    this.registerNode();
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
