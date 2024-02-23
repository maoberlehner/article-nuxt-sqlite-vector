import { create } from '~/server/repositories/product';

export default defineEventHandler(async (event) => {
  const { name, description } = await readBody(event);
  return create({ name, description });
});
