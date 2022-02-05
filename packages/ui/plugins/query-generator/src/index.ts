import { App } from "vue";
import Component from "./Component.vue";

export { Component };

export default {
  install(app: App) {
    app.component("query-generator", Component);
  },
};
