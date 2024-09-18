<template>
  <div class="home">
    <div class="" style="position: absolute; top: 0;left: 0;">
      <el-input style="width: 200px;margin-right: 10px;" size="mini" v-model.trim="searchVal" clearable
        placeholder="搜索"></el-input>
      <el-button type="primary" size="mini" @click="searchFunc">搜索</el-button>
    </div>
    <div id="mountNode"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import G6 from '@antv/g6';
// import data from './data'
import ghData from './dataGraph'

const COLLAPSE_ICON = function COLLAPSE_ICON(x, y, r) {
  return [
    ['M', x - r, y - r],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x + 2 - r, y - r],
    ['L', x + r - 2, y - r],
  ];
};
const EXPAND_ICON = function EXPAND_ICON(x, y, r) {
  return [
    ['M', x - r, y - r],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x + 2 - r, y - r],
    ['L', x + r - 2, y - r],
    ['M', x, y - 2 * r + 2],
    ['L', x, y - 2],
  ];
};

const rootId = 'rootId';

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data() {
    return {
      searchVal: '',
      lastSearch: [],
      graph: null,
    }
  },
  methods: {
    searchFunc() {
      // 清空上一次搜索
      ghData.nodes.forEach(el => {
        let id = el.id;
        const item = this.graph.findById(id);
        let model = {
          ...el,
          hightlight: false,
        }
        this.graph.updateItem(item, model)
      })
      if (this.searchVal.length > 0) {
        const arr = ghData.nodes.filter(el => {
          return el.name.includes(this.searchVal)
        })

        // 高亮
        arr.forEach(el => {
          let id = el.id;
          const item = this.graph.findById(id);
          let model = {
            ...el,
            hightlight: true,
          }
          this.graph.updateItem(item, model)
        })
      }
      this.graph.render();
    },
    fittingString(str, maxWidth, fontSize, cfg) {
      if (!str) {
        return '123'
      }
      let currentWidth = 0
      let res = str
      str = str.length > 10 ? str.substr(0, 10) + '...' : str
      const pattern = new RegExp('[\u4E00-\u9FA5]+')
      str.split('').forEach((letter, i) => {
        if (currentWidth > maxWidth) return
        if (pattern.test(letter)) {
          // 中文
          currentWidth += fontSize
        } else {
          currentWidth += G6.Util.getLetterWidth(letter, fontSize)
        }
        if (currentWidth > maxWidth) {
          res = `${str.substr(0, i)}\n${str.substr(i)}`
        }
      })
      return res
    },
    customNode() {
      const _this = this
      G6.registerNode('icon-node', {
        draw(cfg, group) {
          const isRoot = cfg.id === rootId //'根节点'
          // 取宽高的一半 后边的文本方便居中
          const x = -144 / 2
          const y = -54 / 2
          // 画外边的盒子
          let curShape = null;
          if (cfg.staff) {
            curShape = group.addShape('circle', {
              attrs: {
                x: 0,
                y: 0,
                r: 30,
                fill: '#f7e2dd',
              },
              name: 'container-node',
            })
          } else {
            curShape = group.addShape('rect', {
              attrs: {
                x: cfg.x || x,
                y: cfg.y || y,
                width: 144,
                height: 54,
                fill: isRoot ? '#4ea2f0' : '#fff',
                stroke: cfg.hightlight ? 'red' : '#4ea2f0',
                radius: 2,
                cursor: 'pointer'
              },
              name: 'container-node',
            })
          }

          // 
          // if (cfg.show === false) {
          //   curShape = null
          // }

          // 处理文本换行
          const label = _this.fittingString(cfg.name, 124, 12, 2, cfg)
          // 画文本
          group.addShape('text', {
            attrs: {
              text: label,
              x: cfg.x - x || 0,
              y: cfg.y - y || 0,
              textAlign: 'center',
              textBaseline: 'middle',
              fill: isRoot ? '#fff' : '#303242',
              cursor: 'pointer'
            },
            name: 'text-node'
          })
          // 画展开图标
          if (cfg.collapsed !== undefined) {
            group.addShape('marker', {
              attrs: {
                x: 0,
                y: -y + 10,
                r: 6,
                fill: '#fff',
                stroke: '#4ea2f0',
                cursor: 'pointer',
                symbol: cfg.collapsed ? EXPAND_ICON : COLLAPSE_ICON // 图标的路径函数
              },
              name: 'collapse-node',
              modelId: cfg.id,
            })
          }
          return curShape
        },
        update(cfg, node) {
          // const group = node.getContainer()
          // // 找到marker那个节点name 替换图标的路径函数
          // const icon = group.find((e) => e.get('name') === 'collapse-node')
          // icon.attr('symbol', COLLAPSE_ICON)
          // const collapseRect = group.find(ele => ele.get('name') === 'collapse-back');
          // const collapseText = group.find(ele => ele.get('name') === 'collapse-text');
          // collapseRect?.toFront();
          // collapseText?.toFront();
        },
        setState(name, value, item) {
          if (name === 'collapse') {
            const group = item.getContainer();
            const collapseNode = group.find(ele => ele.get('name') === 'collapse-node');
            collapseNode.attr({
              symbol: value ? EXPAND_ICON : COLLAPSE_ICON,
            });
          }
        },
      })
    },
    customEdge() {
      G6.registerEdge('flow-line', {
        draw(cfg, group) {
          // 分别是边两端与起始节点和结束节点的交点
          const startPoint = cfg.startPoint;
          const endPoint = cfg.endPoint;
          const { stockProportion } = cfg.targetNode.getModel()
          // 根据两个点画出想要的边
          const pathShape = group.addShape('path', {
            attrs: {
              stroke: '#eee',
              // svg path
              // https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths
              // path: [
              //   ['M', startPoint.x, startPoint.y],
              //   ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y], // 三分之一处
              //   ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y], // 三分之二处
              //   ['L', endPoint.x, endPoint.y],
              // ],
              path: [
                ['M', startPoint.x, startPoint.y],
                // ['L', startPoint.x, (startPoint.y + endPoint.y) / 2],
                // ['L', endPoint.x, (startPoint.y + endPoint.y) / 2],
                ['L', endPoint.x, endPoint.y]
              ],
              // 箭头
              endArrow: {
                fill: '#4ea2f0',
                stroke: '#4ea2f0',
                path: G6.Arrow.triangle(10, 15, 0)
              }
            },
            name: 'flow-edge'
          })
          // 画边的文字
          if (stockProportion) {
            const label = stockProportion + '%'
            group.addShape('text', {
              attrs: {
                text: label,
                x: endPoint.x + 4,
                y: (startPoint.y + endPoint.y) / 2,
                fill: '#4ea2f0',
                stroke: '#fff',
              },
              name: 'text-node'
            })
          }
          return pathShape
        },
        // 状态名称 状态值 edge
        setState(name, value, item) {
          const shape = item.getKeyShape()
          // 设置线的虚线样式
          // https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/setLineDash
          const lineDash = [10, 5]
          if (name === 'hover') {
            if (value) {
              let index = 0
              shape.attr('stroke', '#4ea2f0')
              shape.animate(
                () => {
                  index++
                  return {
                    lineDash,
                    lineDashOffset: -index
                  }
                },
                {
                  repeat: true, // 动画重复
                  duration: 10000, // 一次动画的时长为 10000
                }
              )
            } else {
              shape.attr('stroke', '#eee')
              // 结束动画
              shape.stopAnimate()
              // 清空 lineDash
              shape.attr('lineDash', null)
            }
          } else if (name === 'visible') {
          }
        }
      })
    }
  },
  mounted() {
    // 生成实例
    // const graph = new G6.TreeGraph({
    this.graph = new G6.Graph({
      container: 'mountNode',
      width: 800,
      height: 800,
      fitView: true,
      // layout: {
      //   type: 'dagre',
      //   rankdir: 'TB', // 可选，默认为图的中心
      //   // align: 'DL', // 可选
      //   nodesep: 50, // 可选
      //   ranksep: 40, // 可选
      //   // controlPoints: true, // 可选
      // },
      // layout: {
      //   type: "force2",
      //   clustering: true,
      //   clusterNodeStrength: -5,
      //   clusterEdgDistance: 200,
      //   clusterNodeSize: 100,
      //   clusterFociStrength: 15,
      //   nodeSpacing: 20,
      //   preventOverlap: true
      // },

      layout: {
        type: 'comboForce',
        maxIteration: 1000,
        gravity: 5,
        comboGravity: 1,
        preventOverlap: true,
        center: [100, 100],     // 可选，默认为图的中心
        linkDistance: 200,         // 可选，边长
        nodeStrength: 300,         // 可选
        edgeStrength: 0.05,        // 可选
      },
      modes: {
        default: [
          'drag-canvas',
          {
            type: 'zoom-canvas',
            sensitivity: 1, // 缩放灵敏度
            minZoom: 0.5,
            maxZoom: 1.5
          },
        ]
      },
      defaultNode: {
        // 使用自定义节点
        type: 'icon-node',
        // 节点的连接点
        // https://g6.antv.antgroup.com/manual/middle/elements/nodes/anchorpoint
        anchorPoints: [
          [0.5, 0],
          [0.5, 1]
        ],
      },
      defaultEdge: {
        // 使用自定义边
        type: 'flow-line'
      },
      // defaultEdge: {
      //   style: {
      //     stroke: '#eee',
      //     lineWidth: 1,
      //     endArrow: {
      //       path: G6.Arrow.vee(10, 20, 25),
      //       d: 25
      //     }
      //     // ... 其他样式属性
      //   },
      // },
      defaultCombo: {
        // 使用自定义边
        padding: 10
      },
    })


    // this.graph.node(function (node) {
    //   return {
    //     label: node.id,
    //     labelCfg: {
    //       offset: 10,
    //       position: node.children && node.children.length > 0 ? 'left' : 'right',
    //     },
    //   };
    // });


    const handleCollapse = (e) => {
      const target = e.target;
      const id = target.get('modelId');
      const item = this.graph.findById(id);
      const nodeModel = item.getModel();
      nodeModel.collapsed = !nodeModel.collapsed;

      // console.log(111, item)


      this.graph.setItemState(item, 'collapse', nodeModel.collapsed);

      // 寻找所有子节点 隐藏或显示
      let curNodes = [];
      const edges = ghData.edges;
      const findAllNodeFunc = (source) => {
        const curEdges = edges.filter(el => {
          return source === el.source;
        })
        if (curEdges.length > 0) {
          curEdges.forEach(el => {
            curNodes.push(el.target);
            findAllNodeFunc(el.target)
          })
        }

      }
      findAllNodeFunc(id)
      console.log("curNodes", curNodes)
      // 隐藏或显示
      curNodes.forEach(el => {
        const curItem = this.graph.findById(el);
        if (nodeModel.collapsed) {
          this.graph.hideItem(curItem)
        } else {
          this.graph.showItem(curItem)
        }
      })
      // 
      // this.graph.layout();
    };
    this.graph.on('collapse-node:click', (e) => {
      console.log('collapse-node:click')
      handleCollapse(e);
    });
    // this.graph.on('collapse-back:click', (e) => {
    //   console.log('collapse-back:click')
    //   handleCollapse(e);
    // });

    // 鼠标悬浮节点
    this.graph.on('node:mouseenter', ({ item }) => {
      // 根节点
      const isRoot = item._cfg.id === rootId
      if (!isRoot) {
        // 节点相关联的边执行动画
        item.getEdges().forEach(edge => {
          this.graph.setItemState(edge, 'hover', true)
          edge.toFront()
        })
      }
    })
    // 鼠标离开节点
    this.graph.on('node:mouseleave', ({ item }) => {
      // 根节点
      console.log('node:mouseleave')
      const isRoot = item._cfg.id === rootId
      if (!isRoot) {
        item.getEdges().forEach(edge => {
          this.graph.setItemState(edge, 'hover', false)
        })
      }
    })


    ghData?.children?.forEach(item => {
      // 根据条件把图渲染在上边或者下边
      item.location = 'right'
    })


    console.log(111111, ghData)
    // 绘制自定义节点
    this.customNode()
    // // 绘制自定义边
    this.customEdge()

    // this.graph.on('node:click', (e) => {
    //   const { target: { cfg: { type } }, item } = e
    //   const isMarker = type === 'marker'
    //   // 点击图标展开下一级
    //   if (isMarker) {
    //     console.log(11)
    //     // 如果children有值说明之前获取过了直接展开就可
    //     // if (children?.length > 0) return
    //     // 获取下一级的数据然后使用this.graph.updateChildren()去更新图
    //     // this.getChildrenData(item)
    //   } else {
    //     // 点击形状可以执行跳转详情之类的逻辑
    //   }
    // })

    // 解决渲染残影问题
    this.graph.get('canvas').set('localRefresh', false)
    this.graph.read(ghData)
    this.graph.fitCenter()

  },
}
</script>
<style lang="scss" scoped>
.home {
  position: relative;
}
</style>
