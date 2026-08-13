<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView v-slot="{ Component }">
    <transition name="pagina" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>
</template>

<style>
.pagina-enter-active,
.pagina-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}

.pagina-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.pagina-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (prefers-reduced-motion: reduce) {
  .pagina-enter-active,
  .pagina-leave-active {
    transition: none;
  }
}
</style>
