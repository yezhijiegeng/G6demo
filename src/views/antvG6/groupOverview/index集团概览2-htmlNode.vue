<template>
  <div class="demo4Page relative w-full h-full">
    <div class="" style="position: absolute; top: 0; left: 0; z-index: 1">
      <el-select
        style="width: 200px; margin-right: 10px"
        size="mini"
        v-model.trim="searchVal"
        filterable
        placeholder="请选择"
        clearable
      >
        <el-option
          v-for="item in ghData.nodes"
          :key="item.value"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <el-button type="primary" size="mini" @click="searchFunc">搜索</el-button>
    </div>
    <div class="w-full h-full" id="mountNode4"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import {
  ExtensionCategory,
  Graph,
  Rect,
  HTML,
  BaseEdge,
  Line,
  register,
} from "@antv/g6";
import { Rect as RectGeometry, text } from "@antv/g";
// import { GNode, Group, Image, Rect, Text } from '@antv/g6-extension-react';
import ghData from "../../mockData/dataGraph4";
const COLLAPSE_ICON = function COLLAPSE_ICON(x, y, r) {
  return [
    ["M", x - r, y - r],
    ["a", r, r, 0, 1, 0, r * 2, 0],
    ["a", r, r, 0, 1, 0, -r * 2, 0],
    ["M", x + 2 - r, y - r],
    ["L", x + r - 2, y - r],
  ];
};
const EXPAND_ICON = function EXPAND_ICON(x, y, r) {
  return [
    ["M", x - r, y - r],
    ["a", r, r, 0, 1, 0, r * 2, 0],
    ["a", r, r, 0, 1, 0, -r * 2, 0],
    ["M", x + 2 - r, y - r],
    ["L", x + r - 2, y - r],
    ["M", x, y - 2 * r + 2],
    ["L", x, y - 2],
  ];
};
const rectShapeWidth = 144;
const rectShapeHeight = 54;
const rootId = "rootId";
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      searchVal: "",
      ghData,
      // graph: null,
    };
  },
  methods: {
    searchFunc() {},
    // 判断是否同时存在公司节点和员工节点
    checkCompanyNodeAndStaffNodeExist(nodeId) {
      const sourceEdges = ghData.edges.filter((el) => el.source === nodeId);
      if (sourceEdges.length > 1) {
        const checkCompanyNodeExist = sourceEdges.some((item) => {
          let curNode = ghData.nodes.find((el) => item.target === el.id);
          const staff = curNode?.staff;
          return !staff;
        });
        const checkStaffNodeExist = sourceEdges.some((item) => {
          let curNode = ghData.nodes.find((el) => item.target === el.id);
          const staff = curNode?.staff;
          return staff;
        });
        // 存在公司和员工的子节点
        if (checkCompanyNodeExist && checkStaffNodeExist) {
          return true;
        }
      }
      return false;
    },
  },
  mounted() {
    const _this = this;
    class SelfNode1 extends Rect {
      onCreate() {
        const [width, height] = this.getSize();
        const item = ghData.nodes.find((el) => el.id === this.attributes.name);
        const isRoot = item.id === rootId; //'根节点'
        // 取宽高的一半 后边的文本方便居中
        const x = -rectShapeWidth / 2;
        const y = -rectShapeHeight / 2;
        if (item.staff) {
          this.upsert(
            "shape-key1",
            "circle",
            {
              x: 0,
              y: 0,
              r: 30,
              fill: "#f7e2dd",
            },
            this
          );
        } else {
          if (item.category === "rootCompany") {
            const color = "#999";
            const customHtml = `<div
							style="
								width:100%;
								height: 100%;
								background: #fff;
								border: 1px solid #e28334;
								color: #999;
								user-select: none;
								display: flex;
								padding: 10px;
								"
						>
							<div style="display: flex;flex-direction: column;flex: 1;">
								<div style="font-weight: bold;">
									${item.name} 
								</div>
								<div>
								</div>
							</div>
						</div>`;

            this.upsert(
              "custom-NodeHtml1",
              "html",
              {
                // size: [240, 80],
                // size: [240, 80],
                dx: -40,
                dy: -40,
                x: -20,
                y: 0,
                innerHTML: customHtml,
              },
              this
            );
          } else {
            this.upsert(
              "shape-key2",
              "rect",
              {
                x,
                y,
                width: rectShapeWidth,
                height: rectShapeHeight,
                fill: isRoot ? "#4ea2f0" : "#fff",
                stroke: item.hightlight ? "red" : "#4ea2f0",
                radius: 2,
                cursor: "pointer",
              },
              this
            );
          }
        }
        this.upsert(
          "shape-key3",
          "text",
          {
            text: item.name,
            x: 0,
            y: 0,
            textAlign: "center",
            textBaseline: "middle",
            fill: isRoot ? "#fff" : "#303242",
            fontSize: 14,
            cursor: "pointer",
          },
          this
        );

        // this.upsert('shape-key4', "path", {
        //   x: 0,
        //   y: 0,
        //   r: 6,
        //   fill: '#fff',
        //   stroke: '#4ea2f0',
        //   cursor: 'pointer',
        //   path: COLLAPSE_ICON(),
        // }, this);
        // console.log(11, this.attributes)
      }
    }

    class PolylineEdge extends Line {
      getKeyPath(attributes) {
        const [sourcePoint, targetPoint] = this.getEndpoints(attributes);
        // console.log(attributes, 111111)
        const pointData = this.getEndpoints(attributes);
        let startPointX = sourcePoint[0];
        let endPointX = targetPoint[0];
        const targetNodeModel = ghData.nodes.find(
          (el) => el.id === attributes.targetNode
        );
        if (_this.checkCompanyNodeAndStaffNodeExist(attributes.sourceNode)) {
          // 偏移量
          const offset = 30;
          // 员工节点
          if (targetNodeModel.staff) {
            startPointX += rectShapeWidth / 2 - offset;
          } else {
            startPointX -= rectShapeWidth / 2 - offset;
          }
        }
        // console.log(pointData, attributes.name)
        return [
          ["M", startPointX, sourcePoint[1]],
          // ['L', targetPoint[0] / 2 + (1 / 2) * sourcePoint[0], sourcePoint[1]],
          // ['L', targetPoint[0] / 2 + (1 / 2) * sourcePoint[0], targetPoint[1]],
          ["L", endPointX, targetPoint[1]],
        ];
        // return [
        //   ['M', sourcePoint[0], sourcePoint[1]],
        //   // ['L', targetPoint[0] / 2 + (1 / 2) * sourcePoint[0], sourcePoint[1]],
        //   // ['L', targetPoint[0] / 2 + (1 / 2) * sourcePoint[0], targetPoint[1]],
        //   ['L', targetPoint[0], targetPoint[1]],
        // ];
      }
    }

    /* class SelfHtmlNode1 extends HTML {
      onCreate() {}
    } */

    class SelfHtmlNode1 extends HTML {
      getKeyStyle(attributes) {
        debugger;
        return { ...super.getKeyStyle(attributes), r: attributes.radius };
      }

      // 重写方法
      drawKeyShape(attributes, container) {
        // 自定义绘制逻辑，创建一个 G.Circle
        return this.upsert(
          "key",
          HTML,
          this.getKeyStyle(attributes),
          container
        );
      }
    }

    register(ExtensionCategory.NODE, "self-Node1", SelfNode1);
    register(ExtensionCategory.EDGE, "custom-polyline", PolylineEdge);
    register(ExtensionCategory.EDGE, "custom-NodeHtml1", SelfHtmlNode1);

    this.graph = new Graph({
      autoFit: "center",
      container: "mountNode4",
      data: ghData,
      // data: {
      //   nodes: [
      //     {
      //       id: 'Aaron',
      //       data: {
      //         value: [
      //           { subject: 'Math', score: 70 },
      //           { subject: 'Chinese', score: 90 },
      //           { subject: 'English', score: 90 },
      //           { subject: 'Geography', score: 60 },
      //           { subject: 'Physics', score: 70 },
      //           { subject: 'Chemistry', score: 65 },
      //           { subject: 'Biology', score: 80 },
      //         ],
      //       },
      //     },
      //   ],
      // },
      node: {
        type: "self-Node1",
        style: {
          size: [rectShapeWidth, rectShapeHeight],
          // size: [60, 30],
          fillOpacity: 0,
          name: (d) => d.id,
          value: (d) => d.data.value,
          // 默认将线的起点归拢在一起
          ports: [{ placement: "top" }, { placement: "bottom" }],
        },
        // anchorPoints: [
        //   [0.5, 0],
        //   [0.5, 1]
        // ],
        palette: {
          field: (d) => d.combo,
        },
      },
      edge: {
        type: "custom-polyline",
        style: {
          // startArrow: true,
          endArrow: true,
          name: (d) => d.id,
          // stroke: '#F6BD16',
        },
      },
      // edge: {
      //   type: 'cubic-vertical',
      //   style: {
      //     endArrow: true,
      //   },
      // },
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
      behaviors: [
        "drag-element",
        "drag-canvas",
        "drag-node",
        "click-select",
        {
          type: "zoom-canvas",
          sensitivity: 2,
        },
      ],
      // palette: {
      //   type: "group", // 指定色板类型为分类色板
      //   field: "category", // 指定数据中的分组字段
      //   color: "tableau", // 使用 tableau 色板
      // },
    });

    this.graph.render();
  },
  beforeDestroy() {
    // if (this.graph) {
    //   this.graph.clear();
    //   this.graph.destroy()
    //   console.log("销毁画布。1")
    // }
  },
};
</script>
<style lang="scss" scoped>
.demo4Page {
}
</style>
