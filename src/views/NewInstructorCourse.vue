<template>
  <v-form @submit.prevent="submit">
    <v-text-field
      v-model="name"
      label="Course Name"
      required
    ></v-text-field>

    <v-btn type="submit"
      color="primary"
      class="mr-4"
    >
      Create course
    </v-btn>

    <v-btn
      color="error"
      @click="$router.go(-1)"
    >
      Cancel
    </v-btn>

  </v-form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      name: '',
    };
  },

  methods: {
    ...mapActions([
      'createCourse',
    ]),

    submit() {
      return this.createCourse(this.name);
    },
  },
};
</script>
