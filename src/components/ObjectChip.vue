<template>
<v-chip
    class="mr-2"
    color="gray"
  label
    :href="object.id"
  >
    {{ object.definition.name['en-US'] }}
</v-chip>
</template>

<script>

export default {
  props: {
    object: {
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
