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
import { ExtensionCategory, Graph, Rect, register } from '@antv/g6';
// import { Rect as RectGeometry, text } from '@antv/g';
// import { GNode, Group, Image, Rect, Text } from '@antv/g6-extension-react';
import ghData from './mockData/dataGraph4'
const rectShapeWidth = 144;
const rectShapeHeight = 54;
const rootId = 'rootId';
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
    searchFunc() { },
  },
  mounted() {
    const _that = this;
    class SelfNode1 extends Rect {
      onCreate() {
        const [width, height] = this.getSize();
        const item = ghData.nodes.find(el => el.id === this.attributes.name);
        const isRoot = item.id === rootId //'根节点'
        // 取宽高的一半 后边的文本方便居中
        const x = -rectShapeWidth / 2
        const y = -rectShapeHeight / 2
        if (item.staff) {
          this.upsert('shape-key1', "circle", {
            x: 0,
            y: 0,
            r: 30,
            fill: '#f7e2dd',
          }, this);
        } else {
          this.upsert('shape-key2', "rect", {
            x,
            y,
            width: rectShapeWidth,
            height: rectShapeHeight,
            fill: isRoot ? '#4ea2f0' : '#fff',
            stroke: item.hightlight ? 'red' : '#4ea2f0',
            radius: 2,
            cursor: 'pointer'
          }, this);
        }
        this.upsert('shape-key3', "text", {
          text: item.name,
          x: 0,
          y: 0,
          textAlign: 'center',
          textBaseline: 'middle',
          fill: isRoot ? '#fff' : '#303242',
          fontSize: 14,
          cursor: 'pointer'
        }, this);
        console.log(11, this.attributes)
      }
    }

    register(ExtensionCategory.NODE, 'self-Node1', SelfNode1);

    this.graph = new Graph({
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
          size: 100,
          fillOpacity: 0,
          name: (d) => d.id,
          value: (d) => d.data.value,
        },
      },
      layout: {
        type: 'dagre',
        rankdir: 'TB', // 可选，默认为图的中心
        // align: 'DL', // 可选
        nodesep: 50, // 可选
        ranksep: 40, // 可选
        // controlPoints: true, // 可选
      },
      behaviors: ['drag-element'],
    });

    this.graph.render();

  },
  beforeDestroy() {
    // if (this.graph) {
    //   this.graph.clear();
    //   this.graph.destroy()
    //   console.log("销毁画布。1")
    // }
  }
}
</script>
<style lang="scss" scoped>
.demo4Page {}
</style>
