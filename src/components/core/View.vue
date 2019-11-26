<template>
<v-content>
  <v-container fluid class="pa-6">
    <v-fade-transition mode="out-in">
      <router-view />
    </v-fade-transition>
  </v-container>
</v-content>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: 'Doenet gradebook',
    };
  },
};
</script>
