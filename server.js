const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const os = require('os');
const { OpenAIApi, Configuration } = require('openai');
const app = express();
app.use(express.json());
app.use(cors());

//const apiKey = process.env.OPENAI_API_KEY;
const apiKey = "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"
const orgKey = "org-TwcGJdld6pQCyszpn9Y4c7AU"
app.get('/', (req, res) => {res.send('<h1>Hello World!</h1>')});
app.get('/contacts', function(req, res) {
    res.sendFile(__dirname + '/kathy.html');
});
app.post('/api', async (req, res) => {
    console.log('POST request received');
    const data = req.body;
    const text = data.text;
    try {
        const input = text;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          };
          
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [{role: 'user', content: `${input}`}],
          },
          { headers }
        );
    
        const chatGptResponse = response.data.choices[0].message.content;
          // send response back to client in the form of a JSON object
          // containing the response from the GPT-3 chatbot.
         
        console.log('ChatGPT Respnse:'+ JSON.stringify(chatGptResponse));
        res.status(200).json({ message: chatGptResponse });
      } catch (err) {
        console.log('Error: ' + err);
        res.status(500).json({ error: 'An error occurred while processing your request' });
        }
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));