import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import { createApp, defineAsyncComponent } from 'vue'
import App from './main.vue'
import './assets/css/tailwind.css';

const Comment = defineAsyncComponent(() => import("comment/Comment"));


const app = createApp(App);

app.component("comment-element", Comment);
// app.mount("#app");

app.use(ElementPlus)
app.mount('#app')
