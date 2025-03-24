<template>
  <div>
    <common-menus :menuList="menuList" :user="user" />
  </div>
</template>
<script>
import CommonMenus from "@tencent/common-menus";

export default {
  props: {
    // menuList:Array
  },
  data() {
    return {
      user: {
        Id: 51998,
        Name: "yesongwei",
        menuCode: "",
        Roles: [
          {
            id: 781624,
            code: "SuperAdmin",
            name: "超级管理员",
            description: "",
            category: null,
            sortOrder: 1,
            type: "admin",
          },
          {
            id: 784582,
            code: "IMAS_TMAF",
            name: "TMAF小程序权限",
            description: "",
            category: null,	
            sortOrder: 15,
            type: "admin",
          },
        ],
      },
    };
  },
  components: {
    CommonMenus,
  },
  inject: ["menuList"],
	mounted(){
		debugger
	},
};
</script>
