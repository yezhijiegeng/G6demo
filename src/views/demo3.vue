<template>
  <div class="demo3Page relative">
    <!-- <div class="" style="position: absolute; top: 0;left: 0;">
      <el-input style="width: 200px;margin-right: 10px;" size="mini" v-model.trim="searchVal" clearable
        placeholder="搜索"></el-input>
      <el-button type="primary" size="mini" @click="searchFunc">搜索</el-button>
    </div>
    <div></div> -->
    <div class="w-full h-full" id="mountNode3"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Graph } from '@/assets/js/g6V5.min.js';
// import { Graph } from 'g6V5';
import ghData from './mockData/dataGraph3'
export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      searchVal: '',
      graph: null,
    }
  },
  methods: {
    searchFunc() { },
  },
  mounted() {
    let graph = new Graph({
      container: 'mountNode3',
      autoFit: 'center',
      data: ghData,
      node: {
        type: 'rect',
        style: {
          size: [60, 30],
          radius: 8,
          labelText: (d) => d.id,
          labelBackground: true,
          ports: [{ placement: 'top' }, { placement: 'bottom' }],
        },
        palette: {
          field: (d) => d.combo,
        },
      },
      edge: {
        type: 'cubic-vertical',
        style: {
          endArrow: true,
        },
      },
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
      behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas'],
    });

    graph.render();

  },
  beforeDestroy() {
    if (this.graph) {
      this.graph.clear();
      this.graph.destroy()
      console.log("销毁画布。1")
    }
  }
}
</script>
<style lang="scss" scoped>
.home {}
</style>
