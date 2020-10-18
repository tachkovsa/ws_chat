import { createApp, Plugin } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// TODO: Need ref in future, coz of devtools isn't working correctly
// const devtools = {
// 	install(app) {
// 		if (process.env.NODE_ENV === 'development' && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
// 			window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app;
// 		}
// 	},
// };

const app = createApp(App);
// app.use(devtools);
app.use(store).use(router).mount('#app');
// .use(require('vue-moment'))
