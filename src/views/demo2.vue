<template>
  <div class="home">
    <div class="" style="position: absolute; top: 0;left: 0;">
      <!--<el-input style="width: 200px;margin-right: 10px;" size="mini" v-model.trim="searchVal" clearable
        placeholder="搜索"></el-input> -->
        <el-select style="width: 200px;margin-right: 10px;" size="mini" 
        v-model.trim="searchVal"
        filterable
        placeholder="请选择" clearable>
          <el-option
            v-for="item in ghData.nodes"
            :key="item.value"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      <el-button type="primary" size="mini" @click="searchFunc">搜索</el-button>
    </div>
    <div id="mountNode"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import G6 from '@antv/g6';
// import data from './data'
import ghData from './dataGraph2'

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
const rectShapeWidth = 144;
const rectShapeHeight = 54;

export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      searchVal: '',
      lastSearch: [],
      searchIds: [],
      ghData,
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
      if (this.searchVal) {
        // const cur = ghData.nodes.find(el => {
        //   return el.name === this.searchVal
        //   // return el.name.includes(this.searchVal)
        // })
        
        let ids = [this.searchVal];
        // 找到所有父节点，并且高亮
        const finParentIdsFunc = (curId) => {
          const curEdges = ghData.edges.filter(el => {
            return curId === el.target;
          })
          if(curEdges.length > 0){
            curEdges.forEach(el => {
              ids.push(el.source)
              finParentIdsFunc(el.source)
            })
          }
        }
        finParentIdsFunc(this.searchVal)

        this.searchIds = ids;

        // 高亮节点
        ids.forEach(el => {
          let id = el;
          const item = this.graph.findById(id);
          let model = {
            ...el,
            hightlight: true,
          }
          this.graph.updateItem(item, model)
        })
        // 高亮
        // arr.forEach(el => {
        //   let id = el.id;
        //   const item = this.graph.findById(id);
        //   let model = {
        //     ...el,
        //     hightlight: true,
        //   }
        //   this.graph.updateItem(item, model)
        // })
      }else{
        this.searchIds = [];
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
    // 寻找某个节点下的所有子节点
    findAllChildNodes(id) {
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
      findAllNodeFunc(id);
      // 去重
      curNodes = [...new Set(curNodes)];
      return curNodes
    },
    customNode() {
      const _this = this
      G6.registerNode('icon-node', {
        draw(cfg, group) {
          
          const isRoot = cfg.id === rootId //'根节点'
          // 取宽高的一半 后边的文本方便居中
          const x = -rectShapeWidth / 2
          const y = -rectShapeHeight / 2
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
                x,
                y,
                width: rectShapeWidth,
                height: rectShapeHeight,
                fill: isRoot ? '#4ea2f0' : '#fff',
                stroke: cfg.hightlight ? 'red' : '#4ea2f0',
                radius: 2,
                cursor: 'pointer'
              },
              name: 'container-node',
            })
          }

          // 处理文本换行
          const label = _this.fittingString(cfg.name, 124, 12, 2, cfg)
          // 画文本
          group.addShape('text', {
            attrs: {
              text: label,
              x: 0,
              y: 0,
              textAlign: 'center',
              textBaseline: 'middle',
              fill: isRoot ? '#fff' : '#303242',
              cursor: 'pointer'
            },
            name: 'text-node'
          })

          // 画展开图标
          // 查找当前节点下的子节点
          if (_this.checkCompanyNodeAndStaffNodeExist(cfg.id)) {
            // 偏移量
            const offset = 30
            // 公司
            group.addShape('marker', {
              attrs: {
                x: -rectShapeWidth / 2 + offset,
                y: -y + 10,
                r: 6,
                fill: '#fff',
                stroke: '#4ea2f0',
                cursor: 'pointer',
                symbol: cfg.collapsed1 ? EXPAND_ICON : COLLAPSE_ICON // 图标的路径函数
              },
              name: 'collapse-node1',
              modelId: cfg.id,
            })
            // 员工
            group.addShape('marker', {
              attrs: {
                x: rectShapeWidth / 2 - offset,
                y: -y + 10,
                r: 6,
                fill: '#fff',
                stroke: '#4ea2f0',
                cursor: 'pointer',
                symbol: cfg.collapsed2 ? EXPAND_ICON : COLLAPSE_ICON // 图标的路径函数
              },
              name: 'collapse-node2',
              modelId: cfg.id,
            })
          } else if (_this.checkChildNodesExist(cfg.id)) {
            group.addShape('marker', {
              attrs: {
                x: 0,
                y: -y + 10,
                r: 6,
                fill: '#fff',
                stroke: '#4ea2f0',
                cursor: 'pointer',
                symbol: cfg.collapsed3 ? EXPAND_ICON : COLLAPSE_ICON // 图标的路径函数
              },
              name: 'collapse-node3',
              modelId: `${cfg.id}`,
            })
          }

          // 如果不是根节点，在上面加上折叠图标
          // if(!isRoot){
          //   group.addShape('marker', {
          //     attrs: {
          //       x: 0,
          //       y: -22,
          //       r: 6,
          //       fill: '#fff',
          //       stroke: '#4ea2f0',
          //       cursor: 'pointer',
          //       symbol: cfg.collapsedTop ? EXPAND_ICON : COLLAPSE_ICON // 图标的路径函数
          //     },
          //     name: 'collapse-node-top',
          //     modelId: `${cfg.id}`,
          //   })
          // }


          // }
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
          if (name === 'collapsed3') {
            const group = item.getContainer();
            const collapseNode = group.find(ele => ele.get('name') === 'collapse-node3');
            collapseNode.attr({
              symbol: value ? EXPAND_ICON : COLLAPSE_ICON,
            });
          } else if (name === 'collapsed1') {
            const group = item.getContainer();
            const collapseNode = group.find(ele => ele.get('name') === 'collapse-node1');
            collapseNode.attr({
              symbol: value ? EXPAND_ICON : COLLAPSE_ICON,
            });
          } else if (name === 'collapsed2') {
            const group = item.getContainer();
            const collapseNode = group.find(ele => ele.get('name') === 'collapse-node2');
            collapseNode.attr({
              symbol: value ? EXPAND_ICON : COLLAPSE_ICON,
            });
          } else if (name === 'collapsedTop') {
            const group = item.getContainer();
            const collapseNode = group.find(ele => ele.get('name') === 'collapse-node-top');
            collapseNode.attr({
              symbol: value ? EXPAND_ICON : COLLAPSE_ICON,
            });
          }
        },
      })
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
    customEdge() {
      const _this = this;
      G6.registerEdge('flow-line', {
        draw(cfg, group) {
          const sourceNodeModel = cfg.sourceNode.getModel();
          // console.log(sourceNodeModel,11)
        
          // 分别是边两端与起始节点和结束节点的交点
          const startPoint = cfg.startPoint;
          const endPoint = cfg.endPoint;
          const targetNodeModel = cfg.targetNode.getModel()
          const stockProportion = targetNodeModel.stockProportion
          // 只有一个节点默认从中间开始连线
          let startPointX = startPoint.x;
          let endPointX = endPoint.x;

          let lightEdge  = false;
          // 父节点和子节点都高亮，则高亮他们的连线
          if(sourceNodeModel.hightlight && targetNodeModel.hightlight){
            lightEdge = true;
          }

          if (_this.checkCompanyNodeAndStaffNodeExist(sourceNodeModel.id)) {
            // 偏移量
            const offset = 30
            // 员工节点
            if (targetNodeModel.staff) {
              startPointX += rectShapeWidth / 2 - offset
            } else {
              startPointX -= rectShapeWidth / 2 - offset
            }
          }

          // 根据两个点画出想要的边
          const pathShape = group.addShape('path', {
            attrs: {
              stroke: lightEdge ? 'red' : '#4ea2f0',
              // stroke: '#eee',
              // svg path
              // https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths
              // path: [
              //   ['M', startPoint.x, startPoint.y],
              //   ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y], // 三分之一处
              //   ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y], // 三分之二处
              //   ['L', endPoint.x, endPoint.y],
              // ],
              // path: [
              //   ['M', startPoint.x, startPoint.y],
              //   // ['L', startPoint.x, (startPoint.y + endPoint.y) / 2],
              //   // ['L', endPoint.x, (startPoint.y + endPoint.y) / 2],
              //   ['L', endPoint.x, endPoint.y]
              // ],
              path: [
                ['M', startPointX, startPoint.y],
                ['L', endPointX, endPoint.y]
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
      layout: {
        type: 'dagre',
        rankdir: 'TB', // 可选，默认为图的中心
        // align: 'DL', // 可选
        nodesep: 50, // 可选
        ranksep: 40, // 可选
        // controlPoints: true, // 可选
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


    const handleCollapse = (e, name) => {
      const target = e.target;
      const curNodeId = target.get('modelId');
      const item = this.graph.findById(curNodeId);
      const nodeModel = item.getModel();
      // 寻找所有子节点 隐藏或显示
      let findResNodesIds = [];
      // 寻找该节点下一层公司节点的所有子节点
      const getFindResNodesIds = () => {
        let resArr = [];
        // 寻找该节点下一层公司节点的所有子节点
        let targetCurNodes = ghData.edges.filter(el => el.source === curNodeId);
        targetCurNodes = targetCurNodes.map(el => el.target);
        let curNodes = [];
        if (name === 'collapse-node1') {
          curNodes = ghData.nodes.filter(el => targetCurNodes.includes(el.id) && !el.staff)
        } else if (name === 'collapse-node2') {
          curNodes = ghData.nodes.filter(el => targetCurNodes.includes(el.id) && el.staff)
        }
        curNodes = curNodes.map(el => el.id);
        resArr = curNodes;

        curNodes.forEach(el => {
          resArr = resArr.concat(this.findAllChildNodes(el))
        })
        resArr = [...new Set(resArr)];
        return resArr
      }
      // 只有公司或者员工
      if (name === 'collapse-node3') {
        nodeModel.collapsed3 = !nodeModel.collapsed3;
        this.graph.setItemState(item, 'collapsed3', nodeModel.collapsed3);
        findResNodesIds = this.findAllChildNodes(curNodeId);
        // 隐藏或显示
        findResNodesIds.forEach(el => {
          const curItem = this.graph.findById(el);
          if (nodeModel.collapsed3) {
            this.graph.hideItem(curItem)
          } else {
            this.graph.showItem(curItem)
          }
        })
        // 公司
      } else if (name === 'collapse-node1') {
        nodeModel.collapsed1 = !nodeModel.collapsed1;
        this.graph.setItemState(item, 'collapsed1', nodeModel.collapsed1);
        // 寻找该节点下一层公司节点的所有子节点
        findResNodesIds = getFindResNodesIds();
        // 隐藏或显示
        findResNodesIds.forEach(el => {
          const curItem = this.graph.findById(el);
          if (nodeModel.collapsed1) {
            this.graph.hideItem(curItem)
          } else {
            this.graph.showItem(curItem)
          }
        })
        // 员工
      } else if (name === 'collapse-node2') {
        nodeModel.collapsed2 = !nodeModel.collapsed2;
        this.graph.setItemState(item, 'collapsed2', nodeModel.collapsed2);
        // 寻找该节点下一层员工节点的所有子节点
        findResNodesIds = getFindResNodesIds();
        // 隐藏或显示
        findResNodesIds.forEach(el => {
          const curItem = this.graph.findById(el);
          if (nodeModel.collapsed2) {
            this.graph.hideItem(curItem)
          } else {
            this.graph.showItem(curItem)
          }
        })
      }else if('collapse-node-top'){
        nodeModel.collapsedTop = !nodeModel.collapsedTop;
        this.graph.setItemState(item, 'collapsedTop', nodeModel.collapsedTop);
        findResNodesIds = this.findAllChildNodes(curNodeId);
        findResNodesIds.unshift(curNodeId);
        // 隐藏或显示
        findResNodesIds.forEach(el => {
          const curItem = this.graph.findById(el);
          if (nodeModel.collapsedTop) {
            this.graph.hideItem(curItem)
          } else {
            this.graph.showItem(curItem)
          }
        })
      }

      console.log("findResNodesIds", findResNodesIds)


    };
    this.graph.on('collapse-node1:click', (e) => {
      console.log('collapse-node1:click')
      handleCollapse(e, 'collapse-node1');
    });
    this.graph.on('collapse-node2:click', (e) => {
      console.log('collapse-node2:click')
      handleCollapse(e, 'collapse-node2');
    });
    this.graph.on('collapse-node3:click', (e) => {
      console.log('collapse-node3:click')
      handleCollapse(e, 'collapse-node3');
    });
    this.graph.on('collapse-node-top:click', (e) => {
      console.log('collapse-node-top:click')
      handleCollapse(e, 'collapse-node-top');
    });

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

    // ghData.nodes.forEach(el => {
    //   let id = el.id;
    //   const item = this.graph.findById(id);
    //   let model = {
    //     ...el,
    //     collapsed1: true,
    //     collapsed2: true,
    //     collapsed3: true,
    //   }
    //   this.graph.updateItem(item, model)
    //   // this.graph.hideItem(item);
    // })

  },
}
</script>
<style lang="scss" scoped>
.home {
  position: relative;
}
</style>
