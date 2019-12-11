import axios from 'axios';
// import store from '../store';

axios.defaults.baseURL = process.env.VUE_APP_API_URL || '';
axios.defaults.withCredentials = true;

export default {
  async getCourse(id) {
    return axios.get(`/courses/${id}`);
  },

  async createCourse(name) {
    return axios.post('/courses', { name });
  },

  async patchCourse(id, data) {
    return axios.patch(`/courses/${id}`, data);
  },

};
