<template>
  <el-container class="h-full">
    <!-- <el-header>Header</el-header> -->
    <el-container>
      <!-- style="border-right: 1px solid #ccc; width: 200px" -->
      <el-aside style="width: auto">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu
          :default-active="activeName"
          @select="handleSelect"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <el-submenu index="ta">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>tDemo</span>
            </template>
            <el-menu-item
              :index="item.id"
              v-for="(item, index) in tDemoList"
              :key="index"
            >
              <span slot="title">{{ item.title }}</span>
              <!-- <el-submenu :index="item.id" v-if="item.children">
                <span slot="title">{{ item.title }}</span>
                <el-menu-item
                  :index="item1.id"
                  v-for="(item1, index1) in item.children"
                  :key="index1"
                  >{{ item1.title }}</el-menu-item
                >
              </el-submenu>
              <el-menu-item :index="item.id" v-else>
                <span slot="title">{{ item.title }}</span>
              </el-menu-item> -->
            </el-menu-item>
          </el-submenu>
          <el-submenu index="du">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>dDemo</span>
            </template>
            <el-menu-item
              :index="item.id"
              v-for="(item, index) in ddemoList"
              :key="index"
            >
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
  name: "HomeView",
  components: {},
  props: {
    menuList: Array,
  },
  data() {
    return {
      activeName: "testMenu",
      isCollapse: false,
      ddemoList: [
        {
          id: "1",
          title: "demo1",
          component: () => import("./dDemos/demo1.vue"),
        },
        {
          id: "2",
          title: "demo2",
          component: () => import("./dDemos/demo2.vue"),
        },
        {
          id: "3",
          title: "demo3",
          component: () => import("./dDemos/demo3.vue"),
        },
        {
          id: "4",
          title: "demo4",
          component: () => import("./dDemos/demo4.vue"),
        },
        {
          id: "5",
          title: "demo5",
          component: () => import("./dDemos/demo5.vue"),
        },
        {
          id: "6",
          title: "demo6",
          component: () => import("./dDemos/demo6.vue"),
        },
      ],
      tDemoList: [
        // {
        //   id: "g6Test",
        //   title: "toG6",
        //   component: () => import("./tDemos/g6View/index.vue"),
        //   children: [
        //     {
        //       id: "g6V4",
        //       title: "g6V4",
        //       component: () => import("./tDemos/g6View/g6V4/index.vue"),
        //       children: [
        //         {
        //           id: "g6V4_1",
        //           title: "g6V4_1",
        //           component: () => import("./tDemos/g6View/index.vue"),
        //         },
        //       ],
        //     },
        //     {
        //       id: "test",
        //       title: "test",
        //       component: () => import("./tDemos/g6View/g6V4/index.vue"),
        //     },
        //   ],
        // },
        // {
        //   id: "mine",
        //   title: "我的",
        //   component: () => import("./tDemos/index.vue"),
        //   children: [
        //     {
        //       id: "g6V5",
        //       title: "g6V5",
        //       component: () => import("./tDemos/g6View/g6V4/index.vue"),
        //       children: [
        //         {
        //           id: "g6V4_1",
        //           title: "g6V4_1",
        //           component: () => import("./tDemos/g6View/index.vue"),
        //         },
        //       ],
        //     },
        //   ],
        // },
        {
          id: "g6v5_base",
          title: "g6v5_base",
          component: () => import("./tDemos/g6V5/base/index.vue"),
        },
        {
          id: "g6v5_select",
          title: "点击选中",
          component: () => import("./tDemos/g6V5/g6v5_select.vue"),
        },
        {
          id: "g6v5_legend",
          title: "图例",
          component: () => import("./tDemos/g6V5/g6v5Legend.vue"),
        },
        {
          id: "relations",
          title: "关系图谱",
          component: () => import("./tDemos/relations/index.vue"),
        },
        {
          id: "g6v5_demo4",
          title: "g6v5_demo4",
          component: () => import("./tDemos/g6V5/g6v5Demo4.vue"),
        },
        {
          id: "testMenu",
          title: "测试菜单",
          component: () => import("./tDemos/testMenu/index.vue"),
        },
        {
          id: "groupView",
          title: "groupView",
          component: () => import("./tDemos/groupView/index.vue"),
        },
        {
          id: "toolBar",
          title: "toolBar",
          component: () => import("./tDemos/g6V5/toolBar/index.vue"),
        },
        {
          id: "g6V5Base",
          title: "g6V5Base",
          component: () => import("./tDemos/g6V5/base/index.vue"),
        },
        {
          id: "test",
          title: "test",
          component: () => import("./tDemos/test/index.vue"),
        },
        {
          id: "groupOverview",
          title: "groupOverview",
          component: () => import("./tDemos/groupOverview/index.vue"),
        },
        {
          id: "comboRelatedLayout",
          title: "comboRelatedLayout",
          component: () => import("./tDemos/comboRelatedLayout/index.vue"),
        },
        {
          id: "comboCombined",
          title: "comboCombined",
          component: () => import("./tDemos/combo/comboCombined/index.vue"),
        },
        {
          id: "comboOverview",
          title: "comboOverview",
          component: () => import("./tDemos/combo/comboOverview/index.vue"),
        },
        {
          id: "comboRelatedLayout",
          title: "comboRelatedLayout",
          component: () => import("./tDemos/comboRelatedLayout/index.vue"),
        },
        {
          id: "relationGraph",
          title: "relationGraph",
          component: () => import("./tDemos/relationGraph/index.vue"),
        },
        {
          id: "graphDetail",
          title: "graphDetail",
          component: () =>
            import("./tDemos/relationGraph/graphDetail/index.vue"),
        },
        {
          id: "nodeDetailsFloatBox",
          title: "nodeDetailsFloatBox",
          component: () =>
            import("./tDemos/relationGraph/nodeDetailsFloatBox/index.vue"),
        },
        // {
        //   id: "5_1",
        //   title: "g6V4",
        //   component: () => import("./tDemos/groupView/index.vue"),
        //   children: [
        //     {
        //       id: "5_1_1",
        //       title: "测试g6V4",
        //       component: () => import("./tDemos/g6View/index.vue"),
        //     },
        //   ],
        // },
      ],
    };
  },
  computed: {
    curComponents() {
      const findCom = [...this.ddemoList, ...this.tDemoList].find(
        (el) => el.id === this.activeName
      )?.component;
      if (findCom) {
        return findCom;
      }
    },
  },
  methods: {
    handleSelect(val) {
      this.activeName = val;
    },
    handleOpen() {},
    handleClose() {},
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.demoCon {
}
</style>
