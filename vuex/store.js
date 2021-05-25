import Vue from 'vue'
import Vuex from 'vuex'
import axios from'axios'
Vue.use(Vuex);
let store=new Vuex.Store({
    //состояние
    state:{
        currencies: [],
        reserv: {

        }
    },
    //мутации
    mutations:{

        SET_CURRENCIES_TO_STATE:(state, currencies) =>{
            state.currencies=currencies;
        },

    },

    //действия
    actions:{
        GET_CURRENCY_FROM_API({commit}){
            //вызываем аксиос запрос
            return axios('https://api.kuna.io/v3/exchange-rates',{
                method: "GET"
            })
                .then((currencies)=>  {
                    console.log(currencies.data);
                    commit ('SET_CURRENCIES_TO_STATE',currencies.data);
                    return currencies;
                })
                .catch((error)=>{
                    console.log(error);
                    return error;
                })
        },

    },
    //геттеры
    getters:{
        CURRENCIES(state){
            return state.currencies;
        }
    }
});
export default store;