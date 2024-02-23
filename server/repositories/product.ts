import { Product } from '~/entities/product';
import { init } from '../utils/db';
import { getEmbedding } from '../utils/embedding';

const db = init();

export const create = async (product: {
  name: string;
  description: string;
}) => {
  const vector = await getEmbedding(`${product.name} ${product.description}`);

  const insertProductAndVector = db.transaction(() => {
    const productQuery = db.prepare(`
      INSERT INTO products(name, description) VALUES (?, ?);
    `);
    const productResult = productQuery.run(product.name, product.description);
    const vssQuery = db.prepare(`
      INSERT INTO products_vss(rowid, vector) VALUES (?, ?);
    `);
    vssQuery.run(productResult.lastInsertRowid, JSON.stringify(vector));
  });

  // Execute the transaction
  insertProductAndVector();
};

export const get = async ({ id }: { id: string }) => {
  const query = db.prepare(`
		SELECT id, name, description
		FROM products
    WHERE id = ?;
  `);

  return query.get(id) as Product;
};

export const remove = async ({ id }: { id: string }) => {
  const removeProductAndVector = db.transaction(() => {
    const removeVectorQuery = db.prepare(`
      DELETE FROM products_vss
      WHERE rowid = ?;
    `);
    removeVectorQuery.run(id);
    const removeProductQuery = db.prepare(`
      DELETE FROM products
      WHERE id = ?;
    `);
    removeProductQuery.run(id);
  });

  // Execute the transaction
  removeProductAndVector();
};

export const list = async () => {
  const query = db.prepare(`
    SELECT id, name, description
    FROM products;
  `);

  return query.all() as Product[];
};

export const search = async (
  text: string,
  { filterId }: { filterId?: string } = {},
) => {
  if (!text) return [];

  const vector = await getEmbedding(text);
  const searchQuery = db.prepare(`
    WITH matching_products AS (
      SELECT rowid, distance
      FROM products_vss
      WHERE vss_search(vector, ?)
      ${filterId ? 'AND rowid != ?' : ''}
      AND distance < 1.5
      ORDER BY distance ASC
      LIMIT 20
    )
    SELECT p.*, mp.distance
    FROM products p
    INNER JOIN matching_products mp ON p.id = mp.rowid;
  `);

  return searchQuery.all(JSON.stringify(vector), filterId) as Product[];
};
