<template>
  <v-layout row>
    <h1>{{course.name}}</h1>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  props: ['id'],

  computed: {
    ...mapState([
      'courses',
    ]),
    course: {
      get() { return this.courses[this.id]; },
    },
  },

  data() {
    return {
    };
  },

  methods: {
    ...mapActions([
      'getCourse',
    ]),
  },

  mounted() {
    return this.getCourse(this.id);
  },
};
</script>
