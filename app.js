const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv/config");
const authJwt = require("./helper/jwt");
const errorHandler = require("./helper/error-handler");
app.use(cors());
app.options("*", cors());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler);
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

//*Routes
const categoriesRoutes = require("./routers/categories");
const productsRoutes = require("./routers/products");
const usersRoutes = require("./routers/users");
const ordersRoutes = require("./routers/orders");
const api = process.env.API_URL;
//*middleware
app.use(express.json());
//*Router

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
    dbName: "eshop2-database",
  })
  .then(() => {
    console.log("Database Connectiom is ready...🦑");
  })
  .catch((err) => {
    console.log(err, "🦐");
  });
app.listen(3000, () => {
  console.log(api);
  console.log("server is running http://localhost:3000", "👾🌠");
});
