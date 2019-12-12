<template>
  <v-layout row>
    <h1>User</h1>
    {{ user }}
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  props: ['id'],

  computed: {
    ...mapState([
      'users',
    ]),
    user: {
      get() { return this.users[this.id]; },
    },
  },

  data() {
    return {
    };
  },

  methods: {
    ...mapActions([
      'getUser',
    ]),
  },

  mounted() {
    return this.getUser(this.id);
  },
};
</script>
