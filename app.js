const express = require("express");
const logger = require("morgan");
const app = express();
const connectToMongoDB = require("./database/connectToMongoDB");
const PORT = 3000;

app.use(express.json());
app.use(logger("dev"));



const customerRouter = require("./routes/customer/customerRouter")
app.use("/api/customer", customerRouter);

const productRouter = require("./routes/product/productRouter")
app.use("/api/product", productRouter);

const cartRouter = require("./routes/cart/cartRouter")
app.use("/api/cart", cartRouter);

const orderRouter = require("./routes/order/orderRouter")
app.use("/api/order", orderRouter);

app.listen(PORT, () => {
    console.log(`server is on port ${PORT}...`);
  
    connectToMongoDB();
  });