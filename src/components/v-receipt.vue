<template>
<div class="v-receipt">
  <template v-if="givenAmount!=0">
    <img src="../assets/galochka.png" alt="">
    <h1>Вы успешно обменяли {{givenAmount}}{{given}} на {{takenAmount}}{{taken}}</h1>
    <router-link :to="{name: 'main'}">
      <div class="v-main_link">Обменять еще!</div>
    </router-link>
  </template>
  <template v-else>
    Load...
  </template>
</div>
</template>

<script>
export default {
  name: "v-receipt",
//не персональные данные компонента
props:{
  givenAmount:{type: Number, default(){return 0}},
  takenAmount:{type: Number, default(){return 0}},
  given:{type: String, default(){return ""}},
  taken:{type: String, default(){return ""}},
}
}
</script>

<style scoped>
.v-receipt {
display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 600px;
}
.v-main_link{
  color: white;
  text-decoration: none;
  font-size: 18px;
  border: 2px solid #1fd072;
  padding: 15px;
}
.v-main_link:hover{
  color: white;
  background-color: #486a6a;
  text-decoration: none;
  font-size: 18px;
  border: 2px solid #1fd072;
  padding: 15px;
}
img{
max-width: 150px;
margin: 20px;
}
</style>