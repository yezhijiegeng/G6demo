<template>
  <div ref="graphContainer" style="width: 100%; height: 600px;"></div>
</template>

<script>
import G6 from '@antv/g6';

export default {
  name: 'GraphComponent',
  data() {
    return {
      graph: null,
      data: {
        nodes: [
          { id: 'CEO', label: 'CEO' },
        { id: 'Alice', label: 'Alice' },
        { id: 'Bob', label: 'Bob' },
        { id: 'Charlie', label: 'Charlie' },
        { id: 'David', label: 'David' }
        ],
        edges: [
          { source: 'CEO', target: 'Alice' },
          { source: 'CEO', target: 'Bob' },
          { source: 'Alice', target: 'Charlie' },
        { source: 'Bob', target: 'David' }
        ]
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
        width: this.$refs.graphContainer.scrollWidth,
        height: this.$refs.graphContainer.scrollHeight || 600,
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
        },
      });

      this.graph.data(this.data);
      this.graph.render();
    },
    searchAndHighlightNode(targetNodeId) {
      const rootNodeId = 'CEO'; // 假设根节点ID为'CEO'
      const path = this.findPathToRoot(rootNodeId, targetNodeId);
      if (path) {
        this.highlightPath(path);
      } else {
        console.log('No path found');
      }
    },
    findPathToRoot(startId, endId) {
      const visited = new Set();
      const queue = [[startId]];
      while (queue.length > 0) {
        const path = queue.shift();
        const currentId = path[path.length - 1];
        if (currentId === endId) {
          return path;
        }
        if (!visited.has(currentId)) {
          visited.add(currentId);
          const neighbors = this.getNeighbors(currentId);
          for (const neighbor of neighbors) {
            queue.push([...path, neighbor]);
          }
        }
      }
      return null;
    },
    getNeighbors(nodeId) {
      const neighbors = [];
      const node = this.graph.findById(nodeId);
      if (node) {
        const adjacentEdges = this.graph.getEdges().filter(edge => edge.getSource().getId() === nodeId || edge.getTarget().getId() === nodeId);
        for (const edge of adjacentEdges) {
          const neighborId = edge.getSource().getId() === nodeId ? edge.getTarget().getId() : edge.getSource().getId();
          neighbors.push(neighborId);
        }
      }
      return neighbors;
    },
    highlightPath(path) {
      this.graph.getEdges().forEach(edge => {
        this.graph.updateItem(edge, { style: {} });
      });
      this.graph.getNodes().forEach(node => {
        this.graph.updateItem(node, { style: {} });
      });

      for (let i = 0; i < path.length - 1; i++) {
        const sourceId = path[i];
        const targetId = path[i + 1];
        const edge = this.graph.getEdges().find(e => e.getSource().getId() === sourceId && e.getTarget().getId() === targetId);
        if (edge) {
          this.graph.updateItem(edge, { style: { stroke: '#ff0000' } });
        }
      }

      for (const nodeId of path) {
        const node = this.graph.findById(nodeId);
        if (node) {
          this.graph.updateItem(node, { style: { fill: '#ff0000' } });
        }
      }
    },
  },
};
</script>