<template>
  <div id="app">
    <router-view :menuList="menuList" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuList: [
        {
          id: 8645,
          name: "首页",
          code: "IMAS_Index",
          type: "MENU",
          url: "index",
          parentId: 20850,
          permission: "IMAS_Index",
          order: 1,
          icon: null,
          target: "_self",
          visible: true,
          appId: 20001,
          tenantId: 0,
          children: null,
        },
        {
          id: 961544,
          name: "工作台333",
          code: "IMAS_My_Work",
          type: "ACTION",
          url: "",
          parentId: 20850,
          permission: "My_Work",
          order: 2,
          icon: null,
          target: "_self",
          visible: true,
          appId: 20850,
          tenantId: 0,
          children: [
            {
              id: 961545,
              name: "**管理",
              code: "IMAS_ReportManager",
              type: "MENU",
              url: "",
              parentId: 961544,
              permission: "IMAS_ReportManager",
              order: 1,
              icon: null,
              target: "_self",
              visible: true,
              appId: 20850,
              tenantId: 0,
              children: [
                {
                  id: 961546,
                  name: "**清单",
                  code: "IMAS_testReport",
                  type: "MENU",
                  url: "testReport",
                  parentId: 961545,
                  permission: "IMAS_testReport",
                  order: 1,
                  icon: null,
                  target: "_self",
                  visible: true,
                  appId: 20850,
                  tenantId: 0,
                  children: null,
                },
              ],
            },
          ],
        },
      ],
    };
  },
  provide() {
    return {
      menuList: this.menuList, 
    };
  },
};
</script>
<style lang="scss">
#app {
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
