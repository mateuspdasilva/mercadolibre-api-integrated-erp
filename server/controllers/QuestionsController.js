const { getUsers } = require("../models/db/users.js");
const { Questions } = require("../models/db/questions.js");
const https = require("https");

const listQuestions = async (req, res) => {
  const userData = await getUsers();
  const accessToken = userData.access_token;

  const options = {
    hostname: "api.mercadolibre.com",
    path: "/my/received_questions/search",
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
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

        if (resultado.questions.lenght > 0) {
          const questionsFetched = resultado.questions;

          questionsFetched.forEach(async (question) => {
            const questionId = question.id;

            const existingQuestion = await Questions.findAll({
              where: { question_id: questionId },
            });

            if (existingQuestion.length === 0) {
              // push question if it doesn't exist on database
              await Questions.create({
                product_id: question.item_id,
                question_id: questionId,
                question_status: question.status,
                question_text: question.text,
                question_date_created: question.date_created,
              });

              if (question.answer) {
                await Questions.update(
                  {
                    answer_status: question.answer.status,
                    answer_text: question.answer.text,
                    answer_date_created: question.answer.date_created,
                  },
                  { where: { question_id: questionId } }
                );
              }
            }
          });
          res.send(questionsFetched);
        }
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

const answerQuestion = async (req, res) => {
  const userData = await getUsers();
  const accessToken = userData.access_token;
  const questionData = await getQuestions();

  const selectedQuestion = questionData[0];

  const answerData = {
    question_id: selectedQuestion,
    text: "de fato, é salamaleico.",
  };

  const postData = JSON.stringify(answerData);

  const options = {
    hostname: "api.mercadolibre.com",
    path: "/answers",
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

        // Update the product details
        await Questions.update(
          {
            question_status: resultado.status,
            answer_status: resultado.answer.status,
            answer_text: resultado.answer.text,
            answer_date_created: resultado.answer.date_created,
          },
          { where: { question_id: selectedQuestion } }
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
};

module.exports = { listQuestions, answerQuestion };
