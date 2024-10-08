import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueIdenticon from 'vue-identicon';

const app = createApp(App);

app.use(router);

app.component('VueIdenticon', VueIdenticon);


app.mount('#app');
