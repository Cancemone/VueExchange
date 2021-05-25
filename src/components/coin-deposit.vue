<template>
  <div class="coin-deposit">
  <template v-if="isLoaded">

    <template v-if="isLoadFailed">
      Errormsg
    </template>

    <template v-else>
      <template v-if="CURRENCIES">
        <div class="exchange">
          <template v-if="isChanged">
            <div class="given">
              <span>Отдаете:</span>
              <br>
              <select v-model="selectGiven" @change="onChangeInput(givenAmount,isChanged)">
                <option v-for="currency in changeTaken" :key="currency">
                  {{currency}}
                </option>
              </select>
              <input type="text" v-model="givenAmount" @change="onChangeInput(givenAmount,isChanged)">
            </div>
            <input type="button" class="replaceBtn" @click="Replace">
            <div class="given">
              <span>Получаете:</span>
              <br>
              <select v-model="selectTaken" @change="onChangeInput(givenAmount,isChanged)">
                <option v-for="currency in CURRENCIES" :key="currency.currency">
                  {{currency.currency}}
                </option>
              </select>
              <input type="text" v-model="takenAmount" @change="onChangeInput(takenAmount,isChanged)">
            </div>
          </template>


          <template v-else>
            <div class="given">
              <span>Отдаете:</span>
              <br>
              <select v-model="selectGiven" @change="onChangeInput(givenAmount, isChanged)">
                <option v-for="currency in CURRENCIES" :key="currency.currency">
                  {{currency.currency}}
                </option>
              </select>
              <input type="text" v-model="givenAmount" @change="onChangeInput(givenAmount,isChanged)" required>
            </div>
            <input type="button"   class="replaceBtn" @click="Replace">
            <div class="given">
              <span>Получаете:</span>
              <br>
              <select v-model="selectTaken" @change="onChangeInput(givenAmount,isChanged)">
                <option v-for="currency in changeTaken" :key="currency">
                  {{currency}}
                </option>
              </select>
              <input type="text" v-model="takenAmount" @change="onChangeInput(takenAmount,isChanged)">
            </div>
          </template>
          <div class="info">
            <p>Вы отдаете {{givenAmount}}{{selectGiven}} и получаете {{takenAmount}}{{selectTaken}}</p>
            <p>Текущий курс: {{activeCurrency}}</p>
          </div>
          <input
              class="changeButton"
              type="button"
              @click="$router.push({name:'receipt', params:{
                givenAmount:  givenAmount,
                takenAmount: takenAmount,
                given: selectGiven,
                taken: selectTaken
                }
              })"
              :value="buttonText"
              :disabled="isDisabled"
          >
        </div>
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
  name: "coin-base",
  data() {
    return{
      selectGiven: "",
      selectTaken: "",
      isLoaded: false,
      isChanged: false,
      isLoadFailed: false,
      givenAmount: 0,
      takenAmount: 0,
      changeTaken: ["usd","uah","btc","rub", "eur"]
    }
  },
  computed:{
    ...mapGetters([
      'CURRENCIES',
    ]),
    buttonText(){
      if(this.isDisabled){
        return "Enter Sum"
      }
      else{
        return "CHANGE"
      }
    },
    activeCurrency(){
      if(this.isChanged){
        let tmpObject = this.CURRENCIES.find(t => t.currency === this.selectTaken);
        return 1/tmpObject[this.selectGiven];
      }
      else{
        let tmpObject = this.CURRENCIES.find(t => t.currency === this.selectGiven);
        return tmpObject[this.selectTaken];
      }
    },
    isDisabled(){
      if(this.givenAmount>0){
        return false;
      }
      else{
        return true;
      }
    }
  },
  methods:{
    ...mapActions([
      'GET_CURRENCY_FROM_API',
    ]),
    onChangeInput(tempAmount, statusChanged){
      if(tempAmount == this.givenAmount && statusChanged == false){
        this.takenAmount=this.activeCurrency*this.givenAmount;
      }
      if(tempAmount == this.givenAmount && statusChanged == true){

        this.takenAmount=(this.activeCurrency*this.givenAmount);
      }
      else{
        this.givenAmount = (this.takenAmount/this.activeCurrency);
      }
    },

    Replace: function (){
      this.isChanged=!this.isChanged;
      let tmp=this.selectTaken;
      this.selectTaken=this.selectGiven;
      this.selectGiven=tmp;
      this.onChangeInput(this.givenAmount, this.isChanged);
    },
  },
  watch: { },
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
.exchange{
  max-width:900px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
}
.replaceBtn{
  margin: 15px;
  background-image:url('../assets/switch-swap.png');
  border:none;
  background-color:darkslategrey;
  background-repeat: no-repeat;
  background-size: contain;
  width: 50px;
  height: 50px;
}
.replaceBtn:hover{
  background-image:url('../assets/switch-swap-hover.png');
  cursor: pointer;
  border:none;
  background-repeat: no-repeat;
  background-size: contain;
  width: 50px;
  height: 50px;
}
.given select{
  margin: 10px;
  font-size: 20px;
  border-radius: 5px;
  border: none;
}
.given input{
  margin: 10px;
  font-size: 18px;
  line-height: 25px;
  border-radius: 5px;
  border: none;
  box-shadow: 0 0 10px rgb(0 255 153);
}
.changeButton{
  font-size:22px;
  padding: 10px;
  width: 200px;
  margin: 0 auto;
  border: 2px solid #1fd072;
  background: #253838;
  color: white;
}
.changeButton:disabled{
  font-size:22px;
  padding: 10px;
  width: 200px;
  border: 2px solid #616161!important;
  background: #3e4747 !important;
  color: #262626!important;
}
.changeButton:hover{
  cursor: pointer;
  font-size:22px;
  padding: 10px;
  width: 200px;
  border: 2px solid #1fd072;
  background: #486a6a;
  color: white;
}
.info{
  text-align: center;
  margin: 0 auto;
  margin-top: 20px;
}
</style>