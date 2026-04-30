<template>
  <div class="timer">
    <div class="timer-display" :class="{ work: isWorkSession, break: !isWorkSession }">
      <div class="circle-container">
        <svg width="242" height="242" viewBox="0 0 242 242">
          <circle stroke-width="10" fill="transparent" r="99" cx="121" cy="121"
            :stroke="isWorkSession ? '#FF6B6B' : '#4ECDC4'" stroke-opacity="0.2"/>
          <circle stroke-width="10" fill="transparent" r="99" cx="121" cy="121"
            :stroke="isWorkSession ? '#FF6B6B' : '#4ECDC4'"
            stroke-linecap="round"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="strokeDashoffset"
            transform="rotate(-90 121 121)"/>
        </svg>
        <div class="time-content">
          <h2>{{ isWorkSession ? '工作时间' : '休息时间' }}</h2>
          <div class="time">{{ displayTime }}</div>
        </div>
      </div>
    </div>
    <div class="timer-controls">
      <button @click="start" :disabled="isRunning">开始</button>
      <button @click="pause" :disabled="!isRunning">暂停</button>
      <button @click="reset">重置</button>
    </div>

    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-icon">⏰</div>
        <h3>时间到！</h3>
        <p>{{ completedSessionType === 'work' ? '工作时间' : '休息时间' }}已完成</p>
        <p class="next-session">接下来：{{ nextSessionText }}</p>
        <div class="modal-actions">
          <button @click="startNext" class="modal-btn primary">开始下一个</button>
          <button @click="resetTimer" class="modal-btn secondary">重置</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTimer } from '@/composables/useTimer'

const CIRCLE_RADIUS = 99
const circumference = 2 * Math.PI * CIRCLE_RADIUS

const showModal = ref(false)
const completedSessionType = ref('')

const { timeLeft, isRunning, isWorkSession, displayTime, progress, start, pause, reset } = useTimer({
  onComplete(session) {
    completedSessionType.value = session.type
    showModal.value = true
  }
})

const strokeDashoffset = computed(() => circumference * (1 - progress.value))

const nextSessionText = computed(() => {
  return completedSessionType.value === 'work' ? '休息时间 (5分钟)' : '工作时间 (25分钟)'
})

function startNext() {
  showModal.value = false
  completedSessionType.value = ''
  start()
}

function resetTimer() {
  showModal.value = false
  completedSessionType.value = ''
  reset()
}

function closeModal() {
  resetTimer()
}
</script>

<style scoped>
.timer {
  text-align: center;
  padding: 2rem;
}

.timer-display {
  margin: 2rem 0;
}

.circle-container {
  position: relative;
  width: 242px;
  height: 242px;
  margin: 0 auto;
}

.circle-container svg {
  position: absolute;
  top: 0;
  left: 0;
}

.time-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.timer-display.work .time-content {
  color: #FF6B6B;
}

.timer-display.break .time-content {
  color: #4ECDC4;
}

.time {
  font-size: 4rem;
  font-weight: bold;
  margin: 1rem 0;
}

.timer-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

button {
  padding: 0.75rem 2rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.modal-content h3 {
  margin: 0 0 0.5rem;
  color: #333;
  font-size: 1.5rem;
}

.modal-content p {
  color: #666;
  margin-bottom: 1.5rem;
}

.next-session {
  color: #888;
  font-size: 0.9rem;
  margin: 0.5rem 0 1rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.modal-btn {
  padding: 0.75rem 2rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.modal-btn.primary {
  background: var(--primary-color, #FF6B6B);
  color: white;
}

.modal-btn.secondary {
  background: #e0e0e0;
  color: #333;
}

.modal-btn.secondary:hover {
  background: #d0d0d0;
}
</style>
