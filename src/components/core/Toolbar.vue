<template>
  <v-toolbar
    id="core-toolbar"

    flat
    prominent
    style="background: #eee;"
  >
    <div class="v-toolbar-title">
      <v-toolbar-title
        class="tertiary--text font-weight-light"
      >
        <v-btn
          v-if="responsive"
          class="default v-btn--simple"
          dark
          icon
          @click.stop="onClickBtn"
        >
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
        {{ title }}
      </v-toolbar-title>
    </div>

    <v-spacer />
    <v-toolbar-items>
      <v-flex
        align-center
        layout
        py-2
      >
        <v-text-field
          v-if="responsiveInput"
          class="mr-4 mt-2 purple-input"
          label="Search..."
          hide-details
          color="purple"
        />
        <router-link
          v-ripple
          class="toolbar-items"
          to="/"
        >
          <v-icon color="tertiary">mdi-view-dashboard</v-icon>
        </router-link>

        <v-menu
          bottom
          left
          content-class="dropdown-menu"
          offset-y
          transition="slide-y-transition">
	  <template v-slot:activator="{ on }">
          <router-link
            v-ripple
            slot="activator"
            class="toolbar-items"
            to="/notifications"
          >
            <v-badge
              color="error"
              overlap
            >
              <template slot="badge">
                {{ notifications.length }}
              </template>
              <v-icon color="tertiary" 	      v-on="on" >mdi-bell</v-icon>
            </v-badge>
          </router-link>
	  </template>
          <v-card>
            <v-list dense>
              <v-list-item
                v-for="notification in notifications"
                :key="notification"
                @click="onClick"
              >
                <v-list-item-title
                  v-text="notification"
                />
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>

        <v-menu
          bottom
          left
	  open-on-hover
          content-class="dropdown-menu"
	  v-if="loggedIn"
          offset-y
          transition="slide-y-transition">
	  <template v-slot:activator="{ on }">
          <router-link
            v-ripple
            slot="activator"
            class="toolbar-items"
            to="/profile"
            >
	    <v-icon 	    v-on="on" color="tertiary">mdi-account</v-icon>
          </router-link>
	  </template>
          <v-card>
            <v-list dense>
	      <v-list-item @click="logout">
		<v-list-item-action>
		  <v-icon>mdi-logout</v-icon>
		</v-list-item-action>

		<v-list-item-content>
		  <v-list-item-title>Logout</v-list-item-title>
		</v-list-item-content>
	      </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>

import { mapMutations } from 'vuex';

export default {
  data: () => ({
    notifications: [
      'Mike, John responded to your email',
      'You have 5 new tasks',
      'You\'re now a friend with Andrew',
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

  mounted() {
    this.onResponsiveInverted();
    window.addEventListener('resize', this.onResponsiveInverted);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResponsiveInverted);
  },

  computed: {
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

    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
        this.responsiveInput = false;
      } else {
        this.responsive = false;
        this.responsiveInput = true;
      }
    },
  },
};
</script>

<style>
  #core-toolbar a {
    text-decoration: none;
  }
</style>
