<template>
  <v-layout row>
    <h1>{{assignment.name}}</h1>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  props: ['id', 'assignmentIndex'],

  computed: {
    ...mapState([
      'courses',
    ]),
    course: {
      get() { return this.courses[this.id]; },
    },
    assignment: {
      get() { return this.courses[this.id].assignments[this.assignmentIndex]; },
    },
  },

  data() {
    return {
    };
  },

  methods: {
    ...mapActions([
      'getCourse',
      'updateCourse',
    ]),
  },

  mounted() {
    return this.getCourse(this.id);
  },
};
</script>
