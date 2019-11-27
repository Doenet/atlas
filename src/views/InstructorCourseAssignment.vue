<template>
  <v-layout row>
    <v-flex>
      <v-col>
	<v-card>
	  <v-card-title>Edit Assignment</v-card-title>
	  <v-card-text>
	    <v-form :key="key" @submit.prevent="submit">
		<v-layout>
		  <v-flex xs12 md10>
		    <v-text-field class="mr-2" label="Assignment Name" v-model="name"/>
		  </v-flex>
		  <v-flex xs12 md2>
		    <v-text-field label="weight" v-model="weight" type="number"/>
		  </v-flex>
		</v-layout>

		<v-layout>
		  <v-flex xs12>
		    <v-text-field label="URL" v-model="url"/>
		  </v-flex>
		</v-layout>

		<v-layout>
		</v-layout>

		<v-layout>
		  <v-flex xs12>
		    <v-checkbox :input-value="!due" @change="toggleDueDate" label="Accept work at any time."></v-checkbox>
		    <datetime class="mb-6 ml-8" v-if="updatedAssignment.due !== undefined"
			      v-model="due" type="datetime" placeholder="[Select due date]" input-id="dueDate">
		      <label for="dueDate" slot="before">Only accept work before</label>
		    </datetime>
		  </v-flex>
		</v-layout>

		<v-layout>
		  <v-flex xs12>
		    <v-checkbox :input-value="!showAfter" @change="toggleShowAfter" label="This assignment is always visible"></v-checkbox>
		    <datetime class="mb-6 ml-8" v-if="updatedAssignment.showAfter !== undefined"
			      v-model="showAfter" type="datetime" placeholder="[Select show after]" input-id="showAfterDate">
		      <label for="showAfterDate" slot="before">This assignment is only visible after</label>
		    </datetime>
		  </v-flex>
		</v-layout>


		<v-layout>
		  <v-flex xs12 text-xs-right>
		    <v-btn type="submit"
			   color="primary"
			   class="mr-4"
			   :disabled="Object.keys(this.updatedAssignment).length == 0"
			   >
		      Update Assignment
		    </v-btn>

		    <v-btn
		      color="error"
		      @click="key++; updatedAssignment = {};"
		      :disabled="Object.keys(this.updatedAssignment).length == 0"
		      >
		      Reset
		    </v-btn>
		  </v-flex>
		</v-layout>
	    </v-form>
	  </v-card-text>
	</v-card>
      </v-col>
    </v-flex>
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
    name: {
      get() { return this.assignment.name; },
      set(v) { this.$set(this.updatedAssignment, 'name', v); },
    },
    url: {
      get() { return this.assignment.url; },
      set(v) { this.$set(this.updatedAssignment, 'url', v); },
    },
    due: {
      get() { return this.assignment.due; },
      set(v) { this.$set(this.updatedAssignment, 'due', v); },
    },
    showAfter: {
      get() { return this.assignment.showAfter; },
      set(v) { this.$set(this.updatedAssignment, 'showAfter', v); },
    },
    weight: {
      get() { return this.assignment.weight; },
      set(v) { this.$set(this.updatedAssignment, 'weight', v); },
    },
  },

  data() {
    return {
      key: 1,
      dueSwitch: false,
      updatedAssignment: {},
    };
  },

  methods: {
    ...mapActions([
      'getCourse',
      'updateAssignment',
    ]),
    toggleDueDate(value) {
      if (value) {
        this.$set(this.updatedAssignment, 'due', undefined);
      } else {
        this.$set(this.updatedAssignment, 'due', Date.now());
      }
    },
    toggleShowAfter(value) {
      if (value) {
        this.$set(this.updatedAssignment, 'showAfter', undefined);
      } else {
        this.$set(this.updatedAssignment, 'showAfter', Date.now());
      }
    },
    submit() {
      return this.updateAssignment({
        id: this.id,
        assignmentIndex: this.assignmentIndex,
        data: this.updatedAssignment,
      });
    },
  },

  mounted() {
    return this.getCourse(this.id);
  },
};
</script>
