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
              <span>DDemo</span>
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
          component: () => import('./demo1.vue')
        },
        {
          id: '2',
          title: 'demo2',
          component: () => import('./demo2.vue')
        },
        {
          id: '3',
          title: 'demo3',
          component: () => import('./demo3.vue')
        },
        {
          id: '4',
          title: 'demo4',
          component: () => import('./demo4.vue')
        },
        {
          id: '5',
          title: 'demo5',
          component: () => import('./demo5.vue')
        },
        {
          id: '6',
          title: 'demo6',
          component: () => import('./demo6.vue')
        },
      ],
      tDemoList: [
        {
          id: 't1',
          title: 'demo1',
          component: () => import('./demo1.vue')
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
