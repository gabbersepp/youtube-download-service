<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <!--<v-btn to="/cameraconfig">Kameras</v-btn>
      <v-btn to="/videolist">Videos</v-btn>//-->
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
});
</script>
