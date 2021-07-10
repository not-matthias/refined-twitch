<template>
  <div>
    <v-app-bar dark dense>
      <v-toolbar-title>Refined Twitch</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="onPowerButtonClicked">
        <v-icon>mdi-power</v-icon>
      </v-btn>

      <template v-slot:extension v-if="extensionEnabled">
        <v-tabs
          v-model="currentTab"
          fixed-tabs
          hide-slider
          :show-arrows="false"
          align-with-title
        >
          <v-tab>General</v-tab>
          <v-tab>Home</v-tab>
          <v-tab>Stream</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <div v-if="extensionEnabled">
      <v-tabs-items v-model="currentTab">
        <!-- General -->
        <v-tab-item>
          <v-treeview
            v-model="config.generalItems"
            :items="generalItems"
            selectable
            dense
            @input="(ids) => onSelectionChanged(0, ids)"
          ></v-treeview>
        </v-tab-item>

        <!-- Home -->
        <v-tab-item>
          <v-treeview
            v-model="config.homeItems"
            :items="homeItems"
            selectable
            dense
            @input="(ids) => onSelectionChanged(1, ids)"
          ></v-treeview>
        </v-tab-item>

        <!-- Stream -->
        <v-tab-item>
          <v-treeview
            v-model="config.streamItems"
            :items="streamItems"
            selectable
            dense
            @input="(ids) => onSelectionChanged(2, ids)"
          ></v-treeview>
        </v-tab-item>
      </v-tabs-items>
    </div>

    <div v-else>
      <div align="center">
        <v-container>
          <h1 class="ma-5 pa-5 font-weight-thin">Extension not enabled</h1>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ConfigIds, DEFAULT_CONFIG, IConfig } from "@/shared/config";
import { IExtensionStatusEvent, IFeatureEvent } from "@/shared/event";
import settings from "@/content/settings";
import logger from "@/content/utils/logger";

@Component
export default class Popup extends Vue {
  private config: IConfig = Object.assign({}, DEFAULT_CONFIG);
  private currentTab = 0;

  private generalItems = [
    {
      id: 1111,
      name: "Left Sidebar",
      children: [
        { id: ConfigIds.FOLLOWED_CHANNELS, name: "Followed Channels" },
        { id: ConfigIds.RECOMMENDED_CHANNELS, name: "Recommended Channels" },
      ],
    },
    {
      id: 1112,
      name: "Header",
      children: [
        { id: ConfigIds.HEADER_LEFT, name: "Left" },
        { id: ConfigIds.HEADER_SEARCH, name: "Search" },
        { id: ConfigIds.HEADER_RIGHT, name: "Right" },
      ],
    },
  ];
  private homeItems = [
    {
      id: ConfigIds.FRONT_PAGE_CAROUSEL,
      name: "Front Page Player",
    },
    {
      id: 2221,
      name: "Recommended Items",
      children: [
        { id: ConfigIds.RECOMMENDED_STREAMS, name: "Recommended Channels" },
        {
          id: ConfigIds.RECOMMENDED_CATEGORIES,
          name: "Recommended Categories",
        },
        { id: ConfigIds.RECOMMENDED_CLIPS, name: "Recommended Clips" },
      ],
    },
  ];
  private streamItems = [
    {
      id: 3331,
      name: "Chat",
      children: [
        { id: ConfigIds.CHAT_WINDOW, name: "Chat Window" },
        { id: ConfigIds.CHANNEL_LEADERBOARD, name: "Leaderboard" },
        { id: ConfigIds.POLLS, name: "Polls" },
        { id: ConfigIds.BETS, name: "Bets" },
      ],
    },
    {
      id: 3332,
      name: "Information",
      children: [
        { id: ConfigIds.VIEWER_COUNT, name: "Viewer Count" },
        { id: ConfigIds.LIVE_TIME, name: "Live Time" },
      ],
    },
    {
      id: 3333,
      name: "Actions",
      children: [
        { id: ConfigIds.FOLLOW, name: "Follow" },
        { id: ConfigIds.SUBSCRIBE, name: "Subscribe" },
      ],
    },
    {
      id: 3334,
      name: "Channel Information",
      children: [
        { id: ConfigIds.STREAM_DESCRIPTION, name: "Stream Description" },
        { id: ConfigIds.METADATA, name: "Metadata (Category, Team, Tags)" },
      ],
    },
    {
      id: ConfigIds.SOCIAL_MEDIA,
      name: "Social Media",
    },
    {
      id: ConfigIds.CHANNEL_PANEL,
      name: "Channel Panel",
    },
    {
      id: ConfigIds.EXTENSIONS,
      name: "Extensions",
    },
  ];

  async mounted() {
    this.config = (await settings.get("config")) || DEFAULT_CONFIG;
  }

  onPowerButtonClicked() {
    this.extensionEnabled = !this.extensionEnabled;

    // Enable/disable the extension
    //
    chrome.tabs.query({}, (tabs) => {
      for (const tab of tabs) {
        if (!tab.id) {
          continue;
        }

        chrome.tabs.sendMessage(tab.id, {
          type: "extension",
          enabled: this.extensionEnabled,
        } as IExtensionStatusEvent);
      }
    });
  }

  onSelectionChanged(treeviewId: number, elements: number[]) {
    // Save the config
    //
    settings.set("config", this.config);

    // We have to send the enabled/disabled events to the content script so that it can set it in the settings. If we
    // try to do it from the popup (here), it won't work.
    //
    chrome.tabs.query({}, (tabs) => {
      for (const tab of tabs) {
        if (!tab.id) {
          continue;
        }

        chrome.tabs.sendMessage(tab.id, {
          type: "feature",
          treeviewId: treeviewId,
          ids: elements,
        } as IFeatureEvent);
      }
    });
  }

  get extensionEnabled() {
    return this.config.extensionEnabled;
  }

  set extensionEnabled(value: boolean) {
    this.config.extensionEnabled = value;
  }
}
</script>

<style>
body {
  width: 400px;
}
</style>
