import {getConfig} from './searchConfig'
import {buildComponentTree} from './buildComponentTree'
import {getStories, writeStories} from './stories'

export const generateStories = async () => {
    // Read config
    const config = await getConfig()

    // Read components folders

    const tree = buildComponentTree(config.componentsPath)

    // Generate stories
    const stories = await getStories(tree)
    console.log(stories)

    // Write stories under storybookPath
    console.log('Writing stories...', config.storybookPath)
    writeStories(config.storybookPath, stories)

}