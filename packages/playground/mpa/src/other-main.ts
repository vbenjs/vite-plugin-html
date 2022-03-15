import { createApp } from 'vue'
import App from './other-app.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/test',
      component: () => import('./test.vue'),
    },
  ],
})

createApp(App).use(router).mount('#app')
