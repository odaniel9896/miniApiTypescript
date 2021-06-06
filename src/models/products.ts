import { dbQuery, dbQuery, dbQueryFirst } from "../services/db";

export type Product = {
  id: number;
  name: string;
  price: number;
};
const insertProduct = async (product: Product) => {
  await dbQuery("INSERT INTO product (name, price) values(?, ?)", [
    product.name,
    product.price,
  ]);
  let retorno = await dbQuery(
    `SELECT seq AS Id FROM sqlite_sequence WHERE  name = 'product'`
  );
  return getProduct(retorno[0].Id);
};

const updateProduct = async (product: Product) => {
  await dbQuery("UPDATE product set name = ?, price = ? ", [
    product.name,
    product.price,
    product.id,
  ]);

  return getProduct(product.id);
};

const listProducts = async () => {
  const retorno = await dbQuery("SELECT * FROM product");

  return retorno as Product[];
};

const getProduct = async (id: number) => {
  const retorno = await dbQueryFirst("SELECT * FROM product where id =  ?", [
    id,
  ]);

  return retorno as Product | undefined;
};

const deleteProduct = async (id: number) => {
  await dbQueryFirst("DELETE FROM product where id =  ?", [id]);
};

export const productModel = {
  insertProduct,
  listProducts,
  getProduct,
  deleteProduct,
  updateProduct
};
