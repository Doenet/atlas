<template>
<v-chip
    class="mr-2"
    color="success"
    outlined
    >
    {{ verb.display['en-US'] }}
  </v-chip>
</template>

<script>

export default {
  props: {
    verb: {
      type: Object,
      required: true,
    },
},

  data() {
    return {
    };
  },

};
</script>
