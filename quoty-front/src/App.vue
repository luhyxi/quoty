<script setup lang="ts">
import Quote from './components/Quote.vue'
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div class="min-h-screen">
    <Navbar class="sticky top-0 z-50 h-16" />
    <main class="pt-[var(--navbar-height)]">
      <Quote />
    </main>
  </div>
</template>

<style>
:root {
  --navbar-height: 4rem; /* 64px */
}
</style>