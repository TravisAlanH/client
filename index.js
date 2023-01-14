// 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

// import { Configuration, OpenAIApi } from "openai";
const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const { response } = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const configuration = new Configuration({
  organization: "org-LuZkTuix8A9Sc3k3EKWWg43A",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

//create a sysple api that calls the fucntion above

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3080;

app.post("/", async (req, res) => {
  const { message } = req.body;
  console.log(message);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });
  res.json({
    message: response.data.choices[0].text,
  });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
