import {getConfig} from './searchConfig'
import {buildComponentTree} from './buildComponentTree'

export const generateStories = async () => {
    // Read config
    const config = await getConfig()

    // Read components folders

    const tree = buildComponentTree(config.componentsPath)
    console.log(tree)

    // Generate stories

    // Write stories
}