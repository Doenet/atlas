import axios from 'axios';
import store from '../store';
  
axios.defaults.baseURL = process.env.VUE_APP_API_URL || '';

function authorization() {
  return { Authorization: 'Bearer ' + store.state.token };
}

export default {
  async login(email, password) {
    console.log(email, password);
    return axios.get(`/users/${email}/token`, {
      auth: {
        username: email,
        password: password,
      },
    });
  },

  async getUser(id) {
    return axios.get(`/users/${id}`, { headers: authorization() } );
  },

  async getLearnerCourseIds() {
    return axios.get(`/learners/me/courses`, { headers: authorization() } );
  },

  async getInstructorCourseIds() {
    return axios.get(`/instructors/me/courses`, { headers: authorization() } );
  },
  
};
