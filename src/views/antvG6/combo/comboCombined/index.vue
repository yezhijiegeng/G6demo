<template>
  <div class="page-x">
    <!-- 【步骤1】 创建容器 -->
    <div class="g6-x" id="containerG6" ref="containerG6"></div>
  </div>
</template>

<script>
// 【步骤2】 引入G6
import G6 from '@antv/g6'

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
            y: 200 // Number，可选，节点位置的 y 值
          },
          {
            id: "node2", // String，该节点存在则必须，节点的唯一标识
            x: 300, // Number，可选，节点位置的 x 值
            y: 200 // Number，可选，节点位置的 y 值
          }
        ],
        // 边集
        edges: [
          {
            source: "node1", // String，必须，起始点 id
            target: "node2" // String，必须，目标点 id
          },
        ]
      }
    }
  },
  methods: {
    // 初始化关系图，并渲染数据
    initGraph() {
      // 【步骤4】 创建关系图
      const containerG6  = this.$refs.containerG6 // 获取容器（DOM元素）
      this.graph = new G6.Graph({
        container: containerG6, // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
        width: containerG6.offsetWidth, // Number，必须，图的宽度
        height: containerG6.offsetHeight, // Number，必须，图的高度
				
      })

      // 【步骤5】 匹配数据源并渲染
      this.graph.data(this.graphData) // 读取 Step 2 中的数据源到图上
      this.graph.render() // 渲染图
    }
  },
  mounted() {
    this.initGraph()
  }
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
