<template>
  <v-list>
    <slot />
  </v-list>
</template>

<script>
import { ContainerMixin } from 'vue-slicksort';

export default {
  mixins: [ContainerMixin],
};
</script>
