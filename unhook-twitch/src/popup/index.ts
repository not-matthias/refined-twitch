import Vue from "vue";
import AppComponent from "./App/App.vue";
import Vuetify from 'vuetify/lib/framework';

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
