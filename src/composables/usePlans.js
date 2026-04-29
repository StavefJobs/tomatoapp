import { ref, onMounted } from 'vue'

const PLAN_COLORS = {
  daily: '#FF6B6B',
  weekly: '#4ECDC4',
  monthly: '#45B7D1',
  longterm: '#96CEB4'
}

export function usePlans() {
  const plans = ref([])
  const loading = ref(false)

  async function fetchPlans(type = null) {
    loading.value = true
    try {
      const url = type ? `/api/plans?type=${type}` : '/api/plans'
      const res = await fetch(url)
      plans.value = await res.json()
    } catch (error) {
      console.error('Failed to fetch plans:', error)
    } finally {
      loading.value = false
    }
  }

  async function addPlan(content, type) {
    try {
      const res = await fetch('/api/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          type,
          color: PLAN_COLORS[type]
        })
      })
      const newPlan = await res.json()
      plans.value.unshift(newPlan)
    } catch (error) {
      console.error('Failed to add plan:', error)
    }
  }

  async function togglePlan(id) {
    try {
      await fetch(`/api/plans/${id}`, { method: 'PATCH' })
      const plan = plans.value.find(p => p.id === id)
      if (plan) plan.completed = !plan.completed
    } catch (error) {
      console.error('Failed to toggle plan:', error)
    }
  }

  async function deletePlan(id) {
    try {
      await fetch(`/api/plans/${id}`, { method: 'DELETE' })
      plans.value = plans.value.filter(p => p.id !== id)
    } catch (error) {
      console.error('Failed to delete plan:', error)
    }
  }

  return {
    plans,
    loading,
    fetchPlans,
    addPlan,
    togglePlan,
    deletePlan,
    PLAN_COLORS
  }
}
