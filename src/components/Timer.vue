<template>
  <div class="timer">
    <div class="timer-display" :class="{ work: isWorkSession, break: !isWorkSession }">
      <h2>{{ isWorkSession ? '工作时间' : '休息时间' }}</h2>
      <div class="time">{{ displayTime }}</div>
    </div>
    <div class="timer-controls">
      <button @click="start" :disabled="isRunning">开始</button>
      <button @click="pause" :disabled="!isRunning">暂停</button>
      <button @click="reset">重置</button>
    </div>
  </div>
</template>

<script setup>
import { useTimer } from '@/composables/useTimer'

const { timeLeft, isRunning, isWorkSession, displayTime, start, pause, reset } = useTimer()
</script>

<style scoped>
.timer {
  text-align: center;
  padding: 2rem;
}

.timer-display {
  margin: 2rem 0;
}

.timer-display.work {
  color: #FF6B6B;
}

.timer-display.break {
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
</style>
