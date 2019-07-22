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
        <material-card
          color="green"
          title="Edit Profile"
          text="Complete your profile"
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                  md12
                >
                  <v-text-field
                    label="Email Address"
                    v-model="email"		    
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    label="First Name"
                    v-model="firstName"		    
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    label="Last Name"
                    v-model="lastName"
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right
                >
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
                  >
                    Update Profile
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
  
export default {
  computed: {
    email: {
      get() {
        return this.$store.state.profile.email;
      },
      set(value) {
        const data = {
          key: 'email',
          value: value
        }
        this.addProfileData(data);
      }
    },

    firstName: {
      get() {
        return this.$store.state.profile.firstName;
      },
      set(value) {
        const data = {
          key: 'firstName',
          value: value
        }
        this.addProfileData(data);
      }
    },

    lastName: {
      get() {
        return this.$store.state.profile.lastName;
      },
      set(value) {
        const data = {
          key: 'lastName',
          value: value
        }
        this.addProfileData(data);
      }
    },
  },

  data(){
    return {
    }
  },

  methods: {
    ...mapActions([
      'changeMyPassword',
      'getProfile',
      'addProfileData',
      'saveProfile'
    ]),
    submit() {
      return this.saveProfile({
        nickname: this.nickname,
        name: this.name,
        phone: this.phone,
        address: this.address,
        birthday: this.birthday,
        housing: this.housing	    
      });
    },

    /*
    async save() {
      try {
        const valid = await this.$validator.validateAll()
        if (valid) {
          await this.changeMyPassword({
            oldPassword: this.oldPassword,
            newPassword: this.newPassword
          })
          this.oldPassword = ''
          this.newPassword = ''
          this.confirmPassword = ''
          this.triggerChangePassword = false
          this.close()
          return
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.oldPassword = ''
        this.newPassword = ''
        this.confirmPassword = ''
        this.triggerChangePassword = false
        this.close()
        return
      }
    }*/
  },
  
  mounted() {
    return this.getProfile();
  }
}
</script>
