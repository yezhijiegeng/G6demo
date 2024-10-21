<template>
  <el-container class="container">
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
        <el-menu-item index="/antvG6/groupView">
          <i class="el-icon-document"></i>
          <span slot="title">groupView</span>
        </el-menu-item>
        <el-menu-item index="/antvG6/test">
          <i class="el-icon-setting"></i>
          <span slot="title">test</span>
        </el-menu-item>
        <!--   <el-menu-item index="/antvG6/comboCombined">
          <i class="el-icon-setting"></i>
          <span slot="title">Combo 复合布局</span>
        </el-menu-item> -->
        <el-menu-item index="/antvG6/comboRelatedLayout">
          <span slot="title">Combo 相关布局</span>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>combo</span>
          </template>
          <el-menu-item index="/antvG6/combo/comboCombined"
            >comboCombined</el-menu-item
          >
          <el-menu-item index="/antvG6/combo/comboOverview"
            >combo 总览</el-menu-item
          >
          <!-- <el-menu-item-group>
            <template slot="title">分组一11</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group> -->
        </el-submenu>
      </el-menu>
    </el-aside>
    <router-view></router-view>
  </el-container>
</template>
<script>
export default {
  methods: {
    handleSelect(key, keyPath) {
      debugger;
      // console.log(key, keyPath);
      this.$router.push(key);
    },
    handleOpen(key, keyPath) {
      debugger;
      // console.log(key, keyPath);
      // this.$router.push(key)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style>
.container {
  height: 100%;
}
</style>
