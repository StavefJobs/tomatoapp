<template>
  <div class="home">
    <Timer />
    <div class="plans-section">
      <h2>计划清单</h2>
      <PlanForm @add="addPlan" />
      <PlanList
        :plans="plans"
        :loading="loading"
        @toggle="togglePlan"
        @delete="deletePlan"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Timer from '@/components/Timer.vue'
import PlanForm from '@/components/PlanForm.vue'
import PlanList from '@/components/PlanList.vue'
import { usePlans } from '@/composables/usePlans'

const { plans, loading, fetchPlans, addPlan, togglePlan, deletePlan } = usePlans()

onMounted(() => {
  fetchPlans()
})
</script>

<style scoped>
.home {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.plans-section {
  padding: 1rem;
}

@media (max-width: 768px) {
  .home {
    grid-template-columns: 1fr;
  }
}
</style>
