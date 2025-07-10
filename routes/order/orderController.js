const Order = require("./orderModel");
const Cart = require("../cart/cartModel");

const createOrderFromCart = async (cartId) => {
  try {
    const cart = await Cart.findById(cartId)
      .populate("items.productId", "name price")
      .populate("customer", "name email");

    const orderItems = [];
    let total = 0;

    for (let i = 0; i < cart.items.length; i++) {
      const item = cart.items[i];
      const product = item.productId;

      orderItems.push({
        productId: product._id,
        productName: product.name,
        priceAtPurchase: product.price,
        quantity: item.quantity,
      });

      total += product.price * item.quantity;
    }

    const orderData = {
      customer: cart.customer._id,
      customerName: cart.customer.name,
      customerEmail: cart.customer.email,
      items: orderItems,
      total,
      status: "pending",
    };

    const newOrder = await Order.create(orderData);
    return newOrder;
  } catch (error) {
    throw error;
  }
};

const updateStatus = async (orderId, newStatus) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: newStatus },
      { new: true }
    );
    return updateOrder;
  } catch (error) {
    throw error;
  }
};

const getOrdersByCustomer = async (customerId) => {
  try {
    const orders = await Order.find({ customer: customerId }).sort({
      createdAt: -1,
    });
    return orders;
  } catch (error) {
    throw error;
  }
};

const getOrders = async (filterQueries) => {
  try {
    const queryObject = {};

    if (filterQueries.status) {
      queryObject.status = filterQueries.status;
    }

    if (filterQueries.customer) {
      queryObject.customer = filterQueries.customer;
    }

    if (filterQueries.orderId) {
      queryObject._id = filterQueries.orderId;
    }

    const orders = await Order.find(queryObject).sort({ createdAt: -1 });
    return orders;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createOrderFromCart,
  updateStatus,
  getOrdersByCustomer,
  getOrders,
};
