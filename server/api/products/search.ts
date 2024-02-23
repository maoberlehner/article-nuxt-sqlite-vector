import { search } from '~/server/repositories/product';

export default defineEventHandler(async (event) => {
  const { q, filterId } = getQuery<{ q: string; filterId: string }>(event);
  return search(q, { filterId });
});
