import { ref, onMounted } from 'vue'

const THEMES = ['light', 'dark', 'colorful']

export function useSkin() {
  const currentTheme = ref('light')

  function setTheme(theme) {
    if (THEMES.includes(theme)) {
      currentTheme.value = theme
      localStorage.setItem('tomato-theme', theme)
      document.documentElement.setAttribute('data-theme', theme)
    }
  }

  function initTheme() {
    const saved = localStorage.getItem('tomato-theme')
    if (saved && THEMES.includes(saved)) {
      setTheme(saved)
    }
  }

  onMounted(() => {
    initTheme()
  })

  return {
    currentTheme,
    setTheme,
    THEMES
  }
}
