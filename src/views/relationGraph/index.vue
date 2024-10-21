<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一11</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title"></span>
        </el-menu-item>
        <el-menu-item index="/relationGraph/graphDetail">
          <i class="el-icon-document"></i>
          <span slot="title">graphDetail</span>
        </el-menu-item>
        <el-menu-item index="/relationGraph/nodeDetailsFloatBox">
          <i class="el-icon-document"></i>
          <span slot="title">节点详情悬浮框</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>Graph</el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </el-container>
</template>
<script>
  export default {
    methods: {
      handleSelect(key, keyPath) {
        debugger
        // console.log(key, keyPath);
        this.$router.push(key)
      },
      handleOpen(key, keyPath) {
        debugger
        // console.log(key, keyPath);
        // this.$router.push(key)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
