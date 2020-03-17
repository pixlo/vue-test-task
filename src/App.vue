<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'Calc' }" class="link">Calc</router-link>
      <router-link :to="{ name: 'Comments' }" class="link"
        >Comments</router-link
      >
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
*,
*::after,
*::before {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.link {
      margin-right: 20px;
    }

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
