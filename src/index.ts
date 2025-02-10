import * as dotenv from 'dotenv'
import express, {json, Request, Response} from 'express'
import { reformulatedByGPT, translateByGPT } from './ai/ai';


dotenv.config();

interface AttempRequestForRephrase {
  sentence: string
}

interface AttempRequestForTranslate {
  sentence: string,
  language: string|undefined
}

const PORT = process.env.PORT || 3000;
const app = express();

app.use(json());

app.post('/rephrase', async (req: Request, res: Response) => {
  const reqBody = req.body as AttempRequestForRephrase;

  if (reqBody.sentence == "") {
    res.json({
      reformulated: "",
      req: reqBody
    });
    return
  }

  let reformulatedSentence = await reformulatedByGPT(reqBody.sentence)

  res.json({
    reformulated: reformulatedSentence,
    req: reqBody
  });

});

app.post('/translate', async (req: Request, res: Response) => {
  const reqBody = req.body as AttempRequestForTranslate;

  if (reqBody.sentence == "") {
    res.json({
      reformulated: "",
      req: reqBody
    });
    return
  }

  let translatedSentence = await translateByGPT(reqBody.sentence, reqBody.language)
  
  res.json({
    translated: translatedSentence,
    req: reqBody
  });

});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log('Server listen on port ' + PORT);
});
