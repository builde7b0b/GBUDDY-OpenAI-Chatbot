
/*
 *
 *
   ____ ____  _   _ ____  ______   __
  / ___| __ )| | | |  _ \|  _ \ \ / /
 | |  _|  _ \| | | | | | | | | \ V /
 | |_| | |_) | |_| | |_| | |_| || |
  \____|____/ \___/|____/|____/ |_|


 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * */

// npm init //INITIALIZE NEW PACKAGE.JSON for sever
// install dependecies
// npm install cors dotenv express nodemon openai

//CONFIG OPENAI API

// GET API KEY FROM OPENAI.COM/API

//GPT-3
// CODEX
// DALL-E

import express from 'express'; // express?
import * as dotenv from 'dotenv'; //get data from env file
import cors from 'cors'; // // allow for cross origin request
import { Configuration, OpenAIApi } from 'openai'; //wrappers help to use OpenAI

dotenv.config(); // allows use of variables
console.log(process.env.OPENAI_API_KEY);

const configuration = new Configuration({
  //start config settings
  apiKey: process.env.OPENAI_API_KEY,
});

// create instance of OpenAI, pass in config
const openai = new OpenAIApi(configuration);

// initialize app
const app = express();
//setup middlewares, Cross origin request, allows server to be called from frontend
app.use(cors());
app.use(express.json()); //pass json frm front end to backend
//create dummy route
app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX',
  });
});

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
}); //GET route can't receive data from front end
// post route allows us to have a payload

app.listen(5000, () =>
  console.log('Server is running on port http://localhost:500')
);
