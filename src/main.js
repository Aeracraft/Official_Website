import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import naive from 'naive-ui'
import 'vfonts/FiraCode.css'
import App from './App.vue'
import Home from './views/Home.vue'
import GameModes from './views/GameModes.vue'
import Rules from './views/Rules.vue'
import Join from './views/Join.vue'
import './style.css'
const routes = [
  { path: '/', component: Home },
  { path: '/games', component: GameModes },
  { path: '/rules', component: Rules },
  { path: '/join', component: Join },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.use(naive)
app.mount('#app')
