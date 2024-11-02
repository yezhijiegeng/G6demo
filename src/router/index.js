import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "demoCon",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/demoCon.vue"),
  },
  // {
  //   path: "/demo2",
  //   name: "demo2",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/demo2.vue"),
  // },
  // {
  //   path: "/demo3",
  //   name: "demo3",
  //   component: () => import("../views/demo3_1.vue"),
  // },
  {
    path: "/antvG6",
    name: "antvG6",
    component: () => import("../views/antvG6/index.vue"),
    children: [
      {
        path: "groupView",
        name: "groupView",
        component: () => import("../views/antvG6/groupView/index.vue"),
      },
      {
        path: "test",
        name: "test",
        component: () => import("../views/antvG6/test/index.vue"),
      },
      {
        path: "groupOverview",
        name: "groupOverview",
        component: () =>
          import("../views/antvG6/groupOverview/index.vue"),
      },
      {
        path: "comboRelatedLayout",
        name: "comboRelatedLayout",
        component: () =>
          import("../views/antvG6/comboRelatedLayout/index.vue"),
      },
      {
        path: "combo",
        name: "combo",
        component: () => import("../views/antvG6/combo/index.vue"),
        children: [
          {
            path: "comboCombined",
            name: "comboCombined",
            component: () =>
              import("../views/antvG6/combo/comboCombined/index.vue"),
          },
          {
            path: "comboOverview",
            name: "comboOverview",
            component: () =>
              import("../views/antvG6/combo/comboOverview/index.vue"),
          },
          {
            path: "comboRelatedLayout",
            name: "comboRelatedLayout",
            component: () => import("../views/antvG6/comboRelatedLayout/index.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/relationGraph",
    name: "relationGraph",
    component: () => import("../views/relationGraph/index.vue"),
    children: [
      {
        path: "graphDetail",
        name: "graphDetail",
        component: () => import("../views/relationGraph/graphDetail/index.vue"),
      },
      {
        path: "nodeDetailsFloatBox",
        name: "nodeDetailsFloatBox",
        meta: {
          title: "节点详情悬浮框",
        },
        component: () =>
          import("../views/relationGraph/nodeDetailsFloatBox/index.vue"),
      },
    ],
  },

  // {
  //   path: '/demo1',
  //   name: 'demo1',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/demo1.vue')
  // },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
