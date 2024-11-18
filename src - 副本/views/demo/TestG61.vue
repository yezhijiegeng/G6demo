<template>
  <div>
    <div id="drawGraph"></div>
  </div>
</template>

<script>
import G6 from '@antv/g6';
let graphG = null
export default {
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      let combos = [
        { id: '100-600', label: '100-600', type: 'root' },
        { id: '100-200', label: '100-200' },
        { id: '200-300', label: '200-300' },
        { id: '300-400', label: '300-400' },
        { id: '400-500', label: '400-500' },
        { id: '500-600', label: '500-600' },
      ]
      let edges = [
        { source: '100-200', target: '100-600' },
        { source: '200-300', target: '100-600' },
        { source: '300-400', target: '100-600' },
        { source: '400-500', target: '100-600' },
        { source: '500-600', target: '100-600' },
      ]
      let data = { combos, edges }
      this.makeRelationData(data);
    },
    // 分组 点 连线处理
    makeRelationData(data) {
      if (graphG) {
        graphG.destroy();
      }
      let drawGraph = document.getElementById("drawGraph");
      this.graphWidth = drawGraph.scrollWidth;
      this.graphHeight = drawGraph.scrollHeight || 1200;
      let origin = [this.graphWidth / 2, 100];
      let row = 150, clo = 180;
      let combos = data.combos
      let row_clo = Math.floor(Math.sqrt(combos.length));
      for (let i = 0; i < combos.length; i++) {
        let rowindex = Math.floor(i / row_clo) + 1;
        let cloindex = (i % row_clo) + 1;
        // 分组默认样式设置
        if (combos[i].type === 'root') {
          combos[i].x = this.graphWidth / 3
          combos[i].y = this.graphHeight / 3
          combos[i].style = {
            fill: "#B19693",
            opacity: 0.4,
            cursor: "pointer",
          };
        } else {
          // 分组定位
          combos[i].x = origin[0] + clo * cloindex;
          combos[i].y = origin[1] + row * rowindex;
          if (i % 2 === 1) {
            combos[i].y += 40;
          }
          combos[i].style = {
            fill: "#FAD069",
            opacity: 0.5,
            cursor: "pointer",
          }
        }
      }
      this.drawQfast(data)
    },
    drawQfast(data) {
      graphG = new G6.Graph({
        container: "drawGraph",
        width: this.graphWidth,
        height: this.graphHeight,
        groupByTypes: false,
        modes: {
          default: [
            { type: "zoom-canvas", enableOptimize: true, optimizeZoom: 0.2 },
            { type: "drag-canvas", enableOptimize: true },
            { type: "drag-node", enableOptimize: true, onlyChangeComboSize: true },
            { type: "drag-combo", enableOptimize: true, onlyChangeComboSize: true },
            { type: "brush-select", enableOptimize: true },
          ],
        },
        defaultEdge: {
          type: 'cubic-horizontal',
          lineWidth: 1,
          style: {
            endArrow: true,
            stroke: "#FAD069",
          },
        },
        edgeStateStyles: {
          hover: {
            lineWidth: 2,
          },
        },
        defaultNode: {
          type: "circle",
          size: 15,
          labelCfg: {
            position: "bottom",
            style: {
              fontSize: 15,
            },
          },
        },
        defaultCombo: {
          type: "circle",
          opacity: 0,
          lineWidth: 1,
          collapsed: true,
          labelCfg: {
            position: "top",
            refY: 5,
            style: {
              fontSize: 16,
            },
          },
        },
      });
      graphG.data(data);
      graphG.render(); // 渲染图
      graphG.zoom(0.8);  // 如果觉得节点大，可以缩放整个图
      graphG.on("edge:mouseenter", (e) => {
        graphG.setItemState(e.item, "hover", true);
      });

      graphG.on("edge:mouseleave", (e) => {
        graphG.setItemState(e.item, "hover", false);
      });

      graphG.on("combo:dblclick", (e) => {
        e.item._cfg.model.type = e.item._cfg.model.type === "rect" ? "circle" : "rect";  // 分组形状，方圆切换
        e.item._cfg.model.labelCfg.refY = e.item._cfg.model.type === "rect" ? -20 : 5;   // 切换形状，改变label定位

        const comboId = e.item._cfg.model.id
        graphG.collapseExpandCombo(comboId);

        // 分组收缩时,删除分组内的连线和节点
        if (e.item._cfg.model.collapsed) {   // 收缩 
          let newedges = e.item.getEdges();
          let newNodes = e.item.getNodes();
          for (let j = 0; j < newedges.length; j++) {
            graphG.removeItem(newedges[j]);
          }
          for (let i = 0; i < newNodes.length; i++) {
            graphG.removeItem(newNodes[i]);
          }
          data.edges.forEach(edge => {
            graphG.addItem("edge", edge);
          });
        } else {   // 展开
          // 分组展开时, 添加节点和连线，并给分组内的节点 添加位置信息
          let origin = [e.item._cfg.model.x, e.item._cfg.model.y];  // 获取当前分组combs的坐标
          let row = 110, clo = 150;
          // 生成(10-20)随机数个 随机数 模拟展开分组内的节点
          let randomCount = Math.floor(Math.random() * 10) + 10;
          let row_clo = Math.floor(Math.sqrt(randomCount));
          let nodes = []
          for (let i = 0; i < randomCount; i++) {
            let min = comboId.split('-')[0] - 0
            let max = comboId.split('-')[1] - 0
            let randomNum = Math.floor(Math.random() * (max - min)) + min;
            if (nodes.indexOf(randomNum) > -1) {
              i--
              continue;
            }
            nodes.push(randomNum)
            let rowindex = Math.floor(i / row_clo);
            let cloindex = i % row_clo;
            let y = origin[1] + row * rowindex
            let node = {
              label: randomNum,
              id: randomNum.toString(),
              comboId: comboId,
              style: {
                fillOpacity: 0.5,
                cursor: "pointer",
                fill: randomNum % 5 == 0 ? "#81C7D4" : "#986DB2"
              },
              x: origin[0] + clo * cloindex,
              y: i % 2 == 0 ? y + 40 : y
            }
            graphG.addItem("node", node); // 将节点添加至分组 
          }     
          nodes.sort((a, b) => a - b)  // 将分组内的数字排序，从小到大依次连接，模拟真实数据
          for (let i = 0; i < nodes.length - 1; i++) {
            let edge = {
              source: nodes[i].toString(),
              target: nodes[i + 1].toString(),
              lineWidth: 1,
              style: {
                lineDash: [2, 2],
                lineWidth: 0.5,
                stroke: "#00AA90"
              }
            }
            graphG.addItem("edge", edge);  // 添加连线   将分组内的数字排序，从小到大依次连接
          }
        }
      });
    },
  }
};
</script>
