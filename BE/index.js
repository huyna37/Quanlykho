const express = require('express');
const app = express();
const productRouter = require('./routes/product.routes');
const categoryRouter = require('./routes/category.routes');
const supplierRouter = require('./routes/supplier.routes');
const userRouter = require('./routes/user.routes');
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const mongoose = require('mongoose')
require('dotenv').config();
const corsOptions = {
  origin: "*",
};
// Allow Cross-Origin requests
app.use(cors(corsOptions));

app.use(
  express.json({
    limit: "15kb",
  })
);
// Data sanitization against Nosql query injection
app.use(mongoSanitize());

mongoose
  .connect(
    process.env.MONGO
  )
  .then(async () => {
    console.log("Kết nói tc!!");
  });

app.use('/products/', productRouter);
app.use('/categories/', categoryRouter);
app.use('/suppliers/', supplierRouter);
app.use('/users/', userRouter);

app.listen(3005, ()=> {
    console.info("It's running localhost:3005")
})