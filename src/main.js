import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './app.vue'
import Index from './pages/index.vue'
import History from './pages/history.vue'
import Settings from './pages/settings.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Index },
    { path: '/history', component: History },
    { path: '/settings', component: Settings }
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')
