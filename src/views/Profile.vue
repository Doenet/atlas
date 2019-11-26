<template>
<v-form :key="key" @submit.prevent="submit">
  <v-layout wrap>
    <v-flex md8>
      <v-layout >
	<v-flex
          xs6
          >
          <v-text-field
	    class="mr-4"
            label="First Name"
            v-model="firstName"
            >
	    <v-icon slot="prepend">mdi-account</v-icon>
	  </v-text-field>
	</v-flex>
	<v-flex
          xs6
          >

          <v-text-field
            label="Last Name"
            v-model="lastName"
            />
	</v-flex>
      </v-layout>

      <v-layout wrap>
	<v-flex
          xs12
          md12
          >
          <v-text-field
            label="Email Address"
            v-model="email"
            >
	    <v-icon slot="prepend">mdi-email</v-icon>
	  </v-text-field>
	</v-flex>
      </v-layout>
    </v-flex>

    <v-layout ml-2 justify-end>
      <v-image-input
	v-model="jpegPhotograph"
	:image-quality="0.65"
	clearable
	:image-height="128"
	:image-width="128"
	image-format="jpeg"
	/>
    </v-layout>

  </v-layout>


      <v-flex
        xs12
        md12
        >
        <v-checkbox
          v-model="gpdrConsent"
	  label="I consent to the tracking of my progress and my activity on educational websites which participate in Doenet; my data will be used to provide my instructor with my grades on course assignments, and anonymous data may be provided to content authors to improve the educational effectiveness."
	  ><v-icon slot="append" to="/privacy-policy">mdi-information</v-icon>
	</v-checkbox>
      </v-flex>

      <v-flex
        xs12
        md12
        v-if="profile.gpdrConsent"
        >
        <p>You consented to such tracking on {{profile.gpdrConsentDate | moment("dddd, MMMM Do YYYY") }}.</p>
      </v-flex>

      <v-flex
        xs12
        md12
        >
        <v-checkbox
          v-model="isInstructor"
	  label="I am an instructor and wish to see the instructor interface on Doenet.  As an instructor, my name and profile picture will be visible to the public."
	  required
	  ></v-checkbox>
      </v-flex>


      <v-flex
        xs12
        text-xs-right
        >

	<v-btn type="submit"
	       color="primary"
	       class="mr-4"
               :disabled="Object.keys(this.updatedProfile).length == 0"
	       >
	  Update Profile
	</v-btn>

	<v-btn
	  color="error"
	  @click="key++; updatedProfile = {};"
          :disabled="Object.keys(this.updatedProfile).length == 0"
	  >
	  Reset
	</v-btn>
      </v-flex>
</v-form>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['profile']),
    jpegPhotograph: {
      get() { return this.profile.jpegPhotograph; },
      set(v) {
        if (this.profile.jpegPhotograph !== v) this.$set(this.updatedProfile, 'jpegPhotograph', v);
        else if (v === null) this.$set(this.updatedProfile, 'jpegPhotograph', '');
      },
    },
    firstName: {
      get() { return this.profile.firstName; },
      set(v) { this.$set(this.updatedProfile, 'firstName', v); },
    },
    lastName: {
      get() { return this.profile.lastName; },
      set(v) { this.$set(this.updatedProfile, 'lastName', v); },
    },
    email: {
      get() { return this.profile.email; },
      set(v) { this.$set(this.updatedProfile, 'email', v); },
    },
    gpdrConsent: {
      get() { return this.profile.gpdrConsent; },
      set(v) { this.$set(this.updatedProfile, 'gpdrConsent', v); },
    },
    isInstructor: {
      get() { return this.profile.isInstructor; },
      set(v) { this.$set(this.updatedProfile, 'isInstructor', v); },
    },
  },

  data() {
    return {
      profileImage: '',
      updatedProfile: {},
      key: 1,
    };
  },

  methods: {
    ...mapActions([
      'getProfile',
      'updateProfile',
    ]),

    submit() {
      return this.updateProfile(this.updatedProfile);
    },
  },

  mounted() {
    return this.getProfile();
  },
};
</script>
