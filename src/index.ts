import { getConfig, readComponentsFolder } from './utils'
import { getStories, writeStories } from './stories'

export const generateStories = async () => {
    // Read config
    const config = await getConfig()

    // Read components folders

    const tree = readComponentsFolder(config.components, config.exclude)

    // Generate stories
   const stories = await getStories(tree)

    // Write stories under storybookPath
    console.log('Writing stories...', config.stories)
    writeStories(config.stories, stories)

}