<template>
  <el-container class="h-full">
    <!-- <el-header>Header</el-header> -->
    <el-container>
      <el-aside style="border-right: 1px solid #ccc; width: 200px;">
        <el-menu :default-active="activeName" @select="handleSelect" class="el-menu-vertical-demo" @open="handleOpen"
          @close="handleClose">
          <el-menu-item :index="item.id" v-for="(item, index) in demoList" :key="index">
            <i class="el-icon-document"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
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
      demoList: [
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
    }
  },
  computed: {
    curComponents() {
      return this.demoList.find(el => el.id === this.activeName).component;
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
