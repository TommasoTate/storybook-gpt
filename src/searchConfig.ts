import {lilconfig, Options} from 'lilconfig'
import {Config} from './types'

const options: Options = {
    searchPlaces: ['storybook-gpt.config.json']
}

export const getConfig = async () : Promise<Config> => {
    const explorer = lilconfig('storybook-gpt', options)

    const result = await explorer.search()

    return result?.config
}

