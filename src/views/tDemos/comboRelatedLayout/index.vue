<template>
  <!-- 【步骤1】 创建容器 -->
  <!-- <div class="g6-x" id="containerG6" ref="containerG6"></div> -->
  <div id="container" ref="container" class="container" />
</template>

<script>
// 【步骤2】 引入G6
import G6 from "@antv/g6";

export default {
name: "Started",
data() {
  return {
    graph: null,
    // 【步骤3】 准备数据
    graphData: {
      nodes: [
        {
          id: "0",
          comboId: "a",
        },
        {
          id: "1",
          comboId: "a",
        },
        {
          id: "2",
          comboId: "a",
        },
        {
          id: "3",
          comboId: "a",
        },
        {
          id: "4",
          comboId: "a",
        },
        {
          id: "5",
          comboId: "a",
        },
        {
          id: "6",
          comboId: "a",
        },
        {
          id: "7",
          comboId: "a",
        },
        {
          id: "8",
          comboId: "a",
        },
        {
          id: "9",
          comboId: "a",
        },
        {
          id: "10",
          comboId: "a",
        },
        {
          id: "11",
          comboId: "a",
        },
        {
          id: "12",
          comboId: "a",
        },
        {
          id: "13",
          comboId: "a",
        },
        {
          id: "14",
          comboId: "a",
        },
        {
          id: "15",
          comboId: "a",
        },
        {
          id: "16",
          comboId: "b",
        },
        {
          id: "17",
          comboId: "b",
        },
        {
          id: "18",
          comboId: "b",
        },
        {
          id: "19",
          comboId: "b",
        },
        {
          id: "20",
        },
        {
          id: "21",
        },
        {
          id: "22",
        },
        {
          id: "23",
          comboId: "c",
        },
        {
          id: "24",
          comboId: "a",
        },
        {
          id: "25",
        },
        {
          id: "26",
        },
        {
          id: "27",
          comboId: "c",
        },
        {
          id: "28",
          comboId: "c",
        },
        {
          id: "29",
          comboId: "c",
        },
        {
          id: "30",
          comboId: "c",
        },
        {
          id: "31",
          comboId: "c",
        },
        {
          id: "32",
          comboId: "d",
        },
        {
          id: "33",
          comboId: "d",
        },
      ],
      edges: [
        {
          source: "a",
          target: "b",
          label: "Combo A - Combo B",
          size: 3,
          labelCfg: {
            autoRotate: true,
            style: {
              stroke: "#fff",
              lineWidth: 5,
              fontSize: 20,
            },
          },
          style: {
            stroke: "red",
          },
        },
        {
          source: "a",
          target: "33",
          label: "Combo-Node",
          size: 3,
          labelCfg: {
            autoRotate: true,
            style: {
              stroke: "#fff",
              lineWidth: 5,
              fontSize: 20,
            },
          },
          style: {
            stroke: "blue",
          },
        },
        {
          source: "0",
          target: "1",
        },
        {
          source: "0",
          target: "2",
        },
        {
          source: "0",
          target: "3",
        },
        {
          source: "0",
          target: "4",
        },
        {
          source: "0",
          target: "5",
        },
        {
          source: "0",
          target: "7",
        },
        {
          source: "0",
          target: "8",
        },
        {
          source: "0",
          target: "9",
        },
        {
          source: "0",
          target: "10",
        },
        {
          source: "0",
          target: "11",
        },
        {
          source: "0",
          target: "13",
        },
        {
          source: "0",
          target: "14",
        },
        {
          source: "0",
          target: "15",
        },
        {
          source: "0",
          target: "16",
        },
        {
          source: "2",
          target: "3",
        },
        {
          source: "4",
          target: "5",
        },
        {
          source: "4",
          target: "6",
        },
        {
          source: "5",
          target: "6",
        },
        {
          source: "7",
          target: "13",
        },
        {
          source: "8",
          target: "14",
        },
        {
          source: "9",
          target: "10",
        },
        {
          source: "10",
          target: "22",
        },
        {
          source: "10",
          target: "14",
        },
        {
          source: "10",
          target: "12",
        },
        {
          source: "10",
          target: "24",
        },
        {
          source: "10",
          target: "21",
        },
        {
          source: "10",
          target: "20",
        },
        {
          source: "11",
          target: "24",
        },
        {
          source: "11",
          target: "22",
        },
        {
          source: "11",
          target: "14",
        },
        {
          source: "12",
          target: "13",
        },
        {
          source: "16",
          target: "17",
        },
        {
          source: "16",
          target: "18",
        },
        {
          source: "16",
          target: "21",
        },
        {
          source: "16",
          target: "22",
        },
        {
          source: "17",
          target: "18",
        },
        {
          source: "17",
          target: "20",
        },
        {
          source: "18",
          target: "19",
        },
        {
          source: "19",
          target: "20",
        },
        {
          source: "19",
          target: "33",
        },
        {
          source: "19",
          target: "22",
        },
        {
          source: "19",
          target: "23",
        },
        {
          source: "20",
          target: "21",
        },
        {
          source: "21",
          target: "22",
        },
        {
          source: "22",
          target: "24",
        },
        {
          source: "22",
          target: "25",
        },
        {
          source: "22",
          target: "26",
        },
        {
          source: "22",
          target: "23",
        },
        {
          source: "22",
          target: "28",
        },
        {
          source: "22",
          target: "30",
        },
        {
          source: "22",
          target: "31",
        },
        {
          source: "22",
          target: "32",
        },
        {
          source: "22",
          target: "33",
        },
        {
          source: "23",
          target: "28",
        },
        {
          source: "23",
          target: "27",
        },
        {
          source: "23",
          target: "29",
        },
        {
          source: "23",
          target: "30",
        },
        {
          source: "23",
          target: "31",
        },
        {
          source: "23",
          target: "33",
        },
        {
          source: "32",
          target: "33",
        },
      ],
      combos: [
        {
          id: "a",
          label: "Combo A",
        },
        {
          id: "b",
          label: "Combo B",
        },
        {
          id: "c",
          label: "Combo C",
        },
        {
          id: "d",
          label: "Combo D",
          parentId: "b",
        },
      ],
    },
  };
},
methods: {
  // 初始化关系图，并渲染数据
  initGraph() {
    // cache the initial combo children infomation
    const comboChildrenCache = {};
    // cache the initial parent infomation
    const itemComboMap = {};
    // cache the initial node and combo info
    const itemMap = {};
    // cache the combo related edges
    const comboEdges = {};
    this.graphData.nodes.concat(this.graphData.combos).forEach((item) => {
      const { id, comboId, parentId } = item;
      const parentComboId = comboId || parentId;
      if (parentComboId) {
        if (!comboChildrenCache[parentComboId])
          comboChildrenCache[parentComboId] = [];
        comboChildrenCache[parentComboId].push(id);
        itemComboMap[id] = parentComboId;
      }
      itemMap[id] = { ...item };
    });
    const comboIds = this.graphData.combos.map((combo) => combo.id);
    this.graphData.edges.forEach((edge) => {
      const { source, target } = edge;
      [source, target].forEach((endId) => {
        if (comboIds.includes(endId)) {
          if (!comboEdges[endId]) comboEdges[endId] = [];
          comboEdges[endId].push(edge);
        }
      });
    });

    // colorize the nodes and combos
    const subjectColors = [
      "#5F95FF", // blue
      "#61DDAA",
      "#65789B",
      "#F6BD16",
      "#7262FD",
      "#78D3F8",
      "#9661BC",
      "#F6903D",
      "#008685",
      "#F08BB4",
    ];
    const backColor = "#fff";
    const theme = "default";
    const disableColor = "#777";
    const colorSets = G6.Util.getColorSetsBySubjectColors(
      subjectColors,
      backColor,
      theme,
      disableColor
    );
    this.graphData.combos.forEach((combo, i) => {
      const color = colorSets[i % colorSets.length];
      combo.style = {
        stroke: color.mainStroke,
        fill: color.mainFill,
        opacity: 0.8,
      };
      itemMap[combo.id].style = { ...combo.style };
    });
    this.graphData.nodes.forEach((node) => {
      const comboId = itemComboMap[node.id];
      const parentCombo = itemMap[comboId];
      if (parentCombo) {
        node.style = {
          stroke: parentCombo.style.stroke,
          fill: parentCombo.style.fill,
        };
      }
    });

    const contextMenu = new G6.Menu({
      itemTypes: ["combo", "node"],
      shouldBegin: (evt) => {
        // avoid showing up context menu in some situations
        const type = evt.item.getType();
        const { id, comboId, collapsed } = evt.item.getModel();
        if (collapsed) return false;

        const hasOriComboId = Object.values(comboChildrenCache).find(
          (childrenIds) => childrenIds.includes(id)
        );
        if (type === "node" && (comboId || !hasOriComboId)) return false;
        return true;
      },
      getContent: (evt) => {
        const type = evt.item.getType();
        const { id, comboId, parentId, collapsed } = evt.item.getModel();
        const hasOriComboId = Object.values(comboChildrenCache).find(
          (childrenIds) => childrenIds.includes(id)
        );

        if (type === "combo") {
          // no context menu for collapsed combo
          if (collapsed) return "";
          // does not have parent currently but had parent at initial
          if (hasOriComboId && !parentId)
            return `<span id="uncombo">uncombo</span><br/><span id="re-combo">re-combo</span>`;
          // did not have parent at initail
          return `<span id="uncombo">uncombo</span>`;
        }

        // has combo currently
        if (comboId) return "";
        // does not have combo but had combo at initial
        if (hasOriComboId) return `<span id="recombo">re-combo</span>`;
        return "";
      },
      handleMenuClick: (target, item) => {
        if (target.innerHTML === "uncombo") {
          graph.uncombo(item);
          graph.layout();
        } else {
          const id = item.getID();
          const comboId = itemComboMap[id];
          if (comboId) {
            const childrenIds = comboChildrenCache[comboId].filter(
              (cid) => !!graph.findById(cid)
            );
            graph.createCombo(
              {
                ...itemMap[comboId],
              },
              childrenIds
            );
            // add the related edges back
            comboEdges[comboId]?.forEach((edge) => {
              const { source, target } = edge;
              const otherEnd = source === comboId ? target : source;
              // add it back only when the other end of the edge exist currently
              if (graph.findById(otherEnd)) {
                graph.addItem("edge", edge);
              }
            });
            graph.layout();
          }
        }
      },
    });

    const container = this.$refs.container;
    const width = container.scrollWidth;
    const height = (container.scrollHeight || 500) - 160;
    // const height =`calc(100vh - 45px)`;
    const graph = new G6.Graph({
      container: "container",
      width,
      height,
      fitView: true,
      fitViewPadding: 50,
      animate: true,
      minZoom: 0.00000001,
      plugins: [contextMenu],
      layout: {
        type: "comboCombined",
        spacing: 5,
        outerLayout: new G6.Layout["forceAtlas2"]({
          kr: 10,
        }),
        // direction: 'TB', // 垂直布局（从上到下）  
      },
      defaultNode: {
        size: 15,
        style: {
          lineWidth: 2,
          fill: "#C6E5FF",
        },
      },
      defaultEdge: {
        size: 2,
        color: "#e2e2e2",
      },
      defaultCombo: {
        collapsedSubstituteIcon: {
          show: true,
          img: "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IEQFS5VtXX8AAAAAAAAAAABkARQnAQ",
          width: 68,
          height: 68,
        },
      },
      modes: {
        default: [
          "drag-combo",
          "drag-node",
          "drag-canvas",
          "zoom-canvas",
          "collapse-expand-combo",
        ],
      },
    });
    graph.data(this.graphData);
    graph.render();
    if (typeof window !== "undefined")
      window.onresize = () => {
        if (!graph || graph.get("destroyed")) return;
        if (!container || !container.scrollWidth || !container.scrollHeight)
          return;
        graph.hangeSize(container.scrollWidth, container.scrollHeight);
      };
  },
},
mounted() {
  this.initGraph();
},
};
</script>

<style scoped>
/* .g6-x {
  width: 800px;
  height: 500px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  margin-left: 20px;
} */
.container {
width: 100%;
height: 100%
}
.g6-component-contextmenu {
position: absolute;
list-style-type: none;
padding: 10px 8px;
left: -150px;
background-color: rgba(255, 255, 255, 0.9);
border: 1px solid #e2e2e2;
border-radius: 4px;
font-size: 12px;
color: #545454;
}
.g6-component-contextmenu span {
cursor: pointer;
list-style-type: none;
list-style: none;
margin-left: 0px;
}
.g6-component-contextmenu span:hover {
color: #5b8ff9;
}
</style>
