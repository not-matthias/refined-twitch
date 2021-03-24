<template>
  <div>
    <v-app-bar dark dense>
      <v-toolbar-title>Unhook Twitch</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon><v-icon>mdi-power</v-icon></v-btn>

      <template v-slot:extension>
        <v-tabs
          v-model="currentTab"
          fixed-tabs
          hide-slider
          :show-arrows="false"
          align-with-title
        >
          <v-tab>General</v-tab>
          <v-tab>Stream</v-tab>
          <v-tab>Misc</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-tabs-items v-model="currentTab">
      <!-- General -->
      <v-tab-item>
        <v-treeview selectable dense :items="items"></v-treeview>

        <v-checkbox
          v-model="config.general_config.show_followed_channels"
          dense
          label="Hide Followed Channels"
        ></v-checkbox>

        <v-switch
          v-model="config.general_config.show_recommendations"
          dense
          label="Hide Recommended"
        ></v-switch>
      </v-tab-item>

      <v-tab-item>2</v-tab-item>
      <v-tab-item>3</v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import {
  DEFAULT_CONFIG,
  IConfig,
  loadConfig,
  saveConfig,
} from "@/shared/config";

@Component
export default class Popup extends Vue {
  private config: IConfig = DEFAULT_CONFIG;
  private items = [
    {
      id: 1,
      name: "Applications :",
      children: [
        { id: 2, name: "Calendar" },
        { id: 3, name: "Chrome" },
        { id: 4, name: "Webstorm" },
      ],
    },
  ];
  private currentTab = 0;

  async mounted() {
    this.config = await loadConfig();
  }

  @Watch("config", { immediate: true, deep: true })
  onConfigChanged(value: IConfig, oldValue: IConfig) {
    saveConfig(this.config);
  }
}
</script>


<style>
body {
  width: 400px;
  /* zoom: 80%; */
}
</style>