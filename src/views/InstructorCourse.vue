<template>
  <v-layout row>
    <v-flex>
      <v-col>
	<v-card>
	  <v-card-title>{{courses[id].name}}</v-card-title>
	</v-card>
      </v-col>
      <v-col>
	<v-card>
	  <v-card-title>Course Information</v-card-title>
	  <v-card-text>Created at {{ course.createdAt }}</v-card-text>
	</v-card>
      </v-col>
      <v-col>
	<v-card>
	  <v-card-title>Enrollment</v-card-title>
	  <v-card-text>
	    <v-checkbox
	      v-model="enrollable"
	      label="Available for public enrollment?"
	      >
	    </v-checkbox>
	    <template v-if="enrollable">
	      <p>Learners can enroll in your course with the following code</p>
	      <code>{{ enrollmentCode }}</code>
	    </template>
	  </v-card-text>
	</v-card>
      </v-col>
      <v-col>
	<v-card>
	  <v-card-title>Assignments</v-card-title>

	  <helper-sortable-list :useDragHandle="true" id="assignment-list" :appendTo="'#assignment-list'" class="transparent" lockAxis="y" v-model="assignments">
	    <helper-sortable-list-item
              v-for="(assignment,index) in assignments"
              :key="index"
	      :index="index"
	      @chosen="$router.push({ name: 'InstructorCourseAssignment', params: { id: course.id, assignmentIndex: index } });"
	      >
	      <v-list-item-content>
		<v-list-item-title>{{ assignment.name }}</v-list-item-title>
		<v-list-item-subtitle>
		  <a :href="assignment.url">{{ assignment.url }}</a>
		</v-list-item-subtitle>
	      </v-list-item-content>
	    </helper-sortable-list-item>
	  </helper-sortable-list>

	  <v-card-actions>
	    <v-dialog v-model="modelNewAssignment" persistent max-width="600px" @keydown.esc="modelNewAssignment = false">
	      <template v-slot:activator="{ on }">
		<v-btn text v-on="on">Add Assignment</v-btn>
	      </template>
	      <v-card>
		<v-card-title>
		  <span class="headline">New Assignment</span>
		</v-card-title>
		<v-card-text>
		  <v-container>
		    <v-row>
		      <v-col cols="12">
			<v-text-field label="Assignment Name" required v-model="newAssignmentName"></v-text-field>
		      </v-col>
		      <v-col cols="12">
			<v-text-field label="URL" required v-model="newAssignmentURL"></v-text-field>
		      </v-col>
		    </v-row>
		  </v-container>
		</v-card-text>
		<v-card-actions>
		  <v-spacer></v-spacer>
		  <v-btn text @click="modelNewAssignment = false">Close</v-btn>
		  <v-btn text @click="modelNewAssignment = false; saveNewAssignment();">Save</v-btn>
		</v-card-actions>
	      </v-card>
	    </v-dialog>
	  </v-card-actions>
	</v-card>
      </v-col>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import bubble from 'bubble_babble';

export default {
  props: ['id'],

  computed: {
    ...mapState([
      'courses',
    ]),
    course: {
      get() { return this.courses[this.id]; },
    },
    assignments: {
      get() { return this.courses[this.id].assignments; },
      set(v) { return this.updateCourse({ id: this.id, data: { assignments: v } }); },
    },

    enrollable: {
      get() { return this.courses[this.id].enrollable; },
      set(v) { return this.updateCourse({ id: this.id, data: { enrollable: v } }); },
    },
    enrollmentCode: {
      get() { return bubble.encode(Buffer.from(this.id, 'hex')); },
    },
  },

  data() {
    return {
      modelNewAssignment: false,
      newAssignmentName: '',
      newAssignmentURL: '',
    };
  },

  methods: {
    ...mapActions([
      'getCourse',
      'updateCourse',
      'addAssignmentToCourse',
    ]),
    saveNewAssignment() {
      this.addAssignmentToCourse({
        id: this.id,
        assignment: {
          name: this.newAssignmentName,
          url: this.newAssignmentURL,
        },
      });
    },
  },

  mounted() {
    return this.getCourse(this.id);
  },
};
</script>
