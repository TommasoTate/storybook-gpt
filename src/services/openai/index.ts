import { getPrompt } from './prompt'
import OpenAI from 'openai'

export const getOpenAiResponse = async (component: string, parentFolder: string) => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    })

    const response = await openai.chat.completions.create({
        max_tokens: 512,
        messages: [
            {
                content: getPrompt(component, { parentFolder }),
                role: 'user'
            }/*,
            {
                content: buildUserPrompt(component),
                role: 'user'
            }*/
        ],
        model: 'gpt-4',
        temperature: 0
    })

    return response.choices[0].message.content

}