import { OPEN_AI_SYSTEM_PROMPT } from './prompt'
import OpenAI from 'openai'

export const getOpenAiResponse = async (component: string) => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    })

    const response = await openai.chat.completions.create({
        max_tokens: 1024,
        messages: [
            {
                content: OPEN_AI_SYSTEM_PROMPT,
                role: 'system'
            },
            {
                content: buildUserPrompt(component),
                role: 'user'
            }
        ],
        model: 'gpt-4',
        temperature: 0
    })


    return response.choices[0].message.content
}

const buildUserPrompt = (component: string) => {
    return component
}
