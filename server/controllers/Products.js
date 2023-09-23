const https = require("https");
const User = require("../models/db/users.js");
const { Products, getProductsTable } = require("../models/db/products.js");

class Product {
  async createNewProduct(req, res) {
    const user = await User.findOne({ where: { id: 1 } });
    const accessToken = user.access_token;

    let productsData = {
      title: "produto teste - nao comprar",
      category_id: "MLB38870",
      price: "8000.99",
      currency_id: "BRL",
      available_quantity: "9",
      buying_mode: "buy_it_now",
      condition: "new",
      listing_type_id: "bronze",
      pictures: [
        {
          source:
            "https://http2.mlstatic.com/D_NQ_NP_728237-MLB43823334592_102020-O.webp",
        },
        {
          source:
            "https://http2.mlstatic.com/D_NQ_NP_964118-MLB43823345319_102020-O.webp",
        },
      ],
    };

    const postData = JSON.stringify(productsData);

    const options = {
      hostname: "api.mercadolibre.com",
      path: "/items",
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const requestPromise = new Promise((resolve, reject) => {
      const request = https.request(options, (resToken) => {
        let responseData = "";

        resToken.on("data", (chunk) => {
          responseData += chunk;
        });

        resToken.on("end", async () => {
          console.log(responseData);
          const resultado = JSON.parse(responseData);

          await Products.create({
            product_id: resultado.id,
            product_title: resultado.title,
            product_price: resultado.price,
            product_quantity: resultado.available_quantity,
          });

          res.send(resultado);
        });
      });

      request.on("error", (error) => {
        console.error(error);
        reject(error);
      });

      request.write(postData);
      request.end();
    });

    try {
      await requestPromise;
      res.send(requestPromise);
      return;
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }

  async listAllProducts(req, res) {
    try {
      const userData = await User.findOne({ where: { id: 1 } });
      const accessToken = userData.access_token;
      const userId = userData.user_id;
      const params = req.query;
      const limit = params.limit ?? 1000;
      const offset = params.offset ?? 0;

      const options = {
        hostname: "api.mercadolibre.com",
        path: `/users/${userId}/items/search?limit=${limit}&offset=${offset}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };

      const requestPromise = new Promise((resolve, reject) => {
        const request = https.request(options, async (resToken) => {
          let responseData = "";

          resToken.on("data", (chunk) => {
            responseData += chunk;
          });

          resToken.on("end", async () => {
            const resultado = JSON.parse(responseData);
            const items = resultado.results;
            const productData = [];

            if (items.length > 0) {
              const promises = items.map((item) => {
                return new Promise((resolve, reject) => {
                const options = {
                  hostname: "api.mercadolibre.com",
                  path: `/items/${item}`,
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                  },
                };

                const requestItem = https.request(options, (resToken) => {
                  let responseData = "";
                  resToken.on("data", (chunk) => {
                    responseData += chunk;
                  });
                  resToken.on("end", async () => {
                    const resultado = JSON.parse(responseData);
                    productData.push(resultado);
                    resolve();
                  });
                });

                requestItem.on("error", (error) => {
                  console.error(error);
                  reject(error);
                });

                requestItem.end();
              });
            });

            Promise.all(promises)
            .then(() => {
              const numberOfItems = resultado.paging.total;
              res.send({ productData, numberOfItems });
            })
            .catch((error) => {
              console.error(error);
            });
            }
          });
        });

        request.on("error", (error) => {
          console.error(error);
          reject(error);
        });

        request.end();
      });

      await requestPromise;
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }

  async updateProduct(req, res) {
    const userData = await User.findOne({ where: { id: 1 } });
    const accessToken = userData.access_token;
    const params = req.query;
    const productId = params.productId;
    const changedField = params.changedField;
    const newValue = params.newValue;

    let productsData = {};
    productsData[changedField] = newValue;
    console.log(productId[changedField]);

    const postData = JSON.stringify(productsData);

    const options = {
      hostname: "api.mercadolibre.com",
      path: `/items/${productId}`,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const requestPromise = new Promise((resolve, reject) => {
      const request = https.request(options, (resToken) => {
        let responseData = "";

        resToken.on("data", (chunk) => {
          responseData += chunk;
        });

        resToken.on("end", async () => {
          console.log(responseData);
          const resultado = JSON.parse(responseData);

          // Update the product details
          await Products.update(
            {
              product_price: newValue,
            },
            { where: { product_id: productId } }
          );

          res.send(resultado);
        });
      });

      request.on("error", (error) => {
        console.error(error);
        reject(error);
      });

      request.write(postData);
      request.end();
    });

    try {
      await requestPromise;
      res.send(requestPromise);
      return;
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
}

module.exports = Product;
