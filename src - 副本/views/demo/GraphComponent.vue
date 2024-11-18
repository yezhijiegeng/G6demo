<template>
  <div ref="graphContainer" class="graph-container"></div>
</template>

<script>
import G6 from '@antv/g6';

export default {
  data() {
    return {
      graph: null,
      data: {
        nodes: [
          { id: 'root', label: 'Root' },
          { id: 'child1', label: 'Child 1' },
          { id: 'child2', label: 'Child 2' },
          // 其他节点...
        ],
        edges: [
          { source: 'root', target: 'child1' },
          { source: 'root', target: 'child2' },
          // 其他边...
        ],
      },
    };
  },
  mounted() {
    this.initGraph();
  },
  methods: {
    initGraph() {
      this.graph = new G6.Graph({
        container: this.$refs.graphContainer,
        width: 800,
        height: 600,
        modes: {
          default: ['drag-canvas', 'zoom-canvas'],
        },
      });

      this.graph.data(this.data);
      this.graph.render();

      this.graph.on('node:click', (evt) => {
        const nodeItem = evt.item;
        console.log('Node clicked:', nodeItem.getModel().id);
      });
    },
    async searchNode(nodeId) {
      const startNodes = this.graph.findAllByState('node', 'expanded');
      const endNodes = this.graph.findAllByState('node', 'collapsed');

      // 展开从根节点到目标节点的路径
      await this.expandPathToNode(nodeId);

      // 搜索节点
      const node = this.graph.findById(nodeId);
      if (node) {
        console.log('Node found:', node.getModel().id);
        this.highlightNode(node);
      } else {
        console.log('Node not found');
      }

      // 恢复初始状态
      startNodes.forEach((node) => this.graph.setItemState(node, 'expanded', true));
      endNodes.forEach((node) => this.graph.setItemState(node, 'collapsed', true));
    },
    async expandPathToNode(nodeId) {
      const queue = ['root']; // 从根节点开始
      while (queue.length > 0) {
        const currentNodeId = queue.shift();
        const currentNode = this.graph.findById(currentNodeId);
        if (currentNode) {
          this.graph.setItemState(currentNode, 'expanded', true);
          const neighbors = this.graph.getNeighbors(currentNode, 'target');
          for (const neighbor of neighbors) {
            if (!this.graph.hasState(neighbor, 'expanded')) {
              queue.push(neighbor.getModel().id);
            }
          }
        }
      }
    },
    highlightNode(node) {
      this.graph.setItemState(node, 'highlight', true);
      setTimeout(() => {
        this.graph.setItemState(node, 'highlight', false);
      }, 1000);
    },
  },
};
</script>

<style scoped>
.graph-container {
  width: 100%;
  height: 100%;
}
</style>