<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../api/api.ts'; // adjust the path as needed

const quote = ref<string>('');
const error = ref<string>('');
const isLoading = ref<boolean>(false);

async function fetchQuote() {
  isLoading.value = true;
  error.value = '';

  console.log(import.meta.env.VITE_FINNEGANS_API)

  try {
    const response = await api.getQuote();
    quote.value = response.data; // or adjust based on your API response structure
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch quote';
  } finally {
    isLoading.value = false;
  }
}

// Fetch quote when component mounts
onMounted(fetchQuote);
</script>

<template>
  <div class="font-[amarante-regular] text-xl max">
    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <p v-else class="quote">{{ quote }}</p>
  </div>
</template>