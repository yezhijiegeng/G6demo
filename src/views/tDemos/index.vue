<template>
  <div class="container w-full" style="max-width:100%;">
    <div class="left">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="/antvG6/groupOverview">
          <span slot="title">集团概览</span>
        </el-menu-item>
        <el-submenu index="mine">
          <template slot="title">
            <span>g6V5</span>
          </template>
          <el-menu-item index="/antvG6/g6V5/base">
            <span slot="title">base</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="/antvG6/groupView">
          <span slot="title">groupView</span>
        </el-menu-item>
        <el-menu-item index="/antvG6/toolBar/index.vue">
          <span slot="title">工具栏</span>
        </el-menu-item>
        <el-menu-item index="/antvG6/test">
          <span slot="title">test</span>
        </el-menu-item>
        <el-menu-item index="/antvG6/groupOverview">
          <span slot="title">Combo 相关布局</span>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <span>combo</span>
          </template>
          <el-menu-item index="/antvG6/combo/comboCombined"
            >comboCombined</el-menu-item
          >
          <el-menu-item index="/antvG6/combo/comboOverview"
            >combo 总览</el-menu-item
          >
        </el-submenu>
      </el-menu>
    </div>
    <div class="right w-full">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      collapsed: false,
    };
  },
  computed: {
    iconName() {
      return this.collapsed ? "chevron-right" : "chevron-left";
    },
  },
  methods: {
    changeCollapsed() {
      this.collapsed = !this.collapsed;
    },
    menuChange(route) {
      this.$router.push(route);
    },
    handleSelect(key, keyPath) {
      debugger;
      // console.log(key, keyPath);
      this.$router.push(key);
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
      // this.$router.push(key)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style lang="scss">
.container {
  display: flex;
  height: 100vh;
  .left {
    // background: pink;
    // flex: 1;
    // flex: 20% 0;
  }
  .right {
    // flex: 1;
    flex-grow: 1; // 让右边部分占剩余空间
    // background: skyblue;
  }
}
</style>
