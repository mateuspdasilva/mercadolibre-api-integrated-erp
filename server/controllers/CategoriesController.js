const { getUsers } = require("../models/db/users.js");
const https = require("https");

/**
 * Description here
 * @date 5/16/2023 - 9:14:36 PM
 * @author Mateus Pereira da Silva
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
const listAllCategories = async (req, res) => {
  const userData = await getUsers();
  const accessToken = userData.access_token;

  const options = {
    hostname: "api.mercadolibre.com",
    path: "/sites/MLB/categories",
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
        console.log(resultado);
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

module.exports = { listAllCategories };
