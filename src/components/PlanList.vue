<template>
  <div class="plan-list">
    <div v-if="loading">加载中...</div>
    <div v-else-if="plans.length === 0" class="empty">暂无计划</div>
    <div v-else>
      <div
        v-for="plan in plans"
        :key="plan.id"
        class="plan-item"
        :style="{ borderLeft: `4px solid ${plan.color}` }"
        :class="{ completed: plan.completed }"
      >
        <input
          type="checkbox"
          :checked="plan.completed"
          @change="$emit('toggle', plan.id)"
        />
        <span class="plan-content">{{ plan.content }}</span>
        <span class="plan-type">{{ getTypeLabel(plan.type) }}</span>
        <button @click="$emit('delete', plan.id)" class="delete-btn">删除</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  plans: Array,
  loading: Boolean
})

defineEmits(['toggle', 'delete'])

const TYPE_LABELS = {
  daily: '当天',
  weekly: '本周',
  monthly: '本月',
  longterm: '长期'
}

function getTypeLabel(type) {
  return TYPE_LABELS[type] || type
}
</script>

<style scoped>
.plan-list {
  margin-top: 1rem;
}

.plan-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: rgba(255,255,255,0.1);
  border-radius: 4px;
}

.plan-item.completed .plan-content {
  text-decoration: line-through;
  opacity: 0.6;
}

.plan-content {
  flex: 1;
}

.plan-type {
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
  background: rgba(0,0,0,0.1);
  border-radius: 3px;
}

.delete-btn {
  padding: 0.2rem 0.5rem;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.empty {
  text-align: center;
  padding: 2rem;
  opacity: 0.6;
}
</style>
