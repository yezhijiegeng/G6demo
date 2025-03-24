<template>
  <div class="w-full h-full">
    <div class="w-full">
      <el-button @click="addChild" size="mini">添加子节点</el-button>
      <el-button @click="addData" size="mini">addData</el-button>
      <el-button @click="addCombo" size="mini">addComboData</el-button>
      <el-button @click="addNode" size="mini">addNodeData</el-button>
      <el-button @click="addEdge" size="mini">addEdgeData</el-button>
      <el-button @click="getAncestors" size="mini"
        >getAncestorsData 获取节点或组合的祖先元素数据(!)</el-button
      >
      <el-button @click="getCombo" size="mini"
        >getComboData 获取单个组合数据</el-button
      >
      <el-button @click="getDescendants" size="mini"
        >getDescendantsData 获取节点或组合的后代元素数据</el-button
      >
      <el-button @click="getEdge" size="mini"
        >getEdgeData 获取所有边数据</el-button
      >
      <div>
        状态：
        <el-button @click="setState" size="mini"> 设置状态(选中)</el-button>
        <el-button @click="getByState" size="mini"
          >getElementDataByState 获取指定状态下的节点数据</el-button
        ><el-button @click="getSelfState" size="mini">
          设置自定义状态</el-button
        >
      </div>
      <div>
        <el-button @click="clear" size="mini">清空画布</el-button>
        <el-button @click="getCanvas" size="mini">获取画布</el-button>
        <el-button @click="getGraphSize" size="mini">获取尺寸</el-button>
        <el-button @click="setGraphSize" size="mini">设置尺寸</el-button>
        <el-button @click="onCollapseElement" size="mini">收起元素</el-button>
        <el-button @click="setElementVisibility" size="mini">可见性</el-button>
        <el-button @click="onSetNode" size="mini">节点样式</el-button>
        <el-button @click="onTranslateElementBy" size="mini"
          >将元素平移指定距离(!)</el-button
        >
        <el-button @click="onHideElement" size="mini">隐藏元素</el-button>
        <el-button @click="onFitCenter" size="mini"
          >将图平移至视口中心</el-button
        >
        <el-button @click="onFitView" size="mini">放置合适大小</el-button>
        <el-button @click="onFocusElemen" size="mini"
          >将元素对齐到视口中心</el-button
        >
        <el-button @click="onGetPosition" size="mini">获取图的位置</el-button>
        <el-button @click="onResize" size="mini"
          >调整画布大小为图容器大小</el-button
        >
        <el-button @click="onTranslateTo" size="mini"
          >将图平移指定距离</el-button
        >
        <el-button @click="downloadImage" size="mini">导出图片</el-button>
        <!-- <img src="downloadUrl" alt=""> -->
      </div>
    </div>
    <div id="container" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { Graph, ComboEvent, NodeEvent, EdgeEvent } from "@/assets/js/g6V5.min";
import dataGraph5 from "@/views/config/mockData/dataGraph5";

const graph = new Graph({
  container: "container",
  autoFit: "center",
  data: dataGraph5,
  node: {
    type: "rect",
    style: {
      size: [60, 30],
      radius: 8,
      labelText: (d) => d.id,
      labelBackground: true,
      ports: [{ placement: "top" }, { placement: "bottom" }],
    },
    palette: {
      field: (d) => d.combo,
    },
    animation: {
      // enter: [
      //   {
      //     fields: ["opacity"],
      //     duration: 1000,
      //     easing: "linear",
      //   },
      // ],
      // update: [{ fields: ['x', 'y', 'size'] }, { fields: ['fill'], shape: 'key' }],
    },
    state: {
      selected: {
        stroke: "red",
      },
      "my-highlight": {
        stroke: "pink",
      },
    },
  },
  edge: {
    type: "cubic-vertical",
    style: {
      endArrow: true,
    },
  },
  combo: {
    type: "rect",
    style: {
      radius: 8,
      labelText: (d) => d.id,
    },
  },
  layout: {
    type: "antv-dagre",
    ranksep: 50,
    nodesep: 5,
    sortByCombo: true,
  },
  behaviors: ["drag-element", "drag-canvas", "zoom-canvas"],
  // background:'pink',
  // autoResize:true ,
  // cursor: {
  //   grab: 'cursor',
  // },
  // height:500  画布高度 如果未设置，则会自动获取容器高度
  autoFit: true,
  // padding:10,
  // rotation:90,
  // x:200
  // y:400
  // zoom:1.5
  // zoomRange:[0.1,2],
  // animation:{
  //   ViewportAnimationEffectTiming:false
  // }
});
onMounted(() => {
  graph.render();

  graph.on(ComboEvent.CLICK, (event) => {
    // event handler
    console.log("ComboEvent:", event);
  });
  graph.on(NodeEvent.CLICK, (event) => {
    // event handler
    console.log("NodeEvent:", event);
  });
});

