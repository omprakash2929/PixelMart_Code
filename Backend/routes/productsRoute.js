import express from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import {
  brainTreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSigleProductController,
  producstPhotoController,
  productCategoryController,
  productFilters,
  productsCounts,
  productsListCount,
  reletedProductController,
  searchProductsController,
  updateProductController,
} from "../controller/productController.js";
import formidable from "express-formidable";
const router = express.Router();

//! Routes

//! Create products Routes
router.post(
  "/create-product",
  requireSignin,
  isAdmin,
  formidable(),
  createProductController
);

//! Get Products Routes
router.get("/get-product", getProductController);

//! Get single Products
router.get("/get-product/:slug", getSigleProductController);

//!Get Photos
router.get("/products-photo/:pid", producstPhotoController);

//! Delete Products
router.delete("/product-delete/:pid", deleteProductController);

//! Update products Routes
router.put(
  "/update-product/:pid",
  requireSignin,
  isAdmin,
  formidable(),
  updateProductController
);

//! Proucst Filter
router.post("/product-filter", productFilters);

//! Producst Counts
router.get("/product-counts", productsCounts);

//! products Per pages
router.get("/products-list/:page", productsListCount);

//! Search Products
router.get("/search/:keyword", searchProductsController);

//! Similer Products
router.get("/releted-product/:pid/:cid", reletedProductController);

//! Category wise product
router.get("/product-category/:slug", productCategoryController);

//? Payment Routes

//! Token
router.get("/braintree/token", braintreeTokenController);

//* Payments
router.post("/braintree/payment", requireSignin, brainTreePaymentController);
export default router;
