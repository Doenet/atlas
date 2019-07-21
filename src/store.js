import Vue from 'vue';
import Vuex from 'vuex';
import userService from './services/user';
import { version } from '../package.json';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    version: '',
    status : {},
    token: '',
    user : {},
  },

  mutations: {
    initializeStore(state) {
      // Check if the store exists
      if (localStorage.getItem('store')) {
        let store = JSON.parse(localStorage.getItem('store'));

        // Check the version stored against current. If different, don't
        // load the cached version
        if (store.version == version) {
          this.replaceState( Object.assign(state, store) );
        } else {
          state.version = version;
        }
      }
    },
    
    loginSuccess(state, token) {
      state.status = { loggedIn: true };
      state.token = token;
    },

    setUser(state, user) {
      console.log(user);
      state.user = user;
    },
    
    loginFailure(state, error) {
      state.status = { };
      state.token = null;
      state.user = null;
    },

  },
  
  actions: {
    login({ dispatch, commit }, { email, password }) {
      userService.login(email, password)
        .then(
          (response) => {
            if (response.status === 200) {
              console.log("Logged in as", email);
              commit( 'loginSuccess', response.data.token );

              userService.getUser('me').then(
                (response) => {
                  if (response.status === 200) {
                    commit( 'setUser', response.data );
                  }
                }
              );
            } else {
              commit('loginFailure', response.status );
            }
          },
          error => {
            commit('loginFailure', error);
            dispatch('alert/error', error, { root: true });
          }
        );
    },
    
    logout({ commit }) {
        userService.logout();
        commit('logout');
    },
    
    signup({ dispatch, commit }, user) {
        commit('registerRequest', user);
    
        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
                    router.push('/login');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', { root: true });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    }
  },
});

export default store;

// Subscribe to store updates
store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  localStorage.setItem('store', JSON.stringify(state));
});
