import { createRouter, createWebHashHistory } from 'vue-router';

import Main from '../views/Main.vue';
import Teleconference from '../views/Teleconference.vue';
import Conversation from '../components/Conversation.vue';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: '/conversation/:id', component: Conversation }
    ]
  },
  {
    path: '/teleconference/:id',
    name: 'Teleconference',
    component: Teleconference
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

export const router = createRouter({
  history: createWebHashHistory(), // process.env.BASE_URL
  routes,
});

export function useRouter() {
  return router;
}
