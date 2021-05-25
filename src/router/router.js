import Vue from 'vue'
import Router from 'vue-router'
import coinDeposit from '../components/coin-deposit'
import vReceipt from '../components/v-receipt'
import NotFound from '../components/404'
Vue.use(Router);
let router = new Router({

    routes:[
        {
            path: '/',
            name: 'main',
            component: coinDeposit
        },
        {
            path: '/receipt',
            name: 'receipt',
            component: vReceipt,
            props:true
        },
        {
            path: '*',
            name: 'notfound',
            component: NotFound,
        }
    ]
})
export default router;