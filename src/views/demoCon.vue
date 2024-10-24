<template>
  <el-container class="h-full">
    <!-- <el-header>Header</el-header> -->
    <el-container>
      <el-aside style="border-right: 1px solid #ccc; width: 200px;">
        <el-menu :default-active="activeName" @select="handleSelect" class="el-menu-vertical-demo" @open="handleOpen"
          @close="handleClose">
          <el-menu-item index="1">
            <i class="el-icon-document"></i>
            <span slot="title">demo1</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-document"></i>
            <span slot="title">demo2</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">demo3</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <demo1 class="h-full w-full" v-if="activeName === '1'" />
        <demo2 class="h-full w-full" v-if="activeName === '2'" />
        <demo3 class="h-full w-full" v-if="activeName === '3'" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import demo1 from './demo1.vue'
import demo2 from './demo2.vue'
import demo3 from './demo3.vue'
export default {
  name: 'HomeView',
  components: {
    demo1,
    demo2,
    demo3,
  },
  data() {
    return {
      activeName: '3',
    }
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
