import { ref, computed, onUnmounted, onMounted } from 'vue'

const WORK_DURATION = 25 * 60
const BREAK_DURATION = 5 * 60

export function useTimer({ onComplete } = {}) {
  const timeLeft = ref(WORK_DURATION)
  const isRunning = ref(false)
  const isWorkSession = ref(true)
  const intervalId = ref(null)
  let startTimestamp = null
  let initialTimeLeft = 0

  const minutes = computed(() => Math.floor(timeLeft.value / 60))
  const seconds = computed(() => timeLeft.value % 60)
  const displayTime = computed(() => {
    const m = minutes.value.toString().padStart(2, '0')
    const s = seconds.value.toString().padStart(2, '0')
    return `${m}:${s}`
  })

  const totalTime = computed(() => isWorkSession.value ? WORK_DURATION : BREAK_DURATION)
  const progress = computed(() => timeLeft.value / totalTime.value)

  function updateTimeLeft() {
    if (!isRunning.value || startTimestamp === null) return
    const elapsedSeconds = Math.floor((Date.now() - startTimestamp) / 1000)
    const remaining = Math.max(0, initialTimeLeft - elapsedSeconds)
    timeLeft.value = remaining
    return remaining
  }

  function start() {
    if (isRunning.value) return
    isRunning.value = true
    startTimestamp = Date.now()
    initialTimeLeft = timeLeft.value
    intervalId.value = setInterval(() => {
      const remaining = updateTimeLeft()
      if (remaining !== undefined && remaining === 0) {
        completeSession()
      }
    }, 1000)
  }

  function pause() {
    isRunning.value = false
    if (intervalId.value) {
      clearInterval(intervalId.value)
      intervalId.value = null
    }
    updateTimeLeft()
  }

  function reset() {
    pause()
    startTimestamp = null
    initialTimeLeft = 0
    timeLeft.value = isWorkSession.value ? WORK_DURATION : BREAK_DURATION
  }

  function completeSession() {
    pause()
    const session = {
      type: isWorkSession.value ? 'work' : 'break',
      duration: isWorkSession.value ? WORK_DURATION : BREAK_DURATION
    }
    saveSession(session)

    // 切换 session 类型并设置新时间
    isWorkSession.value = !isWorkSession.value
    timeLeft.value = isWorkSession.value ? WORK_DURATION : BREAK_DURATION

    if (onComplete) onComplete(session)
  }

  async function saveSession(session) {
    try {
      await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(session)
      })
    } catch (error) {
      console.error('Failed to save session:', error)
    }
  }

  function handleVisibilityChange() {
    if (document.visibilityState === 'visible' && isRunning.value) {
      updateTimeLeft()
    }
  }

  onMounted(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange)
  })

  onUnmounted(() => {
    if (intervalId.value) clearInterval(intervalId.value)
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  })

  return {
    timeLeft,
    isRunning,
    isWorkSession,
    displayTime,
    minutes,
    seconds,
    totalTime,
    progress,
    start,
    pause,
    reset
  }
}
