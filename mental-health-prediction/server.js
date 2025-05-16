import express from 'express';
import cors from 'cors';
import axios from 'axios';
import Groq from 'groq-sdk';
import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import unzipper from 'unzipper';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

console.log('GROQ_API_KEY:', process.env.GROQ_API_KEY);

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

app.post('/predict', async (req, res) => {
  const { inputText, modelName } = req.body;
  try {
      let prediction;
      if (modelName === 'bert') {
          const fastApiResponse = await axios.post('http://127.0.0.1:8080/predict', { inputText });
          prediction = fastApiResponse.data.prediction;
      } else {
          const chatCompletion = await groq.chat.completions.create({
              messages: [{ role: "user", content: inputText }],
              model: modelName,
              temperature: 1,
              max_tokens: 1024,
              top_p: 1,
              stream: false,
              stop: null
          });

          prediction = chatCompletion.choices[0].message.content;
      }
      res.json({ prediction });
  } catch (error) {
      console.error('Prediction error:', error);
      res.status(500).json({ message: 'Prediction failed', error: error.message });
  }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
