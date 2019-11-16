<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
        md12
	>
	<v-list>
          <v-list-item v-for="course in learnerCourses" :to="{ name: 'Grades', params: { id: course.id }}" :key="course.id">
	    <v-list-item-content>
              <v-list-item-title v-text="course.name"></v-list-item-title>
	    </v-list-item-content>
          </v-list-item>
	</v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'learnerCourses',
    ]),
  },

  data() {
    return {
    };
  },

  methods: {
    ...mapActions([
      'getLearnerCourses',
    ]),
    submit() {
    },
  },
  
  mounted() {
    return this.getLearnerCourses();
  }
}
</script>
