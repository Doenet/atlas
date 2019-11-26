<template>
  <v-app-bar app dense>
    <v-app-bar-nav-icon color='black' @click.stop="onClickBtn" />
    <v-toolbar-title>Doenet LRS</v-toolbar-title>
  </v-app-bar>
</template>

<script>

import { mapMutations, mapState } from 'vuex';

export default {
  data: () => ({
    notifications: [
      'Mike, John responded to your email',
      'You have 5 new tasks',
      'Another Notification',
      'Another One',
    ],
    title: null,
    responsive: false,
    responsiveInput: false,
  }),

  watch: {
    $route(val) {
      this.title = val.name;
    },
  },

  computed: {
    ...mapState(['profile']),

    loggedIn: {
      get() {
        return this.$store.state.token;
      },
    },
  },

  methods: {
    ...mapMutations(['toggleDrawer']),

    onClickBtn() {
      this.toggleDrawer();
    },

    onClick() {
      //
    },

    logout() {
      this.$store.dispatch('logout').then(() => this.$router.push('/'));
    },
  },
};
</script>
