const Cart = require("./cartModel");
const Product = require("../product/productModel");
const {getProductById} = require("../product/productController");

const getCartWithTotalPrice = async (cartId) => {
    try {
      const cart = await Cart.findById(cartId)
        .populate('customer', 'name email')
        .populate('items.productId', 'name price');
        
  
      let totalPrice = 0;
  
      for (const item of cart.items) {
        totalPrice += item.quantity * (item.productId.price || 0);
      }
  
      return {
        customer: cart.customer,
        items: cart.items,
        _id: cart._id,
        totalPrice: totalPrice
      };
    } catch (error) {
      throw error;
    }
  };
    
  const createCart = async (cartData) => {
    try {
      let totalPrice = 0;
  
      for (let i = 0; i < cartData.items.length; i++) {
        const item = cartData.items[i];
        const product = await getProductById(item.productId);
  
        const newAvailableStock = product.stock - item.quantity;
        await Product.findByIdAndUpdate(item.productId, { stock: newAvailableStock });
  
        totalPrice += item.quantity * product.price;
      }
  
      const cartToSave = {
        customer: cartData.customer,  
        items: cartData.items,
      };
  
      const newCart = await Cart.create(cartToSave);
      const cartObject = newCart.toObject();
  
      const cartWithTotal = {
        customer: cartObject.customer,
        items: cartObject.items,
        totalPrice: totalPrice,
        status: cartData.status || 'active'  
      };
  
      return cartWithTotal;
    } catch (error) {
      throw error;
    }
  };

  const updateCartItemQuantity = async (cartId, productId, newQuantity) => {
    try {
      const product = await Product.findById(productId);
      const cart = await Cart.findById(cartId);
  
      return await Cart.findOneAndUpdate(
        { _id: cartId, "items.productId": productId },
        { $set: { "items.$.quantity": newQuantity } },
        { new: true }
      );
    } catch (error) {
      throw error; 
    }
  };

  const updateCartItem = async (cartId, newItem) => {
    try {

        await Cart.findByIdAndUpdate(cartId, {
        $pull: { items: { productId: newItem.productId } }
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
  
  module.exports = {
    createCart,
    getCartWithTotalPrice,
    updateCartItemQuantity,
    updateCartItem,

  };
  



