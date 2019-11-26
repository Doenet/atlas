import vueMoment from 'vue-moment';
import Vuetify from 'vuetify';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
import '@/styles/index.scss';


import './components';

Vue.use(Vuetify, {
  iconfont: 'mdi',
});
Vue.use(vueMoment);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify: new Vuetify({}),
  render: h => h(App),
  beforeCreate() {
    this.$store.commit('initializeStore');
  },
}).$mount('#app');
