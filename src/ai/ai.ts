import OpenAI from 'openai';
import { REPHRASE_PROMPT_SYSTEM } from './promptSystem/rephrasePromptSystem.js';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import dotenv from "dotenv";
import { TRANSLATE_PROMPT_SYSTEM } from './promptSystem/translatePromptSystem.js';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.GPT_API_KEY
});

export async function reformulatedByGPT(userMessage: string): Promise<string>{
    try {
        let conv : ChatCompletionMessageParam[] = [
            { 
                role: "system", 
                content: REPHRASE_PROMPT_SYSTEM 
            },
            {
                role: "user",
                content: userMessage
            }
        ];
        
        const neutralisedSentenceReq = await openai.chat.completions.create({
            model: process.env.GPT_MODEL as string,
            messages: conv,
            temperature: parseFloat(process.env.GPT_TEMPERATURE as string)
        });

        const neutralisedSentenceRes = neutralisedSentenceReq.choices[0].message.content as string;

        return neutralisedSentenceRes

    } catch (error) {
        console.error('Erreur:', error);
        return JSON.stringify(error)
    }
}

export async function translateByGPT(userMessage: string, languageToTranslate: string|null = "US english") : Promise<string> {
    console.log(userMessage)
    try {
        let conv : ChatCompletionMessageParam[] = [
            { 
                role: "system", 
                content: TRANSLATE_PROMPT_SYSTEM
                + "Translate next text in " + languageToTranslate
            },
            {
                role: "user",
                content: userMessage
            }
        ];
        
        const translateSentenceReq = await openai.chat.completions.create({
            model: process.env.GPT_MODEL as string,
            messages: conv,
            temperature: parseFloat(process.env.GPT_TEMPERATURE as string)
        });

        const translateSentenceRes = translateSentenceReq.choices[0].message.content as string

        return translateSentenceRes

    } catch (error) {
        console.error('Erreur:', error);
        return JSON.stringify(error)
    }
}