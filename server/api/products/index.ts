import { list } from '~/server/repositories/product';

export default defineEventHandler(async () => {
  return list();
});
