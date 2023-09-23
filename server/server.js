"use strict";

const express = require("express");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const app = express();

app.use(cors());

// Routes ------------------------------------------------------
// AUTH
// Get first permission
const firstAuth = require("./routes/auth/permission.js");
app.use("/auth/permissao/", firstAuth);
// each 6 hours, acces_token has to be updated
const refreshToken = require("./routes/auth/refresh.js");
app.use("/auth/atualizar/", refreshToken);

// // USER
// // login
// const login = require("./routes/user/login.js");
// app.use("/usuario/login/", login);
// // create user
// const createUser = require("./routes/user/create-user.js");
// app.use("/usuario/criar/", createUser);
// get all user info
const userInfo = require("./routes/user/user-info.js");
app.use("/usuario/informacao/", userInfo);
// create test user
const createTestUser = require("./routes/user/create-test-user.js");
app.use("/usuario/criar-usuario-teste/", createTestUser);

// PRODUCTS
// CREATE PRODUCT
const createProduct = require("./routes/products/create-product.js");
app.use("/produtos/cadastro/", createProduct);
// UPDATE PRODUCT
const updateProduct = require("./routes/products/update-products.js");
app.use("/produtos/atualizar/", updateProduct);
// List all seller's products
const listProducts = require("./routes/products/list-products.js");
app.use("/produtos/buscar/", listProducts);
// List all avaliable categories
const listCategories = require("./routes/categories/list-categories.js");
app.use("/categorias/buscar/", listCategories);

// ORDERS
// List all seller's orders
const listOrders = require("./routes/orders/list-orders.js");
app.use("/pedidos/buscar/", listOrders);

// QUESTIONS
// List received questions
const listQuestions = require("./routes/questions/list-questions.js");
app.use("/perguntas/buscar/", listQuestions);
// Answer received questions
const answerQuestions = require("./routes/questions/answer-questions.js");
app.use("/perguntas/responder/", answerQuestions);

// Server ------------------------------------------------------
// server options
const OPTIONS = {
  key: fs.readFileSync("./certificates/server.key"),
  cert: fs.readFileSync("./certificates/server.cert"),
};

const PORT = 5000;

const AUTHOR = "Mateus";

// server starter
https.createServer(OPTIONS, app).listen(PORT, () => {
  console.log(
    `This software is running at: https://localhost:${PORT}.`,
    `Made by ${AUTHOR}.`
  );
});
