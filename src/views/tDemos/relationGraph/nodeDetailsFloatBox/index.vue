<template>
  <div>
    <div ref="myPage" style="height:calc(100vh);">
      <RelationGraph
        ref="graphRef"
        :options="graphOptions"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick">
        <template #node="{node}">
          <div @mouseover="showNodeTips(node, $event)" @mouseout="hideNodeTips(node, $event)">
            <div class="c-my-rg-node">
              <i style="font-size: 30px;" :class="node.data.myicon" />
            </div>
            <div style="color: forestgreen;font-size: 16px;position: absolute;width: 160px;height:25px;line-height: 25px;margin-top:5px;margin-left:-48px;text-align: center;background-color: rgba(66,187,66,0.2);">
              {{ node.data.myicon }}
            </div>
          </div>
        </template>
      </RelationGraph>
      <div v-if="isShowNodeTipsPanel" :style="{left: nodeMenuPanelPosition.x + 'px', top: nodeMenuPanelPosition.y + 'px' }" style="z-index: 999;padding:10px;background-color: #ffffff;border:#eeeeee solid 1px;box-shadow: 0px 0px 8px #cccccc;position: absolute;">
        <div style="line-height: 25px;padding-left: 10px;color: #888888;font-size: 12px;">节点名称：{{currentNode.text}}</div>
        <div class="c-node-menu-item">id:{{currentNode.text}}</div>
        <div class="c-node-menu-item">图标:{{currentNode.data.myicon}}</div>
      </div>
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
import RelationGraph from 'relation-graph';
export default {
  name: 'Demo',
  components: {
		RelationGraph
	 },
  data() {
    return {
      isShowCodePanel: false,
      isShowNodeTipsPanel: false,
      nodeMenuPanelPosition: { x: 0, y: 0 },
      currentNode: {},
      graphOptions: {
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultNodeColor: 'rgba(66,187,66,1)',
        defaultJunctionPoint: 'border'
        // 这里可以参考"Graph 图谱"中的参数进行设置
      }
    };
  },
  mounted() {
    this.showGraph();
  },
  methods: {
    showGraph() {
      const __graph_json_data = {
        rootId: '2',
        nodes: [
          // 注意：在节点配置信息中，你的自定义属性需要像下面这样放到data标签中，否则数据会丢失
          { id: '1', text: '节点-1', data: { myicon: 'el-icon-star-on' }},
          { id: '2', text: '节点-2', data: { myicon: 'el-icon-setting' }},
          { id: '3', text: '节点-3', data: { myicon: 'el-icon-setting' }},
          { id: '4', text: '节点-4', data: { myicon: 'el-icon-star-on' }},
          { id: '6', text: '节点-6', data: { myicon: 'el-icon-setting' }},
          { id: '7', text: '节点-7', data: { myicon: 'el-icon-setting' }},
          { id: '8', text: '节点-8', data: { myicon: 'el-icon-star-on' }},
          { id: '9', text: '节点-9', data: { myicon: 'el-icon-headset' }},
          { id: '71', text: '节点-71', data: { myicon: 'el-icon-headset' }},
          { id: '72', text: '节点-72', data: { myicon: 'el-icon-s-tools' }},
          { id: '73', text: '节点-73', data: { myicon: 'el-icon-star-on' }},
          { id: '81', text: '节点-81', data: { myicon: 'el-icon-s-promotion' }},
          { id: '82', text: '节点-82', data: { myicon: 'el-icon-s-promotion' }},
          { id: '83', text: '节点-83', data: { myicon: 'el-icon-star-on' }},
          { id: '84', text: '节点-84', data: { myicon: 'el-icon-s-promotion' }},
          { id: '85', text: '节点-85', data: { myicon: 'el-icon-sunny' }},
          { id: '91', text: '节点-91', data: { myicon: 'el-icon-sunny' }},
          { id: '92', text: '节点-82', data: { myicon: 'el-icon-sunny' }},
          { id: '51', text: '节点-51', data: { myicon: 'el-icon-sunny' }},
          { id: '52', text: '节点-52', data: { myicon: 'el-icon-sunny' }},
          { id: '53', text: '节点-53', data: { myicon: 'el-icon-sunny' }},
          { id: '54', text: '节点-54', data: { myicon: 'el-icon-sunny' }},
          { id: '55', text: '节点-55', data: { myicon: 'el-icon-sunny' }},
          { id: '5', text: '节点-5', data: { myicon: 'el-icon-sunny' }}
        ],
        lines: [
          { from: '7', to: '71', text: '投资' },
          { from: '7', to: '72', text: '投资' },
          { from: '7', to: '73', text: '投资' },
          { from: '8', to: '81', text: '投资' },
          { from: '8', to: '82', text: '投资' },
          { from: '8', to: '83', text: '投资' },
          { from: '8', to: '84', text: '投资' },
          { from: '8', to: '85', text: '投资' },
          { from: '9', to: '91', text: '投资' },
          { from: '9', to: '92', text: '投资' },
          { from: '5', to: '51', text: '投资1' },
          { from: '5', to: '52', text: '投资' },
          { from: '5', to: '53', text: '投资3' },
          { from: '5', to: '54', text: '投资4' },
          { from: '5', to: '55', text: '投资' },
          { from: '1', to: '2', text: '投资' },
          { from: '3', to: '1', text: '高管' },
          { from: '4', to: '2', text: '高管' },
          { from: '6', to: '2', text: '高管' },
          { from: '7', to: '2', text: '高管' },
          { from: '8', to: '2', text: '高管' },
          { from: '9', to: '2', text: '高管' },
          { from: '1', to: '5', text: '投资' }
        ]
      };
      this.$refs.graphRef.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码
      });
    },
    onNodeClick(nodeObject, $event) {
      console.log('onNodeClick:', nodeObject);
    },
    onLineClick(lineObject, linkObject, $event) {
      console.log('onLineClick:', lineObject);
    },
    showNodeTips(nodeObject, $event) {
      this.currentNode = nodeObject;
      const _base_position = this.$refs.myPage.getBoundingClientRect();
      console.log('showNodeMenus:', $event.clientX, $event.clientY, _base_position);
      this.isShowNodeTipsPanel = true;
      this.nodeMenuPanelPosition.x = $event.clientX - _base_position.x + 10;
      this.nodeMenuPanelPosition.y = $event.clientY - _base_position.y + 10;
    },
    hideNodeTips(nodeObject, $event) {
      this.isShowNodeTipsPanel = false;
    }
  }
};
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
.c-my-rg-node {
  height:80px;line-height: 80px;border-radius: 50%;cursor: pointer;
  display: flex;
  place-items: center;
  justify-content: center;
}
.c-node-menu-item{
  line-height: 30px;padding-left: 10px;cursor: pointer;color: #444444;font-size: 14px;border-top:#efefef solid 1px;
}
.c-node-menu-item:hover{
  background-color: rgba(66,187,66,0.2);
}
</style>
