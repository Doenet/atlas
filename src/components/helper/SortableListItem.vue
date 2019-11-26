<template>
  <v-list-item link two-line @click="$emit('chosen')">
    <slot />
    <v-list-item-action>
      <v-btn icon>
	<v-icon v-handle color="grey lighten-1">mdi-drag</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { ElementMixin, HandleDirective } from 'vue-slicksort';

export default {
  mixins: [ElementMixin],
  directives: { handle: HandleDirective },
};
</script>
