<template>
  <div class="settings">
    <h1>设置</h1>
    <SkinSwitcher />
  </div>
</template>

<script setup>
import SkinSwitcher from '@/components/SkinSwitcher.vue'
</script>

<style scoped>
.settings {
  max-width: 600px;
  margin: 0 auto;
}
</style>
