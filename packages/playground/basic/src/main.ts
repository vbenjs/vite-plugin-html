import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
// import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'

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

axios.get('/api/users').then((res) => {
  console.log(res)
})
