const mongoose = require("mongoose");
const Cart = require("./cartModel");

const getCartWithTotalPrice = async (cartId) => {
  try {
    const cart = await Cart.findById(cartId)
      .populate("customer", "name email")
      .populate("items.productId", "name price");

    let totalPrice = 0;

    for (const item of cart.items) {
      totalPrice += item.quantity * (item.productId.price || 0);
    }

    return {
      customer: cart.customer,
      items: cart.items,
      _id: cart._id,
      totalPrice: totalPrice,
    };
  } catch (error) {
    throw error;
  }
};

const createCart = async (cartData) => {
  try {
    const newCart = await Cart.create(cartData);

    const populatedCart = await Cart.findById(newCart._id)
      .populate("customer", "name email")
      .populate("items.productId", "name price");

    return populatedCart;
  } catch (error) {
    throw error;
  }
};
const updateCartItemQuantity = async (cartId, productId, quantity) => {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { _id: cartId, "items.productId": productId },
      { $set: { "items.$.quantity": quantity } },
      { new: true, runValidators: true }
    );
    return updatedCart;
  } catch (error) {
    throw error;
  }
};

const updateCartItem = async (cartId, newItem) => {
  try {
    await Cart.findByIdAndUpdate(cartId, {
      $pull: { items: { productId: newItem.productId } },
    });

    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { $push: { items: newItem } },
      { new: true }
    );

    return updatedCart;
  } catch (error) {
    throw error;
  }
};

const clearCart = async (cartId) => {
  try {
    const clearItems = await Cart.findByIdAndDelete(cartId);
    return clearItems;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCart,
  getCartWithTotalPrice,
  updateCartItemQuantity,
  updateCartItem,
  clearCart,
};
