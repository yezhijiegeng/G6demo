<template>
  <div>
    <input v-model="searchKeyword" placeholder="请输入搜索关键词" />
    <button @click="handleSearch">搜索</button>
    <div ref="graphContainer" :style="{ width: '800px', height: '600px' }"></div>
  </div>
</template>

<script>
import G6 from '@antv/g6';

export default {
  data() {
    return {
      searchKeyword: '',
      graph: null,
      data: {
        nodes: [
          { id: 'node1', label: 'Node 1' },
          { id: 'node2', label: 'Node 2' },
          { id: 'node3', label: 'Node 3' },
          // 更多节点...
        ],
        edges: [
          { source: 'node1', target: 'node2' },
          { source: 'node2', target: 'node3' },
          // 更多边...
        ],
      },
      rootId: 'node1', // 根节点ID
    };
  },
  mounted() {
    this.initGraph();
  },
  methods: {
    initGraph() {
      const container = this.$refs.graphContainer;
      this.graph = new G6.Graph({
        container: container,
        width: 800,
        height: 600,
        modes: {
          default: ['drag-canvas', 'zoom-canvas'],
        },
        layout: {
          type: 'dagre',
        },
        defaultNode: {
          size: [80, 30],
          style: {
            lineWidth: 1,
            fill: '#C6E5FF',
            stroke: '#5B8FF9',
          },
        },
        defaultEdge: {
          style: {
            stroke: '#e2e2e2',
          },
        },
      });

      this.graph.data(this.data);
      this.graph.render();
    },
    handleSearch() {
			debugger
      const matchedNodes = this.graph.getNodes().filter(node => node.getModel().label.includes(this.searchKeyword));
      if (matchedNodes.length > 0) {
        const matchNode = matchedNodes[0];
        const path = this.findPathToRoot(this.rootId, matchNode._cfg.id);

        // 隐藏所有节点和边
        this.graph.getNodes().forEach(node => node.hide());
        this.graph.getEdges().forEach(edge => edge.hide());

        // 展示并高亮路径上的节点和边
        path.forEach((id, index) => {
          const node = this.graph.findById(id);
          if (node) {
            node.show();
            node.update({
              style: {
                fill: '#f0ad4e', // 高亮颜色
                stroke: '#d9534f', // 边框颜色
              },
            });
            if (index < path.length - 1) {
              const nextNodeId = path[index + 1];
              const edge = this.graph.findEdgeByModel({ source: id, target: nextNodeId });
              if (edge) {
                edge.show();
                edge.update({
                  style: {
                    stroke: '#d9534f', // 高亮颜色
                    lineWidth: 4, // 加粗线条
                  },
                });
              }
            }
          }
        });

        // 刷新图
        this.graph.refresh();
      }
    },
    findPathToRoot(rootId, targetId) {
      const visited = new Set();
      const queue = [[rootId]];
      while (queue.length > 0) {
        const path = queue.shift();
        const currentNode = path[path.length - 1];
        if (currentNode === targetId) {
          return path; // 找到路径
        }
        if (!visited.has(currentNode)) {
          visited.add(currentNode);
          const neighbors = this.graph.getNeighbors(currentNode, 'out');
          for (const neighbor of neighbors) {
            const newPath = [...path, neighbor];
            queue.push(newPath);
          }
        }
      }
      return []; // 没有找到路径
    },
  },
};
</script>

<style scoped>
/* 添加样式 */
</style>