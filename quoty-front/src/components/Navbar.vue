<script setup lang="ts">

const bookUrl = import.meta.env.VITE_BOOK_LINK;
const portfolioUrl = import.meta.env.VITE_PORTFOLIO_LINK;
</script>

<template>
  <nav class="text-white shadow-lg sticky top-0">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <a
              to="/"
              class="text-2xl font-bold text-white hover:text-gray-300 transition-colors"
          >
            Finnegan's Awake Bits
          </a>
        </div>

        <div class="flex items-center space-x-4">
          <a :href="bookUrl" class="px-3 py-2 rounded-md hover:bg-gray-700 transition-colors">
            The Book
          </a>
          <!-- TODO
          <a href="/" class="px-3 py-2 rounded-md hover:bg-gray-700 transition-colors">
            About
          </a>
          -->
          <a :href="portfolioUrl" class="px-3 py-2 rounded-md hover:bg-gray-700 transition-colors">
            Luana's Portfolio
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>