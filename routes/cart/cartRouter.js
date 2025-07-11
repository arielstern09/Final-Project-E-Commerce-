const express = require("express");
const router = express.Router();
const {
  createCart,
  getCartWithTotalPrice,
  updateCartItemQuantity,
  updateCartItem,
  clearCart
} = require("./cartController");

router.get("/:cartId", async (req, res) => {
  try {
    const cart = await getCartWithTotalPrice(req.params.cartId);
    res.status(200).json({
      message: "success",
      payload: cart,
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
    const newCart = await createCart(req.body);
    res.json({
      message: "Cart has been successfully created",
      payload: newCart,
    });
  } catch (error) {
    res.json({
      message: "failure",
      payload: error.message,
    });
  }
});

router.put("/:cartId/items", async (req, res) => {
  try {
    const { cartId } = req.params;
    const newItem = req.body;
    const updatedCart = await updateCartItem(cartId, newItem);
    res.json({ message: "Item updated", payload: updatedCart });
  } catch (error) {
    res.json({ message: "failure", payload: error.message });
  }
});

router.put("/:cartId/items/quantity", async (req, res) => {
  try {
    const { cartId } = req.params;
    const { productId, newQuantity } = req.body;
    const updatedCart = await updateCartItemQuantity(
      cartId,
      productId,
      newQuantity
    );
    res.json({ message: "Quantity updated", payload: updatedCart });
  } catch (error) {
    res.json({ message: "failure", payload: error.message });
  }
});

router.delete("/:cartId", async (req, res) =>{
    try {
        const deleteCart = await clearCart(req.params.cartId)
        res.json({ message: " success ", payload: deleteCart });
    } catch (error) {
        res.json({ message: "failure", payload: error.message });
    }
})

module.exports = router;