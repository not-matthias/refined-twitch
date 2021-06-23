<template>
  <div>
    <v-app-bar dark dense>
      <v-toolbar-title>Unhook Twitch</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-power</v-icon>
      </v-btn>

      <template v-slot:extension>
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
          <v-tab>Misc</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-tabs-items v-model="currentTab">
      <!-- General -->
      <v-tab-item>
        <v-treeview
          v-model="config.generalItems"
          :items="generalItems"
          selectable
          dense
          @input="onSelectionChanged"
        ></v-treeview>
      </v-tab-item>

      <!-- Home -->
      <v-tab-item>
        <v-treeview
          v-model="config.homeItems"
          :items="homeItems"
          selectable
          dense
          @input="onSelectionChanged"
        ></v-treeview>
      </v-tab-item>

      <!-- Stream -->
      <v-tab-item>
        <v-treeview
          v-model="config.streamItems"
          :items="streamItems"
          selectable
          dense
          @input="onSelectionChanged"
        ></v-treeview>
      </v-tab-item>

      <!-- Misc -->
      <v-tab-item>
        <v-treeview
          v-model="config.miscItems"
          :items="miscItems"
          selectable
          dense
          @input="onSelectionChanged"
        ></v-treeview>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ConfigIds, DEFAULT_CONFIG, IConfig } from "@/shared/config";
import { IEvent, IEventType } from "@/shared/event";
import settings from "@/content/settings";
import logger from "@/content/utils/logger";

@Component
export default class Popup extends Vue {
  private config: IConfig = Object.assign({}, DEFAULT_CONFIG);
  private currentTab = 0;

  // TODO: Try to replace the id with `item-key=name`
  private generalItems = [
    {
      id: 1001,
      name: "Left Sidebar",
      children: [
        { id: ConfigIds.FOLLOWED_CHANNELS, name: "Followed Channels" },
        { id: ConfigIds.RECOMMENDED_CHANNELS, name: "Recommended Channels" },
      ],
    },
    {
      id: 1002,
      name: "Header",
      children: [
        { id: ConfigIds.FOLLOWING, name: "Following" },
        { id: ConfigIds.BROWSE, name: "Browse" },
        { id: ConfigIds.PRIME_GAMING_LOOT, name: "Prime Gaming Loot" },
        { id: ConfigIds.NOTIFICATIONS, name: "Notifications" },
      ],
    },
  ];
  private homeItems = [
    {
      id: ConfigIds.FRONT_PAGE_CAROUSEL,
      name: "Front Page Player",
    },
    {
      id: 1003,
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
      id: 101,
      name: "Chat",
      children: [
        { id: ConfigIds.CHAT_WINDOW, name: "Chat Window" },
        { id: ConfigIds.POLLS, name: "Polls" },
        { id: ConfigIds.BETS, name: "Bets" },
      ],
    },
    {
      id: 102,
      name: "Information",
      children: [
        { id: ConfigIds.VIEWER_COUNT, name: "Viewer Count" },
        { id: ConfigIds.LIVE_TIME, name: "Live Time" },
      ],
    },
    {
      id: 103,
      name: "Actions",
      children: [
        { id: ConfigIds.FOLLOW, name: "Follow" },
        { id: ConfigIds.SUBSCRIBE, name: "Subscribe" },
      ],
    },
    {
      id: 104,
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
  private miscItems = [
    {
      id: 1,
      name: "Picture in Picture",
    },
  ];

  async mounted() {
    this.config = (await settings.get("config")) || DEFAULT_CONFIG;
  }

  onSelectionChanged(elements: number[]) {
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

      chrome.tabs.sendMessage(tab.id, elements);
      }
    });
  }
}
</script>

<style>
body {
  width: 400px;
}
</style>