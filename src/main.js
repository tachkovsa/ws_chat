import { createApp, Plugin } from 'vue';
// import VueImg from 'v-img/lib';

import App from './App.vue';
import { router } from './router';
import { store } from './store';

// TODO: Need ref in future, coz of devtools isn't working correctly
// const devtools = {
// 	install(app) {
// 		if (process.env.NODE_ENV === 'development' && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
// 			window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app;
// 		}
// 	},
// };

const app = createApp(App);

app.directive('click-outside', {
    beforeMount(el, binding, vnode) {
        el.clickOutsideEvent = function(event) {
            if (!(el === event.target || el.contains(event.target))) {
                binding.value(event, el);
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
    }
});

app.use(store).use(router);

// app.config.globalProperties.window = window;
// app.use(devtools);
// app.use(VueImg);
// .use(require('vue-moment'))

app.mount('#app');