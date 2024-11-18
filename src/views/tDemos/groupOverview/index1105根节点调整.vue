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
      <!--  <el-button class="mr-2" type="info" size="mini" @click="expandClick"
        >全展开</el-button
      > -->
      <el-radio-group
        v-model="isCollapse"
        style="margin-bottom: 20px"
        @input="inputChange"
        size="mini"
        class="mt-5 ml-1"
      >
        <el-radio-button :label="false">全展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>
    </div>
    <div class="w-full h-full" id="mountNode4"></div>
  </div>
</template>

<script>
import {
  ExtensionCategory,
  Graph,
  Rect,
  BaseEdge,
  Line,
  register,
  NodeEvent,
  HTML,
} from "@/assets/js/g6V5.min";
// import { Rect as RectGeometry, text } from '@antv/g';
// import { GNode, Group, Image, Rect, Text } from '@antv/g6-extension-react';
import ghData from "../../mockData/dataGraph4_3";
import _ from "lodash";
const COLLAPSE_ICON = require("@/assets/images/collapse.png");
const EXPAND_ICON = require("@/assets/images/expand.png");
// const COLLAPSE_ICON = require('@/assets/images/icon/company.png');
const COLLAPSE_COMPANY_ICON = require("@/assets/images/icon/company.png");
const EXPAND_COMPANY_ICON = require("@/assets/images/icon/company1.png");
const COLLAPSE_STAFF_ICON = require("@/assets/images/icon/staff.png");
const EXPAND_STAFF_ICON = require("@/assets/images/icon/staff1.png");
// const COLLAPSE_ICON = function COLLAPSE_ICON(x, y, r) {
//   return [
//     ['M', x - r, y - r],
//     ['a', r, r, 0, 1, 0, r * 2, 0],
//     ['a', r, r, 0, 1, 0, -r * 2, 0],
//     ['M', x + 2 - r, y - r],
//     ['L', x + r - 2, y - r],
//   ];
// };
// const EXPAND_ICON = function EXPAND_ICON(x, y, r) {
//   return [
//     ['M', x - r, y - r],
//     ['a', r, r, 0, 1, 0, r * 2, 0],
//     ['a', r, r, 0, 1, 0, -r * 2, 0],
//     ['M', x + 2 - r, y - r],
//     ['L', x + r - 2, y - r],
//     ['M', x, y - 2 * r + 2],
//     ['L', x, y - 2],
//   ];
// };
const rectShapeWidth = 144;
const rectShapeHeight = 54;
// const rootCompanyWidth = 144;
// const rootCompanyHeight = 108;

