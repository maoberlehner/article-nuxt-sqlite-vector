<script setup lang="ts">
const idOrIds = useRoute().params.id;
const id = Array.isArray(idOrIds) ? idOrIds[0] : idOrIds;
const { data: product } = await useFetch(`/api/products/${id}`);
if (product.value === null) throw createError({ statusCode: 404 });

const { data: similarProducts, status } = useLazyFetch('/api/products/search', {
  server: false,
  query: {
    q: `${product.value.name} ${product.value.description}`,
    // We pass the `id` of the current product to
    // prevent it from showing up as a similar product.
    filterId: id,
  },
});
</script>

<template>
  <div class="p-6 max-w-[1024px] mx-auto">
    <div class="mb-12 flex flex-col md:flex-row gap-6">
      <img src="https://placehold.co/400x400" alt="" />
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {{ product.name }}
        </h1>
        <p class="mt-2 text-sm text-gray-500">{{ product.description }}</p>
      </div>
    </div>
    <template v-if="similarProducts?.length > 0">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        Similar Products
      </h2>
      <div class="flex flex-col md:flex-row gap-6 mt-4">
        <ProductCard
          v-for="similarProduct in similarProducts"
          :key="similarProduct.id"
          :product="similarProduct"
          class="w-full"
        />
      </div>
    </template>
    <div v-else-if="status === 'pending'">Loading similar products...</div>
  </div>
</template>
