<script setup lang="ts">
import type { Product } from '~/entities/product';

const props = defineProps<{
  product?: Product;
}>();
</script>

<template>
  <Card class="overflow-hidden">
    <img src="https://placehold.co/600x250" alt="" />
    <CardHeader>
      <CardTitle>{{ props.product?.name }}</CardTitle>
    </CardHeader>
    <CardContent>
      {{ props.product?.description.slice(0, 140) }}...
    </CardContent>
    <CardFooter class="flex justify-between px-6 pb-6">
      <Button as-child>
        <NuxtLink :to="`/products/${props.product?.id}`">View</NuxtLink>
      </Button>
    </CardFooter>
  </Card>
</template>
