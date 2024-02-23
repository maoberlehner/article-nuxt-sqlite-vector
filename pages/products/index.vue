<script setup lang="ts">
const { data: products } = await useFetch('/api/products');
</script>

<template>
  <div class="p-6 max-w-[1024px] mx-auto">
    <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      Products
    </h1>
    <div class="flex flex-wrap flex-col md:flex-row gap-6 mt-4">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        class="w-1/3"
      />
    </div>
  </div>
</template>
