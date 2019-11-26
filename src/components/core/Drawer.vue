<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue" app
    >
    <v-list dense>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img v-if="profile.jpegPhotograph" :src="profile.jpegPhotograph"/>
	    <v-icon v-else>mdi-account-circle</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-if="profile.firstName || profile.lastName">
	      {{profile.firstName}} {{profile.lastName}}</v-list-item-title>
            <v-list-item-title v-else>Anonymous User</v-list-item-title>
            <v-list-item-subtitle v-if="profile.guest">Logged in as guest</v-list-item-subtitle>
	    <v-list-item-subtitle v-else>Logged in</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
	<v-divider/>

        <v-list-item
          v-for="item in items"
          :key="item.text"
	  :to="item.to"
          link
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>

        </v-list-item>

        <v-subheader  class="mt-4 grey--text text--darken-1">COURSES YOU'RE TAKING</v-subheader>
        <v-list>
          <v-list-item
            v-for="course in learnerCourses"
            :key="course.id"
	    :to="'/learners/me/courses/' + course.id"
            link
            >
	    <v-list-item-icon><v-icon>mdi-golf</v-icon></v-list-item-icon>
            <v-list-item-title v-text="course.name" />
          </v-list-item>

	  <v-dialog v-model="enrollmentDialog" persistent max-width="600px">
	    <template v-slot:activator="{ on }">
	      <v-list-item link v-on="on">
		<v-list-item-icon><v-icon>mdi-plus-circle-outline</v-icon></v-list-item-icon>
		<v-list-item-title>Enroll in course</v-list-item-title>
	      </v-list-item>
	    </template>
	    <v-card>
              <v-card-title>
		<span class="headline">Enroll in course</span>
              </v-card-title>
              <v-card-text>
		<v-container>
		  <v-row>
		    <v-col cols="12">
                      <v-text-field :rules="[ruleEnrollmentCode]" v-model="courseEnrollmentCode" label="Course enrollment code" required></v-text-field>
		    </v-col>
		  </v-row>
		</v-container>
		<small>An enrollment code is seven five-letter words separated by dashes.</small>
              </v-card-text>
              <v-card-actions>
		<v-spacer></v-spacer>
		<v-btn color="blue darken-1" text @click="enrollmentDialog = false">Close</v-btn>
		<v-btn color="blue darken-1" text @click="enrollmentDialog = false; viewCourse();">View course</v-btn>
              </v-card-actions>
	    </v-card>
	  </v-dialog>
        </v-list>

	<template v-if="profile.isInstructor">
        <v-subheader  class="mt-4 grey--text text--darken-1">COURSES YOU'RE TEACHING</v-subheader>
        <v-list>
          <v-list-item
            v-for="course in instructorCourses"
            :key="course.id"
	    :to="'/instructors/me/courses/' + course.id"
            link
            >
	    <v-list-item-icon><v-icon>mdi-teach</v-icon></v-list-item-icon>
            <v-list-item-title v-text="course.name" />
          </v-list-item>

	  <v-list-item link to="/instructors/me/courses/new">
	    <v-list-item-icon><v-icon>mdi-plus-circle-outline</v-icon></v-list-item-icon>
            <v-list-item-title>Create new course</v-list-item-title>
	  </v-list-item>

        </v-list>
	</template>

    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block color='warning' @click="logout">Logout</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import bubble from 'bubble_babble';

// Utilities
import {
  mapActions,
  mapGetters,
  mapMutations,
  mapState,
} from 'vuex';

export default {
  data: () => ({
    enrollmentDialog: false,
    drawer: null,
    courseEnrollmentCode: '',
    items: [
      { icon: 'mdi-view-dashboard', text: 'Dashboard', to: '/' },
      { icon: 'mdi-account', text: 'Your Profile', to: '/profile' },
      { icon: 'mdi-progress-check', text: 'Assignments', to: '/assignments' },
    ],

  }),

  computed: {
    ...mapState(['profile']),

    ...mapGetters([
      'learnerCourses',
      'instructorCourses',
    ]),


    inputValue: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.setDrawer(val);
      },
    },
    sidebarOverlayGradiant() {
      return 'rgba(27, 27, 27, 0.74), rgba(27, 27, 27, 0.74)';
    },
  },
  created() {
    this.getLearnerCourses();
    this.getInstructorCourses();
  },

  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    ...mapMutations(['setDrawer']),
    ...mapActions([
      'getLearnerCourses',
      'getInstructorCourses',
    ]),
    ruleEnrollmentCode() {
      if (this.courseEnrollmentCode.length === 0) return true;
      try {
        bubble.decode(this.courseEnrollmentCode).toString('hex');
        return true;
      } catch (e) {
        return 'invalid enrollment code';
      }
    },
    viewCourse() {
      try {
        const decodedEnrollmentCode = bubble.decode(this.courseEnrollmentCode).toString('hex');
        console.log(decodedEnrollmentCode);
        this.$router.push({ name: 'LearnerCourse', params: { id: decodedEnrollmentCode } });
      } catch (e) {
        this.$store.dispatch('alertError', 'Invalid enrollment code');
      }
    },
    logout() {
      this.$store.dispatch('logout').then(() => this.$router.push('/'));
    },
  },
};
</script>
