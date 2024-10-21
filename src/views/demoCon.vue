<template>
  <el-container class="h-full">
    <!-- <el-header>Header</el-header> -->
    <el-container>
      <el-aside style="border-right: 1px solid #ccc; width: 200px">
        <el-menu
          :default-active="activeName"
          @select="handleSelect"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
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
          <el-menu-item index="t1">
            <i class="el-icon-document"></i>
            <span slot="title">test1</span>
          </el-menu-item>
          <el-menu-item index="t2">
            <i class="el-icon-document"></i>
            <span slot="title">test2</span>
          </el-menu-item>
          <el-menu-item index="tg6">
            <i class="el-icon-document"></i>
            <el-button @click="toG6">To G6</el-button>
          </el-menu-item>
          <el-menu-item index="relationGraph">
            <i class="el-icon-document"></i>
            <el-button @click="toGraph">To Graph</el-button>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <demo1 class="h-full w-full" v-if="activeName === '1'" />
        <demo2 class="h-full w-full" v-if="activeName === '2'" />
        <demo3 class="h-full w-full" v-if="activeName === '3'" />
        <test1 class="h-full w-full" v-if="activeName === 't1'" />
        <test2 class="h-full w-full" v-if="activeName === 't2'" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import demo1 from "./demo1.vue";
import demo2 from "./demo2.vue";
import demo3 from "./demo3_1.vue";
import test1 from "./demo/TestG61.vue";
import test2 from "./demo/Test2.vue";
export default {
  name: "HomeView",
  components: {
    demo1,
    demo2,
    demo3,
    test1,
    test2,
  },
  data() {
    return {
      activeName: "2",
    };
  },
  methods: {
    handleSelect(val) {
      this.activeName = val;
      if (val === "tg6") {
        this.$router.push("/antvG6");
      } else if (val === "relationGraph") {
        this.$router.push("/relationGraph");
      }
    },
    handleOpen() {},
    handleClose() {},
    toG6() {
      this.$router.push("/antvG6");
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.demoCon {
}
</style>
