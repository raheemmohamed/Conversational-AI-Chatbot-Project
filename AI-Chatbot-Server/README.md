# AI Chatbot Backend Server

This is AI chatbot backend server, Developed using NodeJS, ExpressJS, MongoDB, AWS S3 bucket and OpenAI

## Instructions to get up and run the development environment

**1: Clone this repository**
**2: Do run `npm install`**
**3: Duplicate existing file name `config.sample.env` and rename it to `config.env` and update following configuration with your's**

```
OPENAI_API_KEY= // OpenAI APi Key here
AWS_ACCESS_KEY_ID= // AWS Access Key here
AWS_ACCESS_SECRET= // AWS Access Secret here
DATABASE=mongodb+srv://username:<PASSWORD>@ai-chatbot-cluster.ansz0ec.mongodb.net/ai-chatbot?retryWrites=true
DATABASE_PASSWORD= // Mongodb password
CRYPTO_SECRET="ai-chatbot-secret-2269"
```

**4: Do run `npm run-script start:watch`**
