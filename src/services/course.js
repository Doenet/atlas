import axios from 'axios';
import store from '../store';

axios.defaults.baseURL = process.env.VUE_APP_API_URL || '';

function authorization() {
  return { Authorization: `Bearer ${store.state.token}` };
}

export default {
  async getCourse(id) {
    return axios.get(`/courses/${id}`, { headers: authorization() });
  },

  async createCourse(name) {
    return axios.post('/courses', { name }, { headers: authorization() });
  },

  async patchCourse(id, data) {
    return axios.patch(`/courses/${id}`, data, { headers: authorization() });
  },

};
