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
import {
  ConfigIds,
  DEFAULT_CONFIG,
  IConfig,
  loadConfig,
  saveConfig,
} from "@/shared/config";
import { IEvent, IEventType } from "@/shared/event";
import OptionsSync from "webext-options-sync";

@Component
export default class Popup extends Vue {
  private oldConfig: IConfig = Object.assign({}, DEFAULT_CONFIG);
  private config: IConfig = Object.assign({}, DEFAULT_CONFIG);
  private currentTab = 0;

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
        { id: ConfigIds.RECOMMENDED_CATEGORIES, name: "Recommended Categories" },
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
    this.config = await loadConfig();
    this.oldConfig = await loadConfig();
  }

  onSelectionChanged(): void {
    // Save the config
    //
    saveConfig(this.config);

    // Create the events (has to be done here, because otherwise the old config could be set before the callback will be called)
    //
    const addedEvent = this.getAddedEvent();
    const removedEvent = this.getRemovedEvent();

    // Send the events
    //
    chrome.tabs.query({}, (tabs) => {
      for (const tab of tabs) {
        if (!tab.id) {
          continue;
        }

        if (addedEvent) {
          chrome.tabs.sendMessage(tab.id, addedEvent);
        }

        if (removedEvent) {
          chrome.tabs.sendMessage(tab.id, removedEvent);
        }
      }
    });

    // Set the old config
    //
    this.oldConfig = Object.assign({}, this.config);
  }

  getRemovedEvent(): IEvent | undefined {
    const general = this.oldConfig.generalItems.filter(
      (item) => !this.config.generalItems.includes(item)
    );
    const home = this.oldConfig.homeItems.filter(
        (item) => !this.config.homeItems.includes(item)
    );
    const stream = this.oldConfig.streamItems.filter(
      (item) => !this.config.streamItems.includes(item)
    );
    const misc = this.oldConfig.miscItems.filter(
      (item) => !this.config.miscItems.includes(item)
    );

    const ids = general.concat(home).concat(stream).concat(misc);
    if (!ids.length) {
      return;
    }

    return {
      event_type: IEventType.Removed,
      ids,
    };
  }

  getAddedEvent(): IEvent | undefined {
    const general = this.config.generalItems.filter(
      (item) => !this.oldConfig.generalItems.includes(item)
    );
    const home = this.config.homeItems.filter(
        (item) => !this.oldConfig.homeItems.includes(item)
    );
    const stream = this.config.streamItems.filter(
      (item) => !this.oldConfig.streamItems.includes(item)
    );
    const misc = this.config.miscItems.filter(
      (item) => !this.oldConfig.miscItems.includes(item)
    );

    const ids = general.concat(home).concat(stream).concat(misc);
    if (!ids.length) {
      return;
    }

    return {
      event_type: IEventType.Added,
      ids,
    };
  }
}
</script>

<style>
body {
  width: 400px;
}
</style>