<template>
  <v-row justify="space-between">
     <v-col cols="7">
       <user-chip :id="statement.actor"></user-chip>
       <verb-chip :verb="statement.verb"></verb-chip>
       <object-chip :object="statement.object"></object-chip>
     </v-col>
     <v-col class="text-right" cols="5" v-text="statement.stored"></v-col>
   </v-row>
</template>

<script>
export default {
  props: {
    statement: {
      type: Object,
      required: true,
    },
  },
};
</script>
