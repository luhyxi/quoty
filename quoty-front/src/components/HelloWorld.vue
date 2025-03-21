<script setup lang="ts">
import { ref } from 'vue';
const products = ref(null);
fetch('https://testapi.jasonwatmore.com/products')
    .then(response => response.json())
    .then(data => products.value = data);

</script>

<template>
  <p class="">Adalberto Maçom Brasileiro

  </p>
</template>;