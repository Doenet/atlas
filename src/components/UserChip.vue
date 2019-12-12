<template>
  <v-chip
    class="mr-2"
    color="indigo"
    text-color="white"
    label
    :to="{ name: 'User', params: { id: user.id }}"
    >
    <v-avatar left>
      <v-icon>mdi-account-circle</v-icon>
    </v-avatar>
    <template v-if="user.firstName">
      {{ user.firstName }} {{ user.lastName }}
    </template>
    <template v-else>
      Anonymous
    </template>
  </v-chip>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
},

  computed: {
    ...mapState([
      'users',
]),
    user: {
      get() { return this.users[this.id]; },
    },

  },

  data() {
    return {
    };
  },

  methods: {
    ...mapActions([
      'getUser',
    ]),
  },

  mounted() {
    return this.getUser(this.id);
  },
};
</script>
