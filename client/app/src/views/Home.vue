<template>
  <div class="home">
    <span>Video URLs:</span>
    <v-textarea v-model="urls"></v-textarea>
    <span>Playlist URLS:</span>
    <v-textarea v-model="playlistUrls"></v-textarea>
    <v-btn @click="process">Absenden</v-btn>
  </div>
</template>

<style lang="scss">
.home {
  padding: 10px;
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Home extends Vue  {
  private urls: string = "";
  private playlistUrls: string = "";

  private async process() {
    await fetch("http://biehler.speedport.ip:30002/process", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ links: this.urls.split("\r\n"), playlistUrls: this.playlistUrls.split("\r\n") })
    })
  }
}
</script>
