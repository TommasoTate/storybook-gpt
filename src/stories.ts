import {TsxFileInfo} from './buildComponentTree'
import fs from 'fs'
import {getOpenAiResponse} from './openai'
import { map} from 'bluebird'


const removeFileExtension = (filename: `${string}.tsx`): string => {
    let parts = filename.split('.')
        parts.pop(); // Remove the last element (the extension)
        return parts.join('.'); // Rejoin the remaining parts
}

const generateStory = async (component: string): Promise<string | null> => {

    // call openai api to generate story
    return getOpenAiResponse(component)

}

export const getStories = (components: TsxFileInfo[]) => {
    return map(components,async component => {
        // read component file
        const componentFile = fs.readFileSync(component.fullPath, 'utf8')
        // generate story
        const story = await generateStory(componentFile)
        // return story
        return {
            fileName: `${removeFileExtension(component.fileName)}.stories.tsx`,
            story
        }
    })
}