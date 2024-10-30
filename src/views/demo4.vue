<template>
  <div class="demo4Page relative">
    <div class="" style="position: absolute; top: 0;left: 0; z-index: 1;">
      <el-select style="width: 200px;margin-right: 10px;" size="mini" v-model.trim="searchVal" filterable
        placeholder="请选择" clearable>
        <el-option v-for="item in ghData.nodes" :key="item.value" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-button type="primary" size="mini" @click="searchFunc">搜索</el-button>
    </div>
    <div class="w-full h-full" id="mountNode4"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ExtensionCategory, Graph, Rect, BaseEdge, Line, register, NodeEvent } from '@antv/g6';
import { Rect as RectGeometry, text } from '@antv/g';
// import { GNode, Group, Image, Rect, Text } from '@antv/g6-extension-react';
import ghData from './mockData/dataGraph4'
const COLLAPSE_ICON = require('@/assets/images/collapse.png');
const EXPAND_ICON = require('@/assets/images/expand.png');
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
const rootId = 'rootId';
let graph;
export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      searchVal: '',
      ghData,
      // graph: null,
    }
  },
  methods: {
    searchFunc() {
      // 清空上一次搜索
      [...ghData.nodes, ...ghData.edges].forEach(el => {
        let id = el.id;
        let curState = graph.getElementState(id);
        if (curState.includes('myHighlight')) {
          graph.setElementState({
            [id]: curState.filter(el => el !== 'myHighlight')
          })
        }
      })

      if (this.searchVal) {
        let nodeIds = [this.searchVal];
        // 找到所有父节点，并且高亮
        const finParentIdsFunc = (curId) => {
          const curEdges = ghData.edges.filter(el => {
            return curId === el.target;
          })
          if (curEdges.length > 0) {
            curEdges.forEach(el => {
              nodeIds.push(el.source)
              finParentIdsFunc(el.source)
            })
          }
        }
        finParentIdsFunc(this.searchVal)



        let stateObj = {};
        // 高亮节点
        nodeIds.forEach(el => {
          let id = el;
          let curState = graph.getElementState(id) || [];
          curState.push('myHighlight');
          stateObj[id] = curState;
        })
        // 高亮边
        let edgesIds = ghData.edges.filter(item => nodeIds.includes(item.source) && nodeIds.includes(item.target)).map(ele => ele.id);
        edgesIds = [...new Set(edgesIds)];
        edgesIds.forEach(el => {
          let id = el;
          let curState = graph.getElementState(id) || [];
          curState.push('myHighlight');
          stateObj[id] = curState;
        })

        graph.setElementState(stateObj);
        graph.render();
      }
    },
    // 判断有子节点
    checkChildNodesExist(nodeId) {
      const sourceEdges = ghData.edges.filter(el => el.source === nodeId);
      return sourceEdges.length > 0
    },
    // 判断是否同时存在公司节点和员工节点
    checkCompanyNodeAndStaffNodeExist(nodeId) {
      const sourceEdges = ghData.edges.filter(el => el.source === nodeId);
      if (sourceEdges.length > 1) {
        const checkCompanyNodeExist = sourceEdges.some(item => {
          let curNode = ghData.nodes.find(el => item.target === el.id);
          const staff = curNode?.staff;
          return !staff;
        });
        const checkStaffNodeExist = sourceEdges.some(item => {
          let curNode = ghData.nodes.find(el => item.target === el.id);
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
        const item = ghData.nodes.find(el => el.id === this.attributes.name);
        // if(graph.getElementState){
        //   let curState = graph.getElementState(this.attributes.name);
        //   if(curState.includes('highlight')){
        //     console.log(this.attributes.name,curState)
        //   }
        // }
        const isRoot = item.id === rootId //'根节点'
        // 取宽高的一半 后边的文本方便居中
        const x = -rectShapeWidth / 2
        const y = -rectShapeHeight / 2
        if (item.staff) {
          this.upsert('shapeKey1', "circle", {
            x: 0,
            y: 0,
            r: 30,
            stroke: '#4ea2f0',
            fill: '#f7e2dd',
          }, this);
        } else {
          this.upsert('shapeKey2', "rect", {
            x,
            y,
            width: rectShapeWidth,
            height: rectShapeHeight,
            fill: isRoot ? '#4ea2f0' : '#fff',
            stroke: '#4ea2f0',
            radius: 2,
            cursor: 'pointer'
          }, this);
        }
        this.upsert('shapeKey3', "text", {
          text: item.name,
          x: 0,
          y: 0,
          textAlign: 'center',
          textBaseline: 'middle',
          fill: isRoot ? '#fff' : '#303242',
          fontSize: 14,
          cursor: 'pointer'
        }, this);

        const iconSize = 14;
        // 画展开折叠图标
        // 有子节点
        if (ghData.edges.find(el => el.source === this.attributes.name)) {
          if (_this.checkCompanyNodeAndStaffNodeExist(this.attributes.name)) {
            const offset = 30;
            this.upsert('shapeKey4', "image", {
              // size: 20,
              width: iconSize,
              height: iconSize,
              x: -rectShapeWidth / 2 + offset - iconSize / 2,
              y: -y - 6,
              src: COLLAPSE_ICON,
              cursor: 'pointer'
            }, this);
            this.upsert('shapeKey5', "image", {
              // size: 20,
              width: iconSize,
              height: iconSize,
              x: rectShapeWidth / 2 - offset - iconSize / 2,
              y: -y - 6,
              src: COLLAPSE_ICON,
              cursor: 'pointer'
            }, this);
          } else {
            this.upsert('shapeKey6', "image", {
              // size: 20,
              width: iconSize,
              height: iconSize,
              x: -iconSize / 2,
              y: -y - 6,
              src: COLLAPSE_ICON,
              cursor: 'pointer'
            }, this);
          }
        }

        // console.log(11, this.attributes)
      }
      onUpdate() {
        // const item = ghData.nodes.find(el => el.id === this.attributes.name);
        const item = graph.getNodeData(this.attributes.name);
        let curState = graph.getElementState(this.attributes.name);
        // 高亮自定义节点
        if (curState.includes('myHighlight')) {
          // console.log(this.attributes.name, curState);
          if (item.staff) {
            this.upsert('shapeKey1', "circle", {
              stroke: 'red',
            }, this);
          } else {
            this.upsert('shapeKey2', "rect", {
              stroke: 'red',
            }, this);
          }
          // 高亮自定义节点
        } else {
          if (item.staff) {
            this.upsert('shapeKey1', "circle", {
              stroke: '#4ea2f0',
            }, this);
          } else {
            this.upsert('shapeKey2', "rect", {
              stroke: '#4ea2f0',
            }, this);
          }
        }
      }
    }

    class PolylineEdge extends Line {
      getKeyPath(attributes) {
        const [sourcePoint, targetPoint] = this.getEndpoints(attributes);
        const pointData = this.getEndpoints(attributes);
        let startPointX = sourcePoint[0];
        let endPointX = targetPoint[0];
        const targetNodeModel = ghData.nodes.find(el => el.id === attributes.targetNode);
        if (_this.checkCompanyNodeAndStaffNodeExist(attributes.sourceNode)) {
          // 偏移量
          const offset = 30
          // 员工节点
          if (targetNodeModel.staff) {
            startPointX += rectShapeWidth / 2 - offset
          } else {
            startPointX -= rectShapeWidth / 2 - offset
          }
        }
        // console.log(pointData, attributes.name)
        return [
          ['M', startPointX, sourcePoint[1]],
          // ['L', targetPoint[0] / 2 + (1 / 2) * sourcePoint[0], sourcePoint[1]],
          // ['L', targetPoint[0] / 2 + (1 / 2) * sourcePoint[0], targetPoint[1]],
          ['L', endPointX, targetPoint[1]],
        ];
        // return [
        //   ['M', sourcePoint[0], sourcePoint[1]],
        //   // ['L', targetPoint[0] / 2 + (1 / 2) * sourcePoint[0], sourcePoint[1]],
        //   // ['L', targetPoint[0] / 2 + (1 / 2) * sourcePoint[0], targetPoint[1]],
        //   ['L', targetPoint[0], targetPoint[1]],
        // ];
      }
    }

    register(ExtensionCategory.NODE, 'self-Node1', SelfNode1);
    register(ExtensionCategory.EDGE, 'custom-polyline', PolylineEdge);

    graph = new Graph({
      autoFit: 'center',
      container: 'mountNode4',
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
        type: 'self-Node1',
        style: {
          size: [rectShapeWidth, rectShapeHeight],
          // size: [60, 30],
          fillOpacity: 0,
          name: (d) => d.id,
          value: (d) => d.data.value,
          // 默认将线的起点归拢在一起
          ports: [{ placement: 'top' }, { placement: 'bottom' }],
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
        palette: {
          field: (d) => d.combo,
        },
      },
      edge: {
        type: 'custom-polyline',
        style: {
          // startArrow: true,
          stroke: '#a7d1f8',
          endArrow: true,
          name: (d) => d.id,
          // stroke: '#F6BD16',
        },
        state: {
          myHighlight: {
            stroke: 'red',
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
        type: 'rect',
        style: {
          radius: 8,
          labelText: (d) => d.id,
        },
      },
      layout: {
        type: 'antv-dagre',
        ranksep: 50,
        nodesep: 5,
        sortByCombo: true,
      },
      behaviors: ['drag-element'],
    });

    graph.render();

    graph.on(NodeEvent.CLICK, (event) => {
      const { target, originalTarget } = event;
      console.log(11, target.id)
      console.log(11, event)
    });

  },
  beforeDestroy() {
    // if (graph) {
    //   graph.clear();
    //   graph.destroy()
    //   console.log("销毁画布。1")
    // }
  }
}
</script>
<style lang="scss" scoped>
.demo4Page {}
</style>
