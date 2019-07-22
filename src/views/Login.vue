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
        >
          <v-form @submit.prevent="login">
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                  md12
                >
              <v-text-field
                id="email"
                name="email"
                type="email"
                label="email"
                v-model="email"
                autocomplete="off"
              ></v-text-field>
		</v-flex>
                <v-flex
                  xs12
                  md12
                >
              <v-text-field
                id="password"
                name="password"
                type="password"
                label="password"
                v-model="password"
                autocomplete="off"
              ></v-text-field>
		</v-flex>
		<v-btn type="submit" color="success">Login</v-btn>
	      </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data(){
    return {
      email : '',
      password : '',
    }
  },

  methods: {
    login: function () {
      const email = this.email;
      const password = this.password;
      this.$store.dispatch('login', { email, password });
    }
  },

  created() {
    if (this.$store.state.token) {
      router.push({ name: '/' });
    }
  },
}
</script>
