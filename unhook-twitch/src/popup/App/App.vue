<template>
  <v-app>
    <v-container>
      <!-- Header -->
      <v-row justify="space-between">
        <v-col>
          <p class="subtitle-1 ma-0">Unhook Twitch</p>
        </v-col>

        <v-col align="right">
          <v-btn icon small><v-icon>mdi-power</v-icon></v-btn>
        </v-col>
      </v-row>

      <v-divider />

      <!-- Different settings -->

      <div class="mt-3">
        <v-checkbox
          v-model="checkbox"
          class="ma-0 pa-0 mb-n2"
          dense
          label="Hide Recommended"
        ></v-checkbox>

        <v-checkbox
          v-model="checkbox"
          class="ma-0 pa-0 mb-n2"
          dense
          label="Hide Home"
        ></v-checkbox>
      </div>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Popup extends Vue {
  private checkbox = false;
}
</script>


<style>
body {
  width: 300px;
  /* zoom: 80%; */
}
</style>