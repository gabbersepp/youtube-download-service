<template>
  <div class="home">
    <v-overlay v-if="runningRequest">Verarbeitung...</v-overlay>
    <span>Video URLs:</span>
    <v-textarea v-model="urls"></v-textarea>
    <span>Playlist URLS:</span>
    <v-textarea v-model="playlistUrls"></v-textarea>
    <v-btn @click="process">Absenden</v-btn>
    <div class="result" v-if="processResult">
      <div :class="processResult.success">{{ processResult.message }}</div>
      <div>
        <span>Fehlerhafte Videos:</span>
        <ul>
          <li v-for="l in processResult.failedSingleLinks" :key="l">{{ l }}</li>
        </ul>
        <span>Verareitete Videos:</span>
        <ul>
          <li v-for="l in processResult.processed" :key="l.id">{{ l.path }}</li>
        </ul>
        <span>Verareitete Playlistvideos:</span>
        <ul>
          <li v-for="l in processResult.processedPlaylistUrls" :key="l.id">{{ l.path }}</li>
        </ul>
      </div>
    </div>
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
  private runningRequest: boolean = false;

  private processResult = null;

  private async getConfig() {
    const response = await fetch("config/config.json");
    const config = await response.json();
    return config;
  }

  private async process() {
    this.runningRequest = true;
    const config = await this.getConfig();
    const result = await fetch(`${config.baseUrl}/process`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ links: this.urls.split("\r\n").filter(x => x), playlistUrls: this.playlistUrls.split("\r\n").filter(x => x) })
    })
    this.urls = "";
    this.playlistUrls = "";
    this.processResult = await result.json();
    this.runningRequest = false;
  }
}
</script>