const addChild = (e) => {
  console.log("111");
  graph.addChildrenData("3", [
    {
      id: "12",
      combo: "A",
    },
  ]);
  graph.render();
};
const addData = () => {
  graph.addData({
    nodes: [{ id: "node-1" }, { id: "node-2" }],
    edges: [{ source: "node-1", target: "node-2" }],
  });
  graph.render();
};

const addCombo = () => {
  graph.addComboData([{ id: "combo-1" }]);
};
const addEdge = () => {
  // graph.addEdgeData([{ source: "node-1", target: "node-2" }]);
  graph.addEdgeData([
    { source: "2", target: "11" },
    { source: "2", target: "combo-1" },
  ]);
  graph.render();
};
const addNode = () => {
  graph.addNodeData([
    { id: "node-3", combo: "combo-1" },
    { id: "node-4", combo: "combo-1" },
  ]);
  graph.render();
};
const getAncestors = () => {
  const res = graph.getAncestorsData("combo-1", "combo");
  console.log(res);
  graph.render();
};

const getCombo = () => {
  const data = graph.getComboData("A");
  console.log("getComboData:", data);
  // graph.render();
};
const getDescendants = () => {
  const data = graph.getDescendantsData("3");
  console.log(data);
  // graph.render();
};
const getEdge = () => {
  const data = graph.getEdgeData();
  console.log(data);
  // graph.render();
};
const setState = () => {
  graph.setElementState("4", "selected");
  graph.setElementState("A", "selected");
  // graph.setElementState("4", ["selected","disabled"]);
};
const getByState = () => {
  const data = graph.getElementDataByState("node", "selected");
  const combo = graph.getElementDataByState("combo", "selected");
  console.log(data);
  console.log(combo);
  // graph.render();
};
const getSelfState = () => {
  graph.setElementState("9", "my-highlight");
  graph.render();
};

const clear = () => {
  graph.clear();
};
const setGraphSize = () => {
  graph.setSize(200, 200);
};
const getGraphSize = () => {
  const size = graph.getSize();
  console.log(size);
};
const getCanvas = () => {
  const canvas = graph.getCanvas();
  console.log(canvas);
};
const onCollapseElement = () => {
  graph.collapseElement("3", false);
  graph.render();
  // graph.updateData()
  // console.log(canvas);
};
const setElementVisibility = () => {
  graph.setElementVisibility("3", "hidden", true);
  graph.render();
  // graph.updateData()
  // console.log(canvas);
};
const onSetNode = () => {
  graph.setNode({
    type: "circle",
  });
  graph.render();
};
const onTranslateElementBy = () => {
  graph.translateElementBy(["9"], 200, true);
  // graph.render();
};
const onHideElement = () => {
  graph.hideElement(["9"]);
};
const onFitView = () => {
  graph.fitView();
};
const onFitCenter = () => {
  graph.fitCenter();
};
const onFocusElemen = () => {
  graph.focusElement("11");
};
const onGetPosition = () => {
  const position = graph.getPosition();
  console.log(position);
};
const onResize = () => {
  graph.resize();
};
const onTranslateTo = () => {
  graph.translateTo([100, 100]);
};

// const downloadUrl = ref('')
let downloadUrl = "";


const downloadImage = async  () =>{
  const dataURL = await graph.toDataURL();
  const [head, content] = dataURL.split(',');
  // const contentType = head.match(/:(.*?);/)![1];
  const contentType = head.match(/:(.*?);/)?.[1] || '';

  const bstr = atob(content);
  let length = bstr.length;
  const u8arr = new Uint8Array(length);

  while (length--) {
    u8arr[length] = bstr.charCodeAt(length);
  }

  const blob = new Blob([u8arr], { type: contentType });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'graph.png';
  a.click();
}
</script>
