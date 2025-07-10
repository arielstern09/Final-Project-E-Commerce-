const Order = require("./orderModel");
const { getCartWithTotalPrice } = require("../cart/cartController");

const createOrderFromCart = async (cartId) => {
  try {
    const cart = await getCartWithTotalPrice(cartId);

    const orderData = {
      customer: cart.customer._id,
      items: cart.items,
      total: cart.totalPrice,
      status: "pending",
      createdAt: new Date(),
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
    const orders = await Order.find({ customer: customerId })
      .populate("items.productId", "name price")
      .sort({ createdAt: -1 });
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

    const orders = await Order.find(queryObject);
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
