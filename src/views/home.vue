<template>
  <el-container class="h-full">
    <!-- <el-header>Header</el-header> -->
    <el-container>
      <el-aside style="border-right: 1px solid #ccc; width: 200px;">
        <el-menu :default-active="activeName" @select="handleSelect" class="el-menu-vertical-demo" @open="handleOpen"
          @close="handleClose">
          <el-submenu index="ta">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>tDemo</span>
            </template>
            <el-menu-item :index="item.id" v-for="(item, index) in tDemoList" :key="index">
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="du">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>dDemo</span>
            </template>
            <el-menu-item :index="item.id" v-for="(item, index) in ddemoList" :key="index">
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <component :is="curComponents"></component>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      activeName: '4',
      ddemoList: [
        {
          id: '1',
          title: 'demo1',
          component: () => import('./dDemos/demo1.vue')
        },
        {
          id: '2',
          title: 'demo2',
          component: () => import('./dDemos/demo2.vue')
        },
        {
          id: '3',
          title: 'demo3',
          component: () => import('./dDemos/demo3.vue')
        },
        {
          id: '4',
          title: 'demo4',
          component: () => import('./dDemos/demo4.vue')
        },
        {
          id: '5',
          title: 'demo5',
          component: () => import('./dDemos/demo5.vue')
        },
        {
          id: '6',
          title: 'demo6',
          component: () => import('./dDemos/demo6.vue')
        },
      ],
      tDemoList: [
        {
          id: 'groupView',
          title: 'groupView',
          component: () => import('./tDemos/groupView/index.vue')
        },
        {
          id: 'g6V5Base',
          title: 'g6V5Base',
          component: () => import('./tDemos/g6V5/base/index.vue')
        },
        {
          id: 'test',
          title: 'test',
          component: () => import('./tDemos/test/index.vue')
        },
        {
          id: 'groupOverview',
          title: 'groupOverview',
          component: () => import('./tDemos/groupOverview/index.vue')
        },
        {
          id: 'comboRelatedLayout',
          title: 'comboRelatedLayout',
          component: () => import('./tDemos/comboRelatedLayout/index.vue')
        },
        {
          id: 'comboCombined',
          title: 'comboCombined',
          component: () => import('./tDemos/combo/comboCombined/index.vue')
        },
        {
          id: 'comboOverview',
          title: 'comboOverview',
          component: () => import('./tDemos/combo/comboOverview/index.vue')
        },
        {
          id: 'comboRelatedLayout',
          title: 'comboRelatedLayout',
          component: () => import('./tDemos/comboRelatedLayout/index.vue')
        },
        {
          id: 'relationGraph',
          title: 'relationGraph',
          component: () => import('./tDemos/relationGraph/index.vue')
        },
        {
          id: 'graphDetail',
          title: 'graphDetail',
          component: () => import('./tDemos/relationGraph/graphDetail/index.vue')
        },
        {
          id: 'nodeDetailsFloatBox',
          title: 'nodeDetailsFloatBox',
          component: () => import('./tDemos/relationGraph/nodeDetailsFloatBox/index.vue')
        },
      ],
    }
  },
  computed: {
    curComponents() {
      const findCom = [...this.ddemoList, ...this.tDemoList].find(el => el.id === this.activeName)?.component;
      if (findCom) {
        return findCom
      }
    },
  },
  methods: {
    handleSelect(val) {
      this.activeName = val
    },
    handleOpen() { },
    handleClose() { },
  },
  mounted() { },
}
</script>
<style lang="scss" scoped>
.demoCon {}
</style>
