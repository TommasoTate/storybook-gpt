import fs from 'fs'
import path from 'path'
import {getOpenAiResponse} from './services/openai'
import { map} from 'bluebird'
import {TsxFileInfo} from './types'


const removeFileExtension = (filename: `${string}.tsx`): string => {
    let parts = filename.split('.')
        parts.pop() // Remove the last element (the extension)
        return parts.join('.') // Rejoin the remaining parts
}

const generateStory = async (component: string): Promise<string | null> => {

   /* const mock = "import type { Meta, StoryObj } from '@storybook/react';\n" +
        "import { Button } from './Button';\n" +
        '\n' +
        'const meta = {\n' +
        "  title: 'Button',\n" +
        '  component: Button,\n' +
        '} as Meta<typeof >'


 return mock*/
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
            content: story
        }
    })
}

export const writeStories = (basePath: string, stories: {fileName: string, content: string | null}[]) => {
    stories.forEach(story => {
        // create directory if it doesn't exist
        if(!fs.existsSync(basePath)){
            fs.mkdirSync(basePath)
        }
        // create file if it doesn't exist
        fs.writeFileSync(path.join(basePath, story.fileName), story.content!, {flag: 'w'})
    })
}