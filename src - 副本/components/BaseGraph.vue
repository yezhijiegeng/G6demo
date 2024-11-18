<template>
  <div id="contentId" ref="graph"></div>
</template>

<script>
export default {
  name: 'BaseGraph',
  props: {
    // 图表数据
    options: {
      type: Object,
      default: () => { }
    },
    graphType: {
      type: String,
      default: 'Graph'
    },
    hoverFlag: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      myGraph: null,
      // 图表高度
      graphHeigth: 0,
      // 图表宽度
      graphWidth: 0
    }
  },
  watch: {
    // 深入监听数据改变
    options: {
      handler (newValue, oldValue) {
        this._initGraph(newValue)
      },
      deep: true
    }
  },
  mounted () {
    this._initGraphWithAndHeight()
    this._initGraph(this.options)
    this.graphCollapseClick()
    !this.hoverFlag && this.handleStateSet()
    this.nodeClick()
  },
  destroyed () {
    if (this.myGraph) {
      this.myGraph.destroy()
    }
  },
  methods: {
    // 节点点击事件
    nodeClick () {
      this.myGraph.on('node:click', (e) => {
        this.$emit('getDetails', e)
      })
    },
    // 节点展开/折叠
    graphCollapseClick () {
      this.myGraph.on('collapse-text:click', (e) => {
        this.handleCollapse(e)
      })
      this.myGraph.on('collapse-back:click', (e) => {
        this.handleCollapse(e)
      })
    },
    // 鼠标事件设置节点状态
    handleStateSet () {
      this.myGraph.on('node:mouseenter', (evt) => {
        const { item } = evt
        // 节点hover样式
        this.myGraph.setItemState(item, 'nodeHover', true)
        // 节点hover连线样式
        this.handleEdgeHighLight(item)
      })

      this.myGraph.on('node:mouseleave', (evt) => {
        const { item } = evt
        this.myGraph.setItemState(item, 'nodeHover', false)
        this.hanldeClearHighLight()
      })
    },
    handleEdgeHighLight (item) {
      this.myGraph.getNodes().forEach((node) => {
        this.myGraph.setItemState(node, 'dark', true)
      })
      this.myGraph.getEdges().forEach((edge, index) => {
        if (edge.getSource() === item) {
          this.myGraph.setItemState(edge.getTarget(), 'highlight', true)
          this.myGraph.setItemState(edge, 'highlight', true)
          edge.toFront()
          this.$emit('edgeActive', { edge, data: this.options.data.edges[index] })
        } else if (edge.getTarget() === item) {
          this.myGraph.setItemState(edge.getSource(), 'highlight', true)
          this.myGraph.setItemState(edge, 'highlight', true)
          edge.toFront()
          this.$emit('edgeActive', { edge, data: this.options.data.edges[index] })
        } else {
          this.myGraph.setItemState(edge, 'highlight', false)
        }
      })
    },
    hanldeClearHighLight () {
      this.myGraph.getNodes().forEach(node => {
        this.myGraph.clearItemStates(node)
      })
      this.myGraph.getEdges().forEach((edge, index) => {
        this.myGraph.clearItemStates(edge)
        this.$emit('edgeUnActive', { edge, data: this.options.data.edges[index] })
      })
    },
    // 初始化
    _initGraph (options) {
      this.myGraph = new G6[this.graphType]({
        container: 'contentId',
        width: this.$refs.graph.scrollWidth,
        height: this.$refs.graph.scrollHeight,
        fitView: true,
        animate: true,
        ...options.config
      })
      // 读取数据
      this.myGraph.data(options.data)
      // 渲染图
      this.myGraph.render()
      window.addEventListener('resize', () => {
        this._initGraphWithAndHeight()
        this.myGraph.changeSize(this.myGraphWidth, this.myGraphHeigth)
      })
    },
    _initGraphWithAndHeight () {
      /* this.myGraphWidth = this.$refs.graph.scrollWidth
      this.myGraphHeigth = this.$refs.graph.scrollHeight */
			this.myGraphWidth = 1000
      this.myGraphHeigth = 1000
    },
    handleCollapse (e) {
      const target = e.target
      const id = target.get('modelId')
      const item = this.myGraph.findById(id)
      const nodeModel = item.getModel()
      nodeModel.collapsed = !nodeModel.collapsed
      this.myGraph.layout()
      this.myGraph.setItemState(item, 'collapse', nodeModel.collapsed)
    }
  }
}
</script>
<style scoped>
#contentId {
  height: 100%;
}
</style>
