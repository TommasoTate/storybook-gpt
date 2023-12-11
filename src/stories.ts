import { TsxFileInfo } from './types'
import { getOpenAiResponse } from './services/openai'
import { mapSeries } from 'bluebird'
import { retryWithExponentialBackoff } from './utils'
import fs from 'fs'
import path from 'path'


const removeFileExtension = (filename: `${string}.tsx`): string => {
    const parts = filename.split('.')
        parts.pop() // Remove the last element (the extension)
        return parts.join('.') // Rejoin the remaining parts
}

const generateStory = async (component: string, componentName: string): Promise<string | null | undefined> => {

 /*return 'import type { Meta, StoryObj } from \'@storybook/react\';\n' +
     'import { Button } from \'./Button\';\n' +
     '\n' +
     'const meta = {\n' +
     '  title: \'Button\',\n' +
     '  component: Button,\n' +
     '} as Meta<typeof >'*/
    // call openai api to generate story
    return retryWithExponentialBackoff(getOpenAiResponse,
        { extraInfo: componentName, delayMillis: 1000, retries: 10 })(component)

}

export const getStories = (components: TsxFileInfo[]) => {
    return mapSeries(components,async component => {
        // read component file
        const componentFile = fs.readFileSync(component.fullPath, 'utf8')
        // generate story
        const story = await generateStory(componentFile, component.fileName)
        // return story
        return {
            segments: component.segments,
            fileName: `${removeFileExtension(component.fileName)}.stories.tsx`,
            content: story
        }
    })
}

export const writeStories = (basePath: string, stories: { fileName: string, content?: string | null, segments?: string }[]) => {
    stories.forEach(story => {
        if(story.segments && !fs.existsSync(path.join(basePath, story.segments))){
            fs.mkdirSync(path.join(basePath, story.segments), { recursive: true })
        }
        // create directory if it doesn't exist
        // create file if it doesn't exist
        const filePath = story.segments ? path.join(basePath, story.segments, story.fileName) : path.join(basePath, story.fileName)
        fs.writeFileSync(filePath, story.content!, { flag: 'w' })
    })
}