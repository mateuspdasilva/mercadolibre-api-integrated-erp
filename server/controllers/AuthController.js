const User = require("../models/db/users.js");
const https = require("https");
const url = require("url");
const cron = require("node-cron");


const tokenExpiration = 5 * 60 * 60 * 1000;
cron.expiresIn = tokenExpiration;

const serverStartTime = Date.now();

cron.schedule(`*/1 * * * *`, async () => {
  const user = await User.findOne({ where: { id: 1 } });
  const lastUpdateOnDb = user.last_updated;
  const dateNow = Date.now();

  const timeSinceServerStart = dateNow - serverStartTime;
  const timeSinceLastUpdate = dateNow - lastUpdateOnDb;

  console.log("Tempo desde a última atualização:", timeSinceLastUpdate);
  console.log("Tempo desde o início do servidor:", timeSinceServerStart);
  console.log("Valor de expiresIn:", cron.expiresIn);

  if (timeSinceLastUpdate + timeSinceServerStart >= cron.expiresIn) {
    refreshToken();
  }
});

/**
 * Primeira permissão do usuário, redirieciona para a request uri com o primeiro token encodado nela.
 * @date 5/16/2023 - 8:08:14 PM
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
const getFirstPermission = async (req, res) => {
  const user = await User.findOne({ where: { id: 1 } });
  const clientId = user.client_id;
  const clientSecret = user.client_secret;
  const { code } = url.parse(
    `${req.protocol}://${req.hostname}${req.originalUrl}`,
    true
  ).query;

  if (!code) {
    console.log(clientId);
    res.send(
      `<a href="https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${clientId}&redirect_uri=https://localhost:5000/auth/permissao/">Solicitar permissão</a>`
    );
    return;
  }

  const postData = {
    grant_type: "authorization_code",
    client_id: clientId,
    client_secret: clientSecret,
    code: code,
    redirect_uri: "https://localhost:5000/auth/permissao/",
  };

  const postDataString = Object.entries(postData)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  const options = {
    hostname: "api.mercadolibre.com",
    path: "/oauth/token",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": postDataString.length,
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
        console.log(resultado);

        await User.update(
          {
            access_token: resultado.access_token,
            code: resultado.refresh_token,
            client_id: clientId,
            client_secret: clientSecret,
            user_id: resultado.user_id,
            last_updated: Date.now(),
          },
          {
            where: { id: 1 },
          }
        );

        res.setHeader("Content-Type", "text/plain");
        res.send(resultado);
      });
    });

    request.on("error", (error) => {
      console.error(error);
      reject(error);
    });

    request.write(postDataString);
    request.end();
  });

  try {
    await requestPromise;
    res.send(requestPromise);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send("Ocorreu um erro ao autenticar aplicação.");
  }
};

/**
 * Atualiza access_token a cada 21.600 segundos.
 * TODO: Implementar chron ou rotina de verificação,
 * para garantir que o access_token sempre está atualizado.
 * @date 5/16/2023 - 8:08:14 PM
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @returns {unknown}
 */
const refreshToken = async (req, res) => {
  const user = await User.findOne({ where: { id: 1 } });
  const clientId = user.client_id;
  const clientSecret = user.client_secret;
  const code = user.code;

  const postData = {
    grant_type: "refresh_token",
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: code,
  };

  const postDataString = Object.entries(postData)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  const options = {
    hostname: "api.mercadolibre.com",
    path: "/oauth/token",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": postDataString.length,
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
        console.log(resultado);

        await User.update(
          {
            access_token: resultado.access_token,
            code: resultado.refresh_token,
            client_id: clientId,
            client_secret: clientSecret,
            last_updated: Date.now(),
          },
          {
            where: { id: 1 },
          }
        );

        res.send(resultado);
      });
    });

    request.on("error", (error) => {
      console.error(error);
      reject(error);
    });

    request.write(postDataString);
    request.end();
  });

  try {
    await requestPromise;
    res.send(requestPromise);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send("Ocorreu um erro ao autenticar aplicação.");
  }
};

module.exports = { getFirstPermission, refreshToken };
