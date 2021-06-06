import { Response, Request } from "express";
import {
  badRequest,
  internalServerError,
  notFound,
  ok,
  validateNumber,
} from "../services/util";
import { Product, productModel } from "../models/products";

const insertProduct = (req: Request, res: Response) => {
  {
    const product = req.body;
    if (!product) return badRequest(res, "Produto invalido");

    if (!product.name) return badRequest(res, "Produto sem nome");

    if (!validateNumber(product.price))
      return badRequest(res, "Informe um preço");
  }
  const product = req.body as Product;
  productModel
    .insertProduct(product)
    .then((product) => {
      res.json(product);
    })
    .catch((err) => internalServerError(res, err));
};

const updateProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  {
    if (!validateNumber(id)) return badRequest(res, "id Invalido");
    const product = req.body;
    if (!product) return badRequest(res, "Produto invalido");

    if (!product.name) return badRequest(res, "Produto sem nome");

    if (!validateNumber(product.price))
      return badRequest(res, "Informe um preço");

    const productSaved = await productModel.getProduct(id);

    if (!productSaved) return notFound(res);
  }
  const product = req.body as Product;
  productModel
    .updateProduct(product)
    .then((product) => {
      res.json(product);
    })
    .catch((err) => internalServerError(res, err));
};

const listProducts = (req: Request, res: Response) => {
  productModel.listProducts().then((products) => {
    res.json({
      products,
    });
  });
};

const getProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  {
    if (!validateNumber(id)) return badRequest(res, "id Invalido");
  }

  productModel.getProduct(id).then((product) => {
    if (product) return res.json(product);
    else return notFound(res);
  });
};

const deleteProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  {
    if (!validateNumber(id)) return badRequest(res, "id inválido");

    const productSaved = await productModel.getProduct(id);
    if (!productSaved) return notFound(res);
  }

  return productModel
    .deleteProduct(id)
    .then(() => ok(res))
    .catch((err) => internalServerError(res, err));
};
export const productController = {
  insertProduct,
  listProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
