import QueryGeneratorPlugin from "../../query-generator/src/index";
import SearchPlugin from "../../search/src/index";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

app.use(SearchPlugin);
app.use(QueryGeneratorPlugin);

app.mount("#app");
