<template>
  <div class="history">
    <h1>历史记录</h1>
    <div v-if="loading">加载中...</div>
    <div v-else>
      <div v-for="session in sessions" :key="session.id" class="session-item">
        <span class="session-type">{{ session.type === 'work' ? '工作' : '休息' }}</span>
        <span class="session-duration">{{ Math.floor(session.duration / 60) }}分钟</span>
        <span class="session-date">{{ formatDate(session.completed_at) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const sessions = ref([])
const loading = ref(false)

async function fetchSessions() {
  loading.value = true
  try {
    const res = await fetch('/api/sessions')
    sessions.value = await res.json()
  } catch (error) {
    console.error('Failed to fetch sessions:', error)
  } finally {
    loading.value = false
  }
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleString('zh-CN')
}

onMounted(fetchSessions)
</script>

<style scoped>
.history {
  max-width: 600px;
  margin: 0 auto;
}

.session-item {
  display: flex;
  gap: 1rem;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: rgba(255,255,255,0.1);
  border-radius: 4px;
}

.session-type {
  font-weight: bold;
}

.session-duration {
  flex: 1;
}
</style>
