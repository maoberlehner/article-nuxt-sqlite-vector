import { remove } from '~/server/repositories/product';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  if (!id) throw createError('Missing id');
  return remove({ id });
});
