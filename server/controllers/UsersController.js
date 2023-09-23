// controllers/UserController.js
const User = require("../models/db/users.js");
const https = require("https");
const { refreshToken } = require("./AuthController.js");

const getUserInfo = async (req, res) => {
  try {
    const userData = await User.findOne({ where: { id: 1 } });
    const accessToken = userData.access_token ?? "";

    const options = {
      hostname: "api.mercadolibre.com",
      path: "/users/me",
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const requestPromise = new Promise((resolve, reject) => {
      const request = https.request(options, async (resToken) => {
        let responseData = "";

        resToken.on("data", (chunk) => {
          responseData += chunk;
        });

        resToken.on("end", async () => {
          console.log(responseData);
          const resultado = JSON.parse(responseData);

          const { message } = resultado;

          if (!message) {
            res.send(resultado);
          } else {
            const result = await refreshToken();
            res.send(result);
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
    res.send(requestPromise);
  } catch (error) {
    console.error(error);
    res.status(500).send("Ocorreu um erro ao atualizar o token");
  }
};

const createTestUser = async (req, res) => {
  const userData = await getUsers();
  const accessToken = userData.access_token;

  let productsData = {
    site_id: "MLB",
  };

  const postData = JSON.stringify(productsData);

  const options = {
    hostname: "api.mercadolibre.com",
    path: "/users/test_user",
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
};

module.exports = { getUserInfo, createTestUser };
