<template>
  <div id="app" :data-theme="currentTheme">
    <nav class="nav">
      <router-link to="/">计时器</router-link>
      <router-link to="/history">历史</router-link>
      <router-link to="/settings">设置</router-link>
    </nav>
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSkin } from '@/composables/useSkin'

const { currentTheme } = useSkin()
</script>

<style>
:root {
  --bg-color: #ffffff;
  --text-color: #333333;
  --primary-color: #FF6B6B;
}

[data-theme="light"] {
  --bg-color: #ffffff;
  --text-color: #333333;
  --primary-color: #FF6B6B;
}

[data-theme="dark"] {
  --bg-color: #1a1a2e;
  --text-color: #e0e0e0;
  --primary-color: #4ECDC4;
}

[data-theme="colorful"] {
  --bg-color: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --text-color: #ffffff;
  --primary-color: #f093fb;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--bg-color);
  color: var(--text-color);
  min-height: 100vh;
}

.nav {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--primary-color);
}

.nav a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.nav a.router-link-active {
  background: rgba(255,255,255,0.2);
}

.main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
