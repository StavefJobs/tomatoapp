<template>
  <div class="skin-switcher">
    <h3>选择皮肤</h3>
    <div class="skin-options">
      <button
        v-for="theme in THEMES"
        :key="theme"
        @click="setTheme(theme)"
        :class="{ active: currentTheme === theme }"
        class="skin-btn"
        :data-theme="theme"
      >
        {{ getThemeLabel(theme) }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useSkin } from '@/composables/useSkin'

const { currentTheme, setTheme, THEMES } = useSkin()

const THEME_LABELS = {
  light: '浅色',
  dark: '深色',
  colorful: '彩色'
}

function getThemeLabel(theme) {
  return THEME_LABELS[theme] || theme
}
</script>

<style scoped>
.skin-switcher {
  padding: 1rem;
}

.skin-options {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.skin-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.skin-btn.active {
  border-color: var(--primary-color);
  background: var(--primary-color);
  color: white;
}

.skin-btn[data-theme="dark"] {
  background: #1a1a2e;
  color: white;
}

.skin-btn[data-theme="colorful"] {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
</style>
