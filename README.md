# 📜 TextManagerGPT

TextManagerGPT is an API based on **Express.js** and **OpenAI** that enables:  
✅ Text reformulation 📖  
✅ Text translation in a given language 🌍  

Developed with **TypeScript**, deployment with **Docker**.


## 📌 Installation and use

### 1️⃣ **Clone project**

```sh
git clone https://github.com/YR72dpi/TextManagerGPT.git
cd textmanagergpt
```

### 2️⃣ Install dependencies

```sh
npm install
```

### 3️⃣ Configure environment variables

Create an .env file in the root directory and add :

```
GPT_API_KEY="”
GPT_MODEL="gpt-4o-mini”
GPT_TEMPERATURE=0.5
PORT=3000
```

### 4️⃣ Start development mode

```sh
npm run dev
```

The API will run on http://localhost:3000.


## 🚀 Deploying with Docker (Production)
### 1️⃣ Build and start the container

```sh
docker compose up --build -d
```

### 2️⃣ Check logs

```sh
docker logs
```

### 3️⃣ Stop container

```sh
docker compose down
```

## 🛠️ API endpoints
### 📌 Reformulate a text

- URL : POST /rephrase
- Request body (JSON):

```json
{
    "sentence": "idk how 2 use gpt"
}
```

Response:

```json
{
    "reformulated": "I don't know how to use GPT.",
    "req": {
        "sentence": "idk how 2 use gpt"
    }
}
```

### 🌍 Translate a text

- URL : POST /translate
- Request body (JSON):

```json
{
    "sentence": "Hello, how are you?",
    "language": "French"
}
```

Answer :

```json
{
    "translated": "Bonjour, comment ca va ?",
    "req": {
        "sentence": "Hello, how are you?",
        "language": "British English"
    }
}
```

### 📜 Technologies used

- Node.js (Express.js) 🚀
- TypeScript 🔷
- OpenAI API 🤖
- Docker 🐳