<template>
<div class="main-wrapper">
<div class="navbar">

  <h1><img src="../assets/logo.png" alt="logo">ueExchange</h1>
</div>
  <transition>
  <router-view></router-view>
  </transition>
</div>
</template>

<script>
export default {
  name: "main-wrapper",
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style scoped>
.main-wrapper{
  width: 100%;
  height: 100%;
  top: 0;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  left: 0;
  background-color:darkslategrey;
}
.navbar{
  text-align: center;
  width: 100%;
  height: 70px;
  background-color:#1fd072;
}
.navbar img{
  margin: 0 auto;
  height: 40px;
}
</style>