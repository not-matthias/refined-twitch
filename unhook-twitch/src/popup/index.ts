import Vue from "vue";
import AppComponent from "./App/App.vue";
import Vuetify from 'vuetify/lib/framework';

import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.component("app-component", AppComponent);

const vuetify = new Vuetify({});
Vue.use(Vuetify);

new Vue({
  vuetify,
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});
