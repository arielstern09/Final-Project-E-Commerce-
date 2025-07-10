const Product = require("./productModel");

const createProduct = async (productData) => {
  try {
    const newProduct = await Product.create(productData);
    return newProduct;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    throw error;
  }
};

const getProducts = async (filterQueries) => {
  try {
    const queryObject = {};

    const sortObject = {};

    if (filterQueries.category) {
      queryObject.category = filterQueries.category;
    }

    if (filterQueries.minPrice && filterQueries.maxPrice) {
      queryObject.price = {
        $gte: Number(filterQueries.minPrice),
        $lte: Number(filterQueries.maxPrice),
      };
    }

    if (filterQueries.sortBy) {
      if (filterQueries.sortOrder === "desc") {
        sortObject[filterQueries.sortBy] = -1;
      } else {
        sortObject[filterQueries.sortBy] = 1;
      }
    }

    const events = await Product.find(queryObject).sort(sortObject);
    return events;
  } catch (error) {
    throw error;
  }
};

const updateProductById = async (productId, productData) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      productData,
      { new: true, runValidators: true }
    );
    return updatedProduct;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
};
