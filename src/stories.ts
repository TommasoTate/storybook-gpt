import {TsxFileInfo} from './buildComponentTree'
import fs from 'fs'


const removeFileExtension = (filename: `${string}.tsx`): string => {
    let parts = filename.split('.')
        parts.pop(); // Remove the last element (the extension)
        return parts.join('.'); // Rejoin the remaining parts
}

const generateStory = (component: string): string => {

    // call openai api to generate story
    return `mock story for ${component}`

}

export const getStories = (components: TsxFileInfo[]) => {
    return components.map(component => {
        // read component file
        const componentFile = fs.readFileSync(component.fullPath, 'utf8')
        // generate story
        const story = generateStory(componentFile)
        // return story
        return {
            fileName: `${removeFileExtension(component.fileName)}.stories.tsx`,
            story
        }
    })
}