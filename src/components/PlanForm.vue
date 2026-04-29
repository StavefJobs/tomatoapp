<template>
  <form @submit.prevent="handleSubmit" class="plan-form">
    <input
      v-model="content"
      type="text"
      placeholder="输入计划内容..."
      required
      class="plan-input"
    />
    <select v-model="type" required class="plan-select">
      <option value="daily">当天计划</option>
      <option value="weekly">周计划</option>
      <option value="monthly">月计划</option>
      <option value="longterm">长期计划</option>
    </select>
    <button type="submit" class="plan-submit">添加</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add'])

const content = ref('')
const type = ref('daily')

function handleSubmit() {
  if (!content.value.trim()) return
  emit('add', content.value, type.value)
  content.value = ''
}
</script>

<style scoped>
.plan-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.plan-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.plan-select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.plan-submit {
  padding: 0.5rem 1rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
