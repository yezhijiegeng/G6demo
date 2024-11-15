<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">共同投资demo</router-link> |
      <router-link to="/demo2">搜索demo</router-link>
    </nav> -->
    <router-view />
  </div>
</template>

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
