<script setup lang="ts">
const productData = ref({
  name: '',
  description: '',
});
const add = async () => {
  await $fetch('/api/products', {
    method: 'POST',
    body: productData.value,
  });
  productData.value = {
    name: '',
    description: '',
  };
};
</script>

<template>
  <div>
    <h1>Add new product</h1>
    <form @submit.prevent="add">
      <input v-model="productData.name" />
      <textarea v-model="productData.description" />
      <button type="submit">Add</button>
    </form>
  </div>
</template>
