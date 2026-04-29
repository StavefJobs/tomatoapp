import { ref, computed, onUnmounted } from 'vue'

const WORK_DURATION = 25 * 60
const BREAK_DURATION = 5 * 60

export function useTimer() {
  const timeLeft = ref(WORK_DURATION)
  const isRunning = ref(false)
  const isWorkSession = ref(true)
  const intervalId = ref(null)

  const minutes = computed(() => Math.floor(timeLeft.value / 60))
  const seconds = computed(() => timeLeft.value % 60)
  const displayTime = computed(() => {
    const m = minutes.value.toString().padStart(2, '0')
    const s = seconds.value.toString().padStart(2, '0')
    return `${m}:${s}`
  })

  function start() {
    if (isRunning.value) return
    isRunning.value = true
    intervalId.value = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--
      } else {
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
  }

  function reset() {
    pause()
    timeLeft.value = isWorkSession.value ? WORK_DURATION : BREAK_DURATION
  }

  function completeSession() {
    pause()
    const session = {
      type: isWorkSession.value ? 'work' : 'break',
      duration: isWorkSession.value ? WORK_DURATION : BREAK_DURATION
    }
    saveSession(session)
    isWorkSession.value = !isWorkSession.value
    timeLeft.value = isWorkSession.value ? WORK_DURATION : BREAK_DURATION
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

  onUnmounted(() => {
    if (intervalId.value) clearInterval(intervalId.value)
  })

  return {
    timeLeft,
    isRunning,
    isWorkSession,
    displayTime,
    minutes,
    seconds,
    start,
    pause,
    reset
  }
}
