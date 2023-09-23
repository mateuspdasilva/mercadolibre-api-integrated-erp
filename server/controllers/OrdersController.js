const { getUsers } = require("../models/db/users.js");
const { Orders } = require("../models/db/orders.js");
/**
 * Description placeholder
 * @date 5/16/2023 - 8:06:25 PM
 *
 * @type {*}
 */
const https = require("https");

/**
 * Description placeholder
 * @date 5/16/2023 - 8:06:25 PM
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
const listAllOrders = async (req, res) => {
  const userData = await getUsers();
  const accessToken = userData.access_token;
  const sellerId = userData.user_id;

  const options = {
    hostname: "api.mercadolibre.com",
    path: `/orders/search?seller=${sellerId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  const requestPromise = new Promise((resolve, reject) => {
    const request = https.request(options, (resToken) => {
      let responseData = "";

      resToken.on("data", (chunk) => {
        responseData += chunk;
      });

      resToken.on("end", async () => {
        const resultado = JSON.parse(responseData);

        if (resultado.results.length > 0) {
          const fetchedOrders = resultado.results;

          fetchedOrders.forEach(async (order) => {
            const orderId = order.id;

            const existingOrder = await Orders.findAll({
              where: { order_id: orderId },
            });

            if (existingOrder.length === 0) {
              // push question if it doesn't exist on database
              await Orders.create({
                order_id: orderId,
                order_status: order.status,
                date_created: order.date_created,
                date_closed: order.date_closed,
                expiration_date: order.expiration_date,
                date_last_updated: order.date_last_updated,
              });

              const orderItems = order.order_items;
              const itemIds = orderItems
                .map((item) => `{"item": "${item.id}"}`)
                .join(",");
              await Orders.update(
                {
                  order_items: `[${itemIds}]`,
                },
                { where: { order_id: orderId } }
              );
            }
          });
          res.send(fetchedOrders);
        } else {
          res.send(resultado);
        }
      });
    });

    request.on("error", (error) => {
      console.error(error);
      reject(error);
    });

    request.end();
  });

  requestPromise
    .then(() => {
      res.send(requestPromise);
      return requestPromise;
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
};

/**
 * Description placeholder
 * @date 5/16/2023 - 8:06:25 PM
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
const getOrderById = async (req, res) => {
  const userData = await getUsers();
  const accessToken = userData.access_token;
  const sellerId = userData.user_id;
  const ordersData = await getOrders();
  const selectedOrder = ordersData[0];

  const options = {
    hostname: "api.mercadolibre.com",
    path: `/orders/search?seller=${sellerId}&q=${selectedOrder}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  const requestPromise = new Promise((resolve, reject) => {
    const request = https.request(options, (resToken) => {
      let responseData = "";

      resToken.on("data", (chunk) => {
        responseData += chunk;
      });

      resToken.on("end", async () => {
        const resultado = JSON.parse(responseData);
        res.send(resultado);
      });
    });

    request.on("error", (error) => {
      console.error(error);
      reject(error);
    });

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
};

module.exports = { listAllOrders, getOrderById };
