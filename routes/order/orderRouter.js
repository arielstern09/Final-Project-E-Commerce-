const express = require("express");
const router = express.Router();
const {
  createOrderFromCart,
  updateStatus,
  getOrdersByCustomer,
  getOrders,
} = require("./orderController");

router.get("/", async (req, res) => {
  try {
    const orders = await getOrders(req.query);
    res.status(200).json({ message: "success", payload: orders });
  } catch (error) {
    res.status(500).json({ message: "failure", payload: error.message });
  }
});

router.get("/:customerId", async (req, res) => {
  try {
    const { customerId } = req.params; 
    const orders = await getOrdersByCustomer(customerId);
    res.status(200).json({ message: "success", payload: orders });
  } catch (error) {
    res.status(500).json({ message: "failure", payload: error.message });
  }
});


router.post("/", async (req, res) => {
  try {
    const { cartId } = req.body; 

    const newOrder = await createOrderFromCart(cartId);
    res
      .status(200)
      .json({ message: "Order placed successfully", payload: newOrder });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to place order", payload: error.message });
  }
});

router.put("/:orderId/status", async (req, res) => {
  try {
    const updatedOrder = await updateStatus(
      req.params.orderId,
      req.body.status
    );
    res.status(200).json({ message: "Status updated", payload: updatedOrder });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update status", payload: error.message });
  }
});

module.exports = router;
