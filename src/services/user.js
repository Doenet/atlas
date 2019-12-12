import axios from 'axios';
// import store from '../store';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL || '';

export default {
  async login(email, password) {
    return axios.get(`/users/${email}/authorize`, {
      auth: {
        username: email,
        password,
      },
    });
  },

  async getUser(id) {
    return axios.get(`/users/${id}`);
  },

  async patchUser(id, data) {
    return axios.patch(`/users/${id}`, data);
  },

  async getLearnerCourseIds() {
    return axios.get('/learners/me/courses');
  },

  async getRecentProgress(id) {
    return axios.get(`/learners/${id}/progress`);
  },

  async getLearnerStatements() {
    return axios.get('/learners/me/statements');
  },

  async getInstructorCourseIds() {
    return axios.get('/instructors/me/courses');
  },

};
