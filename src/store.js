import Vue from 'vue';
import Vuex from 'vuex';
import userService from './services/user';
import courseService from './services/course';
import { version } from '../package.json';
import router from '@/router';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    version: '',
    status: {},
    token: localStorage.getItem('token') || null,
    profile: {},
    instructorCourseIds: [],
    learnerCourseIds: [],
    courses: {},
    drawer: true,
    color: 'success',
    snackbar: { snack: '' },
  },

  mutations: {
    setDrawer(state, drawer) {
      state.drawer = drawer;
    },

    toggleDrawer(state) {
      state.drawer = !(state.drawer);
    },

    initializeStore(state) {
      // Check if the store exists
      if (localStorage.getItem('store')) {
        const localStore = JSON.parse(localStorage.getItem('store'));

        // Check the version stored against current. If different, don't
        // load the cached version
        if (localStore.version === version) {
          this.replaceState(Object.assign(state, localStore));
        } else {
          state.version = version;
        }
      }
    },

    loginSuccess(state, token) {
      state.status = { loggedIn: true };
      localStorage.setItem('token', token);
      state.token = token;
    },

    logout(state) {
      state.status = { loggedIn: false };
      localStorage.removeItem('token');
      state.token = undefined;
    },

    setProfile(state, user) {
      state.profile = user;
    },

    addCourse(state, course) {
      console.log(course);
      Vue.set(state.courses, course.id, course);
    },

    setInstructorCourseIds(state, courseIds) {
      state.instructorCourseIds = courseIds;
    },

    setLearnerCourseIds(state, courseIds) {
      console.log('courseIds=', courseIds);
      state.learnerCourseIds = courseIds;
    },

    loginFailure(state, error) { // eslint-disable-line no-unused-vars
      state.status = { };
      state.token = null;
      state.user = null;
    },

    setSnack(state, snack) {
      state.snackbar.snack = snack;
    },
  },

  actions: {
    alertError({ dispatch, commit }, error) { // eslint-disable-line no-unused-vars
      commit('setSnack', error);
    },

    getCourse({ dispatch, commit }, id) {
      courseService.getCourse(id).then(
        (response) => {
          if (response.status === 200) {
            commit('addCourse', response.data);
          }
        },
        (error) => {
          dispatch('alertError', error, { root: true });
        },
      );
    },

    getLearnerCourses({ dispatch, commit }) {
      userService.getLearnerCourseIds().then(
        (response) => {
          if (response.status === 200) {
            commit('setLearnerCourseIds', response.data);

            for (const id of response.data) {
              dispatch('getCourse', id);
            }
          }
        },
        (error) => {
          dispatch('alertError', error, { root: true });
        },
      );
    },

    getInstructorCourses({ dispatch, commit }) {
      userService.getInstructorCourseIds().then(
        (response) => {
          if (response.status === 200) {
            commit('setInstructorCourseIds', response.data);

            for (const id of response.data) {
              dispatch('getCourse', id);
            }
          }
        },
        (error) => {
          dispatch('alertError', error, { root: true });
        },
      );
    },

    getProfile({ dispatch, commit }) {
      userService.getUser('me').then(
        (response) => {
          if (response.status === 200) {
            commit('setProfile', response.data);
          }
        },
        (error) => {
          dispatch('alertError', error, { root: true });
        },
      );
    },

    updateCourse({ dispatch, commit }, { id, data }) {
      courseService.patchCourse(id, data).then(
        (response) => {
          if (response.status === 200) {
            commit('addCourse', response.data);
          }
        },
        (error) => {
          dispatch('alertError', error, { root: true });
        },
      );
    },

    updateAssignment({ dispatch, commit }, { id, assignmentIndex, data }) {
      const courseData = { assignments: [] };
      for (const assignment in store.state.courses[id].assignments) {
        courseData.assignments.push(Object.assign({}, assignment));
      }
      Object.assign(courseData.assignments[assignmentIndex], data);

      courseService.patchCourse(id, courseData).then(
        (response) => {
          if (response.status === 200) {
            commit('addCourse', response.data);
          }
        },
        (error) => {
          dispatch('alertError', error, { root: true });
        },
      );
    },

    addAssignmentToCourse({ dispatch, commit }, { id, assignment }) {
      courseService.patchCourse(id, { assignments: store.state.courses[id].assignments.concat([assignment]) }).then(
        (response) => {
          if (response.status === 200) {
            commit('addCourse', response.data);
          }
        },
        (error) => {
          dispatch('alertError', error, { root: true });
        },
      );
    },


    updateProfile({ dispatch, commit }, data) {
      userService.patchUser('me', data).then(
        (response) => {
          if (response.status === 200) {
            commit('setProfile', response.data);
          }
        },
        (error) => {
          dispatch('alertError', error, { root: true });
        },
      );
    },

    login({ dispatch, commit }, { email, password }) {
      userService.login(email, password)
        .then(
          (response) => {
            if (response.status === 200) {
              console.log('Logged in as', email);
              commit('loginSuccess', response.data.token);
              router.push('/');
            } else {
              commit('loginFailure', response.status);
            }
          },
          (error) => {
            commit('loginFailure', error);
            dispatch('alertError', error, { root: true });
          },
        );
    },

    logout({ commit }) {
      commit('logout');
    },

    createCourse({ dispatch, commit }, name) {
      courseService.createCourse(name).then(
        (response) => {
          if (response.status === 200) {
            commit('addCourse', response.data);
            dispatch('getIntructorCourses');
          }
        },
        (error) => {
          dispatch('alertError', error, { root: true });
        },
      );
    },

    signup({ dispatch, commit }, userData) {
      commit('registerRequest', userData);

      userService.register(userData)
        .then(
          (user) => {
            commit('registerSuccess', user);
            router.push('/login');
            setTimeout(() => {
              // display success message after route change completes
              dispatch('alert/success', 'Registration successful', { root: true });
            });
          },
          (error) => {
            commit('registerFailure', error);
            dispatch('alertError', error, { root: true });
          },
        );
    },
  },

  getters: {
    instructorCourses: state => state.instructorCourseIds.map(id => (state.courses[id] ? state.courses[id] : { name: id, id })),
    learnerCourses: state => state.learnerCourseIds.map(id => (state.courses[id] ? state.courses[id] : { name: id, id })),
  },

});

export default store;

// Subscribe to store updates
store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  localStorage.setItem('store', JSON.stringify(state));
});
