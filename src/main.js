import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
import '@/styles/index.scss';

import Vuetify from 'vuetify';
Vue.use(Vuetify, {
  iconfont: 'mdi',
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify: new Vuetify({}),
  render: h => h(App),
  beforeCreate() {
    this.$store.commit('initializeStore');
  }
}).$mount('#app');

import './components';
