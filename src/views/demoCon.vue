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
          <el-menu-item index="/antvG6">
            <!-- <i class="el-icon-document"></i>
            <span slot="title">demo4</span> -->
            <!-- <el-button @click="m">toG6</el-button> -->
            <i class="el-icon-document"></i>
            <span slot="title">toG6</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-document"></i>
            <span slot="title">demo4</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <demo1 class="h-full w-full" v-if="activeName === '1'" />
        <demo2 class="h-full w-full" v-if="activeName === '2'" />
        <demo3 class="h-full w-full" v-if="activeName === '3'" />
        <!-- <demo3 class="h-full w-full" v-if="activeName === '4'" /> -->
        <demo4 class="h-full w-full" v-if="activeName === '4'" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import demo1 from './demo1.vue'
import demo2 from './demo2.vue'
import demo3 from './demo3.vue'
import demo4 from './demo4.vue'
export default {
  name: "HomeView",
  components: {
    demo1,
    demo2,
    demo3,
    demo4,
  },
  data() {
    return {
      activeName: '4',
    }
  },
  methods: {
    handleSelect(val) {
      this.activeName = val
        if(val.startsWith("/")){
        this.$router.push(val)
      }
      
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
