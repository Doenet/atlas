<template>
  <v-footer
    id="core-footer"
  >
    <v-spacer/>
    <span class="font-weight-light copyright">
      &copy;
      {{ (new Date()).getFullYear() }}
      <a
        href="http://doenet.org/" target="_blank">Doenet</a>
    </span>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      { name: 'GitHub', Link: 'https://github.com/doenet' },
    ],
  }),
};
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