const rootId = "rootId";
let graph;
let curGData;
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      searchVal: "",
      ghData,
      isCollapse: true,
      // graph: null,
    };
  },
  methods: {
    // 搜索当前已渲染出来的节点
    searchFunc1() {
      // 获取当前所有数据
      const { nodes, edges } = graph.getData();
      // 清空上一次搜索
      [...nodes, ...edges].forEach((el) => {
        let id = el.id;
        let curState = graph.getElementState(id);
        if (curState.includes("myHighlight")) {
          graph.setElementState({
            [id]: curState.filter((el) => el !== "myHighlight"),
          });
        }
      });

      if (this.searchVal) {
        // 如果当前搜索的节点在
        let nodeIds = [this.searchVal];
        // 找到所有父节点，并且高亮
        const finParentIdsFunc = (curId) => {
          const curEdges = ghData.edges.filter((el) => {
            return curId === el.target;
          });
          if (curEdges.length > 0) {
            curEdges.forEach((el) => {
              nodeIds.push(el.source);
              finParentIdsFunc(el.source);
            });
          }
        };
        finParentIdsFunc(this.searchVal);

        let stateObj = {};
        // 高亮节点
        nodeIds.forEach((el) => {
          let id = el;
          let curState = graph.getElementState(id) || [];
          curState.push("myHighlight");
          stateObj[id] = curState;
        });
        // 高亮边
        let edgesIds = ghData.edges
          .filter(
            (item) =>
              nodeIds.includes(item.source) && nodeIds.includes(item.target)
          )
          .map((ele) => ele.id);
        edgesIds = [...new Set(edgesIds)];
        edgesIds.forEach((el) => {
          let id = el;
          let curState = graph.getElementState(id) || [];
          curState.push("myHighlight");
          stateObj[id] = curState;
        });

        graph.setElementState(stateObj);
        graph.render();
      }
    },
    async searchFunc() {
      const targetNode = this.searchVal;
      // const { nodes, edges, combos } = _.cloneDeep(ghData);
      const originGhDataCopy = _.cloneDeep(ghData);
      // 获取当前所有数据
      const curGrahData = graph.getData();
      if (!targetNode) {
        // 清当前高亮
        let stateObj = {};
        [...curGrahData.nodes, ...curGrahData.edges].forEach((el) => {
          let id = el.id;
          let curState = graph.getElementState(id);
          curState = curState.filter((item) => item !== "myHighlight");
          stateObj[id] = curState;
        });
        graph.setElementState(stateObj);
        return;
      }
      if (targetNode) {
        // 找到这个节点的所有祖先节点，，以及吗以及每一个祖先节点的第一层子节点
        // 构建邻接表
        const graphObj = {};
        originGhDataCopy.edges.forEach((edge) => {
          if (!graphObj[edge.source]) {
            graphObj[edge.source] = [];
          }
          graphObj[edge.source].push(edge.target);
        });

        // 查找祖先节点
        function findAncestors(node) {
          const ancestors = [];
          const find = (currentNode) => {
            for (const edge of originGhDataCopy.edges) {
              if (edge.target === currentNode) {
                ancestors.push(edge.source);
                find(edge.source); // 递归查找祖先
              }
            }
          };
          find(node);
          return ancestors;
        }

        // 查找每个祖先节点的第一层子节点
        function findChildren(ancestors) {
          const childrenMap = {};
          ancestors.forEach((ancestor) => {
            if (graphObj[ancestor]) {
              childrenMap[ancestor] = graphObj[ancestor];
            } else {
              childrenMap[ancestor] = []; // 如果没有子节点
            }
          });
          return childrenMap;
        }
        // 获取所有节点并设置直接祖先节点的高亮状态
        function getAllNodes(ancestors, childrenMap) {
          let allNodesIds = [];
          for (let [key, val] of Object.entries(childrenMap)) {
            allNodesIds.push(key);
            allNodesIds = allNodesIds.concat(val);
          }
          allNodesIds = [...new Set(allNodesIds)];
          let allNodes = originGhDataCopy.nodes.filter((el) => {
            return allNodesIds.includes(el.id);
          });
          allNodes.forEach((el) => {
            el.states = [];
            // 设置祖先节点高亮
            if (ancestors.includes(el.id)) {
              el.states = ["myHighlight"];
            }
            // 设置自己也高亮
            if (el.id === targetNode) {
              el.states = ["myHighlight"];
            }
          });
          return allNodes;
        }

        // 获取所有边并设置直接边节点的高亮状态
        function getAllEdges(ancestors, childrenMap) {
          ancestors = [...ancestors, targetNode];
          let allEdges = [];
          for (let [key, val] of Object.entries(childrenMap)) {
            val.forEach((item) => {
              let curFind = originGhDataCopy.edges.find(
                (el) => el.source === key && el.target === item
              );
              if (ancestors.includes(item)) {
                curFind.states = ["myHighlight"];
              } else {
                curFind.states = [];
              }
              allEdges.push(curFind);
            });
          }
          return allEdges;
        }

        // 主函数
        function getAncestorsAndChildren(targetNode) {
          let ancestors = findAncestors(targetNode);
          // 一个节点可能同时有多个父节点，需要去重
          // ancestors结构
          // ['subTree2', 'rootId', 'subTree1']
          ancestors = [...new Set(ancestors)];
          // childrenMap结构
          // {
          //     "subTree2": ["subTree2-1"],
          //     "rootId": ["subTree1","subTree2"],
          //     "subTree1": ["subTree1-1","subTree1-2","subTree2-1"]
          // }
          const childrenMap = findChildren(ancestors);
          console.log("childrenMap", childrenMap);
          const allNodes = getAllNodes(ancestors, childrenMap);
          const allEdges = getAllEdges(ancestors, childrenMap);

          return {
            allNodes,
            allEdges,
          };
        }

        const allResObj = getAncestorsAndChildren(targetNode);
        const curCombos = this.findCombos(allResObj.allNodes);

        const curData = {
          nodes: allResObj.allNodes,
          edges: allResObj.allEdges,
          combos: curCombos,
        };

        console.log("searchData", curData);
        graph.destroy();
        await this.initGraph(curData);
        // 设置叶子节点折叠状态
        // 需await等待graph render完成才能进行
        this.setLeafColAndExpandState();
      }
    },
    findCombos(nodes) {
      let combsIds = nodes.filter((el) => el.combo).map((el) => el.combo);
      combsIds = [...new Set(combsIds)];
      const curCombos = ghData.combos.filter((el) => combsIds.includes(el.id));
      return curCombos;
    },
    // 判断有子节点
    checkChildNodesExist(nodeId, edges = ghData.edges) {
      const sourceEdges = edges.filter((el) => el.source === nodeId);
      return sourceEdges.length > 0;
    },
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
    // 只有一个节点时，判断是公司节点还是员工节点
    getNodeType(nodeId) {
      let nodeType = "";
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
        // 存在公司子节点
        if (checkCompanyNodeExist) {
          nodeType = "companyNodes";
        } else if (checkStaffNodeExist) {
          nodeType = "staffNodes";
        }
      }
      return nodeType;
    },
    // 查找所有叶子节点
    findLeafNodes(edges) {
      // 使用 Set 存储源和目标节点
      const sources = new Set();
      const targets = new Set();

      // 遍历 edges，分别将 source 和 target 加入集合
      edges.forEach((edge) => {
        sources.add(edge.source);
        targets.add(edge.target);
      });

      // 叶子节点是那些在 targets 中但不在 sources 中的节点
      const leafNodes = [...targets].filter((target) => !sources.has(target));
      // console.log(leafNodes); // 输出叶子节点
      return leafNodes;
    },
    // 查找某个节点下的所有子孙节点
    findChildrenByEdges(nodeId, edges) {
      const findChildren = (curNodeId, curEdges) => {
        let children = [];

        // 查找所有直接子节点
        curEdges.forEach((edge) => {
          if (edge.source === curNodeId) {
            children.push(edge.target);
            // 递归查找当前子节点的所有子节点
            children = children.concat(findChildren(edge.target, curEdges));
          }
        });

        return children;
      };
      const allChildren = findChildren(nodeId, edges);
      return allChildren;
    },

    setLeafColAndExpandState() {
      const graphData = graph.getData();
      let leafNodesIds = this.findLeafNodes(graphData.edges);
      let leafNodes = graphData.nodes.filter((el) =>
        leafNodesIds.includes(el.id)
      );
      // 设置折叠状态
      let statesObj = {};
      leafNodes.forEach((el) => {
        if (this.checkChildNodesExist(el.id)) {
          let curState = graph.getElementState(el.id) || [];
          if (this.checkCompanyNodeAndStaffNodeExist(el.id)) {
            curState = curState.concat(["collapse1", "collapse2"]);
            curState = [...new Set(curState)];
            statesObj[el.id] = curState;
          } else {
            curState = curState.concat(["collapse3"]);
            curState = [...new Set(curState)];
            statesObj[el.id] = curState;
          }
        }
      });
      graph.setElementState(statesObj);
    },
    findRootId() {
      // 查找根节点 作为source 且没有 作为target
      let rootArr = ghData.edges.map((el) => el.source);
      // 去重
      rootArr = [...new Set(rootArr)];
      rootArr = rootArr.filter((item) =>
        ghData.edges.every((el) => item !== el.target)
      );
      // 默认第一个
      const rootId = rootArr[0];
      return rootId;
    },
    // 默认渲染深度，根节点为0
    findNodesAtDepth(depth = 0) {
      const gDataCopy = _.cloneDeep(ghData);
      let rootId = this.findRootId();
      let findNodes = [];
      let findEdges = [];
      if (depth > 0) {
        const result = {
          nodes: new Set(),
          edges: new Set(),
        };
        // 辅助函数，递归查找
        function search(currentNode, currentDepth) {
          if (currentDepth === depth) {
            return;
          }
          for (const edge of gDataCopy.edges) {
            if (edge.source === currentNode) {
              result.edges.add(edge);
              result.nodes.add(edge.target);
              search(edge.target, currentDepth + 1);
            }
          }
        }
        // 从根节点开始查找
        search(rootId, defaultRenderLevel);

        const findNodesIds = Array.from(result.nodes);

        findNodes = gDataCopy.nodes.filter((el) =>
          findNodesIds.includes(el.id)
        );
        findEdges = Array.from(result.edges);
      } else {
        findNodes = gDataCopy.nodes.filter((el) => el.id === rootId);
      }

      console.log(11, findNodes);

      // 初始化节点展开状态
      // 同时存在公司节点和员工节点
      // expand1展开公司节点，expand2展开员工节点
      // collapse1折叠公司节点，collapse2折叠员工节点

      // 只存在员工节点或者公司节点
      // collapse3折叠公司节点，expand3展开员工节点
      findNodes.forEach((item) => {
        if (this.checkCompanyNodeAndStaffNodeExist(item.id)) {
          if (item.id === rootId) {
            item.states = ["collapse1", "collapse2"];
          } else {
            item.states = ["collapse1", "collapse2"];
          }
        } else {
          if (item.id === rootId) {
            item.states = ["collapse3"];
          } else {
            item.states = ["collapse3"];
          }
        }
      });

      const curCombos = this.findCombos(findNodes);

      return {
        nodes: findNodes,
        edges: findEdges,
        combos: curCombos,
      };
      // console.log(22,findNodes,findEdges)
    },
    expandClick() {
      graph.destroy();
      this.initGraph(_.cloneDeep(ghData));
    },
    async initGraph(curOriginDta) {
      const _this = this;
      class SelfNode1 extends Rect {
        onCreate() {
          const [width, height] = this.getSize();
          const curNodeId = this.attributes.name;
          console.log("curGData", curGData);
          const item = ghData.nodes.find((el) => el.id === curNodeId);
          const isRoot = item?.id === rootId; //'根节点'
          // 取宽高的一半 后边的文本方便居中
          const x = -rectShapeWidth / 2;
          const y = -rectShapeHeight / 2;

          if (item?.category === "staff") {
            this.upsert(
              "shapeKey1",
              // "circle",
              "rect",
              {
                // x: 0,
                // y: 0,
                // r: 30,
                // stroke: "#4ea2f0",
                // fill: "#f7e2dd",
                x,
                y,
                width: rectShapeWidth,
                height: rectShapeHeight,
                // width: rectShapeWidth,
                //   height: rectShapeHeight*4 ,
                fill: "#f7e2dd",
                stroke: "#4ea2f0",
                radius: 2,
                cursor: "pointer",
              },
              this
            );
          } else {
            if (item.category === "rootCompany") {
              this.upsert(
                "rootCompanyKey4",
                "rect",
                {
                  x,
                  y,
                  width: rectShapeWidth,
                  height: rectShapeHeight*4 ,
                  fill: isRoot ? "#4ea2f0" : "#fff",
                  stroke: "#F56C6C",
                  radius: 2,
                  cursor: "pointer",
                },
                this
              );

              /* const color = "#999";
              const customHtml = `<div
							style="
								width:${rectShapeWidth}px;
								height: ${rectShapeHeight}px;
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
									名称：${item.name} 
									ID:${item.id} 
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
                  x: -72,
                  y: -54,
                  innerHTML: customHtml,
                },
                this
              ); */
            } else {
              this.upsert(
                "shapeKey2",
                "rect",
                {
                  x,
                  y,
                  width: rectShapeWidth,
                  height: rectShapeHeight,
                  // width: rectShapeWidth,
                  // height: rectShapeHeight*4 ,
                  fill: isRoot ? "#4ea2f0" : "#fff",
                  stroke: "#4ea2f0",
                  radius: 2,
                  cursor: "pointer",
                },
                this
              );
            }
          }
          if(item.category === "rootCompany"){
            this.upsert(
              "shapeKeyHtmlText",
              "html",
              {
                // text: `${item?.name}\nsdf`,
                x: -rectShapeWidth/2,
                y: -rectShapeHeight/2,
                // width: rectShapeWidth,
                // height: rectShapeHeight*4 ,
                // x: -rectShapeWidth,
                // y: -rectShapeHeight,
                // width: rectShapeWidth,
                // height: rectShapeHeight,
                // textAlign: "left",
                // textBaseline: "middle",
                // fill: isRoot ? "#fff" : "#303242",
                // fontSize: 14,
                cursor: "pointer",
                innerHTML:`
                <div style="text-align:left;color:#000;background:#fff;width:${rectShapeWidth}px;height:${rectShapeHeight}px;">
                  <div style="">根公司：XXXXXXX<div>
                  <div style="">${item?.name}<div>
                  <div style="">${item?.name}<div>
                  <div style="">${item?.name}<div>
                  <div style="">${item?.name}<div>
                  <div style="">${item?.name}<div>
                  <div style="">${item?.name}<div>
                  <div style="">${item?.name}<div>
                  <div style="">${item?.name}<div>
                </div>
                `,
              },
              this
            );
          }else{
            this.upsert(
            "shapeKey3",
            "text",
            {
              text: `${item?.name}`,
              // 换行
              // text: `${item?.name}\nsdf`,
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
          }
          

          const iconSize = 14;
          // 画展开折叠图标
          // 有子节点
          // console.log("onCreate", curNodeId);
          if (ghData.edges.find((el) => el.source === curNodeId)) {
            let curState = graph.getElementState(curNodeId);
            // console.log("onCreate", curNodeId, curState);
            if (_this.checkCompanyNodeAndStaffNodeExist(curNodeId)) {
              const offset = 30;
              // 左
              this.upsert(
                "shapeKey4",
                "image",
                {
                  // size: 20,
                  width: iconSize,
                  height: iconSize,
                  x: -rectShapeWidth / 2 + offset - iconSize / 2,
                  y: -y - 6,
                  src: curState.includes("collapse1")
                    ? COLLAPSE_COMPANY_ICON
                    : EXPAND_COMPANY_ICON,
                  cursor: "pointer",
                },
                this
              );
              // 右
              this.upsert(
                "shapeKey5",
                "image",
                {
                  // size: 20,
                  width: iconSize,
                  height: iconSize,
                  x: rectShapeWidth / 2 - offset - iconSize / 2,
                  y: -y - 6,
                  src: curState.includes("collapse2")
                    ? COLLAPSE_STAFF_ICON
                    : EXPAND_STAFF_ICON,
                  cursor: "pointer",
                },
                this
              );
              // 中
            } else {
              if (curNodeId === "rootId") {
              }
              const nodeType = _this.getNodeType(curNodeId);
              let expandIcon = EXPAND_COMPANY_ICON;
              let collapsedIcon = COLLAPSE_COMPANY_ICON;
              if (nodeType === "companyNodes") {
                expandIcon = EXPAND_COMPANY_ICON;
                collapsedIcon = COLLAPSE_COMPANY_ICON;
              } else if (nodeType === "staffNodes") {
                expandIcon = EXPAND_STAFF_ICON;
                collapsedIcon = COLLAPSE_STAFF_ICON;
              }

              this.upsert(
                "shapeKey6",
                "image",
                {
                  // size: 20,
                  width: iconSize,
                  height: iconSize,
                  x: -iconSize / 2,
                  y: -y - 6,
                  src: curState.includes("collapse3")
                    ? expandIcon
                    : collapsedIcon,
                  cursor: "pointer",
                },
                this
              );
            }
          }

          // console.log(11, this.attributes)
        }
        onUpdate() {
          // const item = ghData.nodes.find(el => el.id === this.attributes.name);
          const item = graph.getNodeData(this.attributes.name);

          let curState = graph.getElementState(this.attributes.name);

          let expandIcon = EXPAND_COMPANY_ICON;
          let collapsedIcon = COLLAPSE_COMPANY_ICON;
          if (item.staff) {
            expandIcon = EXPAND_STAFF_ICON;
            collapsedIcon = COLLAPSE_STAFF_ICON;
          } else {
            expandIcon = EXPAND_COMPANY_ICON;
            collapsedIcon = COLLAPSE_COMPANY_ICON;
          }
          debugger
          // console.log(123, this.attributes.name)
          // 高亮自定义节点
          if (curState.includes("myHighlight")) {
            // console.log(this.attributes.name, curState);
            if (item.staff) {
              this.upsert(
                "shapeKey1",
                // "circle",
                "rect",
                {
                  stroke: "red",
                },
                this
              );
            } else {
              this.upsert(
                "shapeKey2",
                "rect",
                {
                  stroke: "red",
                },
                this
              );
            }
            // 高亮自定义节点
          } else {
            if (item.staff) {
              this.upsert(
                "shapeKey1",
                // "circle",
                "rect",
                {
                  stroke: "#4ea2f0",
                },
                this
              );
            } else {
              this.upsert(
                "shapeKey2",
                "rect",
                {
                  stroke: "#4ea2f0",
                },
                this
              );
            }
          }
          // 更新展开折叠图标
          // console.log("onUpdate_curState", this.attributes.name, curState)
          // 左
          if (curState.includes("collapse1") || curState.includes("expand1")) {
            this.upsert(
              "shapeKey4",
              "image",
              {
                src: curState.includes("collapse1")
                  ? collapsedIcon
                  : expandIcon,
              },
              this
            );
            // 右
          }
          if (curState.includes("collapse2") || curState.includes("expand2")) {
            this.upsert(
              "shapeKey5",
              "image",
              {
                src: curState.includes("collapse2")
                  ? collapsedIcon
                  : expandIcon,
              },
              this
            );
            // 中
          }
          if (curState.includes("collapse3") || curState.includes("expand3")) {
            this.upsert(
              "shapeKey6",
              "image",
              {
                src: curState.includes("collapse3")
                  ? expandIcon
                  : collapsedIcon,
              },
              this
            );
          }
        }
      }

      class PolylineEdge extends Line {
        getKeyPath(attributes) {
          const [sourcePoint, targetPoint] = this.getEndpoints(attributes);
          // const pointData = this.getEndpoints(attributes);
          let startPointX = sourcePoint[0];
          let endPointX = targetPoint[0];
          const targetNodeModel = ghData.nodes.find(
            (el) => el.id === attributes.targetNode
          );
          if (_this.checkCompanyNodeAndStaffNodeExist(attributes.sourceNode)) {
            // 偏移量
            const offset = 30;
            // 员工节点
            if (targetNodeModel?.staff) {
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

      class SelfHtmlNode1 extends HTML {
        getKeyStyle(attributes) {
          return { ...super.getKeyStyle(attributes), r: attributes.radius };
        }

        // 重写方法
        drawKeyShape(attributes, container) {
          // 自定义绘制逻辑，创建一个 G.Circle
          return this.upsert(
            "htmlKey",
            HTML,
            this.getKeyStyle(attributes),
            container
          );
        }
      }

      register(ExtensionCategory.NODE, "self-Node1", SelfNode1);
      register(ExtensionCategory.EDGE, "custom-polyline", PolylineEdge);
      register(ExtensionCategory.EDGE, "custom-NodeHtml1", SelfHtmlNode1);

      graph = new Graph({
        autoFit: "center",
        animation: false,
        container: "mountNode4",
        data: curOriginDta,
        // data: ghData,
        node: {
          type: "self-Node1",
          style: {
            size: [rectShapeWidth, rectShapeHeight],
            // size: [60, 30],
            fillOpacity: 0,
            // d代表节点数据
            name: (d) => d.id,
            // 默认将线的起点归拢在一起
            ports: [{ placement: "top" }, { placement: "bottom" }],
          },
          // state: {
          //   myHighlight: {
          //     stroke: 'red',
          //     lineWidth: 3,
          //   },
          // },
          // anchorPoints: [
          //   [0.5, 0],
          //   [0.5, 1]
          // ],
          // palette: {
          //   field: (d) => d.combo,
          // },
          palette: {
            field: "cluster",
          },
        },
        edge: {
          type: "custom-polyline",
          style: {
            // startArrow: true,
            stroke: "#a7d1f8",
            endArrow: true,
            name: (d) => d.id,
            // stroke: '#F6BD16',
          },
          state: {
            myHighlight: {
              stroke: "red",
              // lineWidth: 3,
            },
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
          // ranksep: 100,
          ranksepFunc:(node)=>{
            if(node.data.category === 'rootCompany' || node.id==="subTree1-1-1"){
              return 100
            }else{
              return 50
            }
          },
          nodesep: 20,
          sortByCombo: true,
        },
        behaviors: [
          "drag-element",
          "drag-canvas",
          "zoom-canvas",
          "zoom-canvas",
        ],
        plugins: [
          {
            type: "legend",
            nodeField: "cluster",
            edgeField: "cluster",
            trigger: "click",
          },
        ],
      });

      await graph.render();

      graph.on(NodeEvent.CLICK, (event) => {
        debugger;
        const { target, originalTarget } = event;
        const curShapeKey = originalTarget.attributes.class;
        let curNodeId = target.id;
        let curState = graph.getElementState(curNodeId);
        // console.log("curState1", graph.getElementState(curNodeId))
        // console.log("curNodeId", curNodeId)

        const { edges, nodes, combos } = _.cloneDeep(ghData);
        // 左 公司
        if (curShapeKey === "shapeKey4") {
          // 当前是折叠 需要展开
          if (curState.includes("collapse1")) {
            let curAddEdges = edges.filter((el) => {
              let curN = nodes.find((item) => item.id === el.target);
              return el.source === curNodeId && !curN?.staff;
            });
            let targetIds = curAddEdges.map((el) => el.target);
            let curAddNodes = nodes.filter((el) => targetIds.includes(el.id));

            // 判断节点是否有与现有的是否重复，有的话需要过滤掉，因为可能存在多条边连接同一个节点的情况
            const allData = graph.getData();
            curAddNodes = curAddNodes.filter((el) => {
              const node = allData.nodes.find((item) => item.id === el.id);
              return !node;
            });

            const curAddGData = {
              nodes: curAddNodes,
              edges: curAddEdges,
            };

            curState = curState.filter((el) => el !== "collapse1");
            curState.push("expand1");
            graph.setElementState({
              [curNodeId]: curState,
            });
            // console.log("curState2", graph.getElementState(curNodeId))
            // graph.setData(curGData);
            console.log("curAddGData", curAddGData);

            // 新增combs
            let combsIds = curAddNodes
              .filter((el) => el.combo)
              .map((el) => el.combo);
            if (combsIds.length > 0) {
              let allCombsDataIds = graph.getComboData().map((el) => el.id);
              combsIds = combsIds.filter((el) => !allCombsDataIds.includes(el));
              const addCombs = combos.filter((el) => combsIds.includes(el.id));
              console.log("addCombs", addCombs);
              if (addCombs.length > 0) {
                graph.addComboData(addCombs);
              }
            }

            graph.addData(curAddGData);

            // 设置叶子节点折叠状态
            this.setLeafColAndExpandState();

            graph.render();

            // 当前是展开 需要折叠
          } else {
            // 获取当前所有数据
            const curGrahData = graph.getData();
            // const sourceEdgesIds = edges.filter(el => el.source === curNodeId);
            // 找到该节点下的的下一层公司节点，再找出这些公司节点下的所有节点，将这些节点都移除
            let nextLevelNodes = curGrahData.edges
              .filter((el) => el.source === curNodeId)
              .map((el) => el.target);
            nextLevelNodes = nextLevelNodes.filter((el) => {
              let item = curGrahData.nodes.find((ele) => ele.id === el);
              return !item?.staff;
            });
            let allChildNodesIds = [];
            nextLevelNodes.forEach((el) => {
              let curChildNodes = this.findChildrenByEdges(
                el,
                curGrahData.edges
              );
              allChildNodesIds = allChildNodesIds.concat(curChildNodes);
            });

            allChildNodesIds = allChildNodesIds.concat(nextLevelNodes);
            allChildNodesIds = [...new Set(allChildNodesIds)];

            curState = curState.filter((el) => el !== "expand1");
            curState.push("collapse1");
            graph.setElementState({
              [curNodeId]: curState,
            });

            // 移除combs
            const leftAllNodes = curGrahData.nodes.filter(
              (el) => !allChildNodesIds.includes(el.id)
            );
            const leftCombIds = leftAllNodes
              .filter((el) => el.combo)
              .map((el) => el.combo);
            const allCombsData = graph.getComboData();
            const allCombsDataIds = allCombsData.map((el) => el.id);
            const diffCombsIds = allCombsDataIds.filter(
              (ele) => !leftCombIds.includes(ele)
            );
            if (diffCombsIds.length > 0) {
              graph.removeComboData(diffCombsIds);
            }

            graph.removeNodeData(allChildNodesIds);

            // 设置叶子节点折叠状态
            this.setLeafColAndExpandState();
            graph.render();
          }
          // 右 员工
        } else if (curShapeKey === "shapeKey5") {
          // 当前是折叠 需要展开
          if (curState.includes("collapse2")) {
            let curAddEdges = edges.filter((el) => {
              let curN = nodes.find((item) => item.id === el.target);
              return el.source === curNodeId && curN?.staff;
            });
            let targetIds = curAddEdges.map((el) => el.target);
            let curAddNodes = nodes.filter((el) => targetIds.includes(el.id));

            // 判断节点是否有与现有的是否重复，有的话需要过滤掉，因为可能存在多条边连接同一个节点的情况
            const allData = graph.getData();
            curAddNodes = curAddNodes.filter((el) => {
              const node = allData.nodes.find((item) => item.id === el.id);
              return !node;
            });

            const curAddGData = {
              nodes: curAddNodes,
              edges: curAddEdges,
            };
            curState = curState.filter((el) => el !== "collapse2");
            curState.push("expand2");
            graph.setElementState({
              [curNodeId]: curState,
            });
            console.log("curAddGData", curAddGData);

            // 新增combs
            let combsIds = curAddNodes
              .filter((el) => el.combo)
              .map((el) => el.combo);
            if (combsIds.length > 0) {
              let allCombsDataIds = graph.getComboData().map((el) => el.id);
              combsIds = combsIds.filter((el) => !allCombsDataIds.includes(el));
              const addCombs = combos.filter((el) => combsIds.includes(el.id));
              console.log("addCombs", addCombs);
              if (addCombs.length > 0) {
                graph.addComboData(addCombs);
              }
            }

            graph.addData(curAddGData);

            // 设置叶子节点折叠状态
            this.setLeafColAndExpandState();
            graph.render();
          } else {
            // 获取当前所有数据
            // const { nodes, edges } = graph.getData();
            const curGrahData = graph.getData();
            // const sourceEdgesIds = edges.filter(el => el.source === curNodeId);
            // 找到该节点下的的下一层员工节点，再找出这些员工节点下的所有节点，将这些节点都移除
            let nextLevelNodes = curGrahData.edges
              .filter((el) => el.source === curNodeId)
              .map((el) => el.target);
            nextLevelNodes = nextLevelNodes.filter((el) => {
              let item = curGrahData.nodes.find((ele) => ele.id === el);
              return item?.staff;
            });
            let allChildNodesIds = [];
            nextLevelNodes.forEach((el) => {
              let curChildNodes = this.findChildrenByEdges(
                el,
                curGrahData.edges
              );
              allChildNodesIds = allChildNodesIds.concat(curChildNodes);
            });

            allChildNodesIds = allChildNodesIds.concat(nextLevelNodes);
            allChildNodesIds = [...new Set(allChildNodesIds)];

            curState = curState.filter((el) => el !== "expand2");
            curState.push("collapse2");
            graph.setElementState({
              [curNodeId]: curState,
            });

            // 移除combs
            const leftAllNodes = curGrahData.nodes.filter(
              (el) => !allChildNodesIds.includes(el.id)
            );
            const leftCombIds = leftAllNodes
              .filter((el) => el.combo)
              .map((el) => el.combo);
            const allCombsData = graph.getComboData();
            const allCombsDataIds = allCombsData.map((el) => el.id);
            const diffCombsIds = allCombsDataIds.filter(
              (ele) => !leftCombIds.includes(ele)
            );
            if (diffCombsIds.length > 0) {
              graph.removeComboData(diffCombsIds);
            }

            graph.removeNodeData(allChildNodesIds);
            graph.render();
          }
          // 中 全部
        } else if (curShapeKey === "shapeKey6") {
          // 当前是折叠 需要展开
          if (curState.includes("collapse3")) {
            let curAddEdges = edges.filter((el) => {
              let curN = nodes.find((item) => item.id === el.target);
              return el.source === curNodeId;
            });
            let targetIds = curAddEdges.map((el) => el.target);
            let curAddNodes = nodes.filter((el) => targetIds.includes(el.id));

            // 判断节点是否有与现有的是否重复，有的话需要过滤掉，因为可能存在多条边连接同一个节点的情况
            const allData = graph.getData();
            curAddNodes = curAddNodes.filter((el) => {
              const node = allData.nodes.find((item) => item.id === el.id);
              return !node;
            });

            const curAddGData = {
              nodes: curAddNodes,
              edges: curAddEdges,
            };
            curState = curState.filter((el) => el !== "collapse3");
            curState.push("expand3");
            graph.setElementState({
              [curNodeId]: curState,
            });
            console.log("curAddGData", curAddGData);

            // 新增combs
            let combsIds = curAddNodes
              .filter((el) => el.combo)
              .map((el) => el.combo);
            if (combsIds.length > 0) {
              let allCombsDataIds = graph.getComboData().map((el) => el.id);
              combsIds = combsIds.filter((el) => !allCombsDataIds.includes(el));
              const addCombs = combos.filter((el) => combsIds.includes(el.id));
              console.log("addCombs", addCombs);
              if (addCombs.length > 0) {
                graph.addComboData(addCombs);
              }
            }

            graph.addData(curAddGData);

            // 设置叶子节点折叠状态
            this.setLeafColAndExpandState();
            graph.render();
          } else {
            // 获取当前所有数据
            const curGrahData = graph.getData();
            // const sourceEdgesIds = edges.filter(el => el.source === curNodeId);
            // 找到该节点下的所有公司节点并移除
            let allChildNodesIds = this.findChildrenByEdges(
              curNodeId,
              curGrahData.edges
            );
            allChildNodesIds = [...new Set(allChildNodesIds)];

            curState = curState.filter((el) => el !== "expand3");
            curState.push("collapse3");
            graph.setElementState({
              [curNodeId]: curState,
            });

            // 移除combs
            const leftAllNodes = curGrahData.nodes.filter(
              (el) => !allChildNodesIds.includes(el.id)
            );
            const leftCombIds = leftAllNodes
              .filter((el) => el.combo)
              .map((el) => el.combo);
            const allCombsData = graph.getComboData();
            const allCombsDataIds = allCombsData.map((el) => el.id);
            const diffCombsIds = allCombsDataIds.filter(
              (ele) => !leftCombIds.includes(ele)
            );
            if (diffCombsIds.length > 0) {
              graph.removeComboData(diffCombsIds);
            }

            graph.removeNodeData(allChildNodesIds);
            graph.render();
          }
        }
        console.log(11, target.id);
        console.log(11, event);
      });
    },
    inputChange(val) {
      if (val) {
        // 全收起
        graph.destroy();
        const curData = this.findNodesAtDepth();
        this.initGraph(curData);
      } else {
        // 全展开
        graph.destroy();
        this.initGraph(_.cloneDeep(ghData));
      }
    },
  },
  mounted() {
    const curData = this.findNodesAtDepth();
    this.initGraph(curData);
  },
  beforeDestroy() {
    // if (graph) {
    //   graph.clear();
    //   graph.destroy()
    //   console.log("销毁画布。1")
    // }
  },
};
</script>
<style lang="scss" scoped>
.demo4Page {
}
</style>
