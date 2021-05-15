<template>
<div class="main-wrapper">
  <template v-if="isLoaded">
    <template v-if="isLoadFailed">
      Errormsg
    </template>

    <template v-else>
      <template v-if="CURRENCIES">
        <span>Отдаете:</span>
        <br>
        <template v-if="!isChanged">
          <select v-model="selectGiven" @change="onChange(givenAmount, isChanged)">
            <option v-for="currency in CURRENCIES" :key="currency.currency">
              {{currency.currency}}
            </option>
          </select>
          <input type="text" v-model="givenAmount" @change="onChange(givenAmount,isChanged)">
          <br>
          <input type="button" @click="changePlaces" value="Change">
          <br>
          <span>Получаете:</span>
          <br>
          <select v-model="selectTaken" @change="onChange(givenAmount,isChanged)">
            <option v-for="currency in changeTaken" :key="currency">
              {{currency}}
            </option>
          </select>
          <input type="text" v-model="takenAmount" @change="onChange(takenAmount,isChanged)">
          <br>
          <p>Вы отдаете {{givenAmount}}{{selectGiven}} и получаете {{takenAmount}}{{selectTaken}}</p>
        </template>


<template v-else>
  <select v-model="selectGiven" @change="onChange(givenAmount,isChanged)">
    <option v-for="currency in changeTaken" :key="currency">
      {{currency}}
    </option>
  </select>
  <input type="text" v-model="givenAmount" @change="onChange(givenAmount,isChanged)">
  <br>
  <input type="button" @click="changePlaces" value="Change">
  <br>
  <span>Получаете:</span>
  <br>
  <select v-model="selectTaken" @change="onChange(givenAmount,isChanged)">
    <option v-for="currency in CURRENCIES" :key="currency.currency">
      {{currency.currency}}
    </option>
  </select>
  <input type="text" v-model="takenAmount" @change="onChange(takenAmount,isChanged)">
  <br>
  <p>Вы отдаете {{givenAmount}}{{selectGiven}} и получаете {{takenAmount}}{{selectTaken}}</p>
</template>



      </template>

      <template v-else>
        No data
      </template>
    </template>
  </template>

  <template v-else>
    Loader...
  </template>

</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: "main-wrapper",
  data() {
    return{
      selectGiven: "",
      selectTaken: "",
      isLoaded: false,
      isChanged: false,
      isLoadFailed: false,
      givenAmount: 0,
      takenAmount: 0,
      changeTaken: ["usd","uah","btc","rub","eur"]
    }
  },
  computed:{
    ...mapGetters([
      'CURRENCIES',
    ]),
  },
  methods:{
    ...mapActions([
      'GET_CURRENCY_FROM_API',
    ]),
    onChange(tempAmount, statusChanged){
      if(tempAmount == this.givenAmount && statusChanged == false){
        let tmpObject = this.CURRENCIES.find(currency => currency.currency === this.selectGiven);
        this.takenAmount=(tmpObject[this.selectTaken]*this.givenAmount);
      }
      if(tempAmount == this.givenAmount && statusChanged == true){
        let tmpObject = this.CURRENCIES.find(currency => currency.currency === this.selectTaken);
        let newCurrency = 1/tmpObject[this.selectGiven];
        this.takenAmount=(newCurrency*this.givenAmount);
      }
      else{
        let tmpObject = this.CURRENCIES.find(currency => currency.currency === this.selectGiven);
        this.givenAmount = (this.takenAmount/tmpObject[this.selectTaken]);
      }
    },

    changePlaces: function (){
    this.isChanged=!this.isChanged;
    let tmp=this.selectTaken;
    this.selectTaken=this.selectGiven;
    this.selectGiven=tmp;
    this.onChange(this.givenAmount, this.isChanged);
    }
  },
     watch: {
      // givenAmount: function () {
      //   this.onChangeGiven()
      // },
      // takenAmount: function () {
      //   this.onChangeTaken()
      // },
      //  selectGiven: function(){
      //    this.onChangeGiven()
      //  },
      //  selectTaken: function(){
      //    this.onChangeGiven()
      //  }
     },
created(){
    this.GET_CURRENCY_FROM_API()
        .then ((response) =>{
          if(response.data){
            console.log('Data arrived')
            this.isLoaded = true;
          }
         this.selectGiven=this.CURRENCIES[0].currency;
          this.selectTaken=this.changeTaken[0];
        })
  }
}
</script>

<style scoped>

</style>