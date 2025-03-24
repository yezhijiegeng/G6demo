import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("../views/home.vue"),
    children: [
      {
        path: "/page/index",
        name: "index",
        component: () => import("../views/tDemos/demo/Test菱形节点.vue"),
      },
      {
        path: "/page/index",
        name: "index",
      },
      {
        path: "tDemos",
        name: "tDemos",
        component: () => import("../views/tDemos/index.vue"),
        children: [
          {
            path: "g6View",
            name: "g6View",
            component: () => import("../views/tDemos/g6View/index.vue"),
            children: [
              {
                path: "g6V4",
                name: "g6V4",
                component: () => import("../views/tDemos/g6View/g6V4/index.vue"),
              },
            ],
          },
        ],
      },
    ],
  },
  // {
  //   path: '/',
  //   name: 'demoCon',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/home.vue')
  // },
  // {
  //   path: '/demo2',
  //   name: 'demo2',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/demo2.vue')
  // },
  // {
  //   path: '/demo1',
  //   name: 'demo1',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/demo1.vue')
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
