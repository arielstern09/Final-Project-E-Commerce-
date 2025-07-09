const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
} = require("./productController");

router.get("/", async (req, res) => {
  try {
    const products = await getProducts(req.query);
    res.json({
      message: "success",
      payload: products,
    });
  } catch (error) {
    res.json({
      message: "failure",
      payload: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    res.status(200).json({
      message: "success",
      payload: product,
    });
  } catch (error) {
    res.json({
      message: "failure",
      payload: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProduct = await createProduct(req.body);
    res.json({
      message: "Product has been successfully created",
      payload: newProduct,
    });
  } catch (error) {
    res.json({
      message: "failure",
      payload: error.message,
    });
  }
});

router.put("/:productId", async (req, res) => {
  try {
    const updatedProduct = await updateProductById(
      req.params.productId,
      req.body
    );
    res.json({
      message: "success",
      payload: updatedProduct,
    });
  } catch (error) {
    res.json({
      message: "failure",
      payload: error.message,
    });
  }
});

module.exports = router;
