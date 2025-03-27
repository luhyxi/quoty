<script setup lang="ts">
import Quote from './components/Quote.vue'
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div class="min-h-screen">
    <Navbar class="sticky top-0 z-50" />
    <main class="pt-16">  <!-- Add padding-top to account for navbar height -->
      <Quote />
    </main>
  </div>
</template>