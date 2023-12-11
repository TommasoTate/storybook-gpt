import { Config, TsxFileInfo } from './types'
import { Options, lilconfig } from 'lilconfig'
import fs from 'fs'
import path from 'path'

export const readComponentsFolder = (dirPath: string): TsxFileInfo[] => {
    const files = fs.readdirSync(dirPath)

    return files.reduce<TsxFileInfo[]>((accumulator, file) => {
        const filePath = path.join(dirPath, file)
        const stat = fs.statSync(filePath)

        if (stat.isDirectory()) {
            // Recursively search in subdirectories and combine with current accumulator
            return [...accumulator, ...readComponentsFolder(filePath)]
        }
        if (file.endsWith('.tsx')) {
            // Return accumulator with new .tsx file info added
            return [...accumulator, {
                fileName: file,
                fullPath: filePath
            }] as TsxFileInfo[]
        }

        return accumulator
    }, [])
}
const options: Options = {
    searchPlaces: ['storybook-gpt.config.json']
}
export const getConfig = async (): Promise<Config> => {
    const explorer = lilconfig('storybook-gpt', options)

    const result = await explorer.search()

    return result?.config
}

export const retryWithExponentialBackoff = <T, Args extends string>(fn: (args: Args) => Promise<T>, retries = 10, delayMillis = 1000) => async (args: Args): Promise<T> =>  {
    // This is the function that will be returned
    try {
        // Try executing the function with the provided arguments
        return await fn(args)
    } catch (error) {
        // Check for the specific error and retry count

        // @ts-expect-error code property is not defined on Error
        if (error.code === 'rate_limit_exceeded' && retries > 0) {
            // Wait for an exponential amount of time
            await new Promise(resolve => setTimeout(resolve, delayMillis))
            // Recursive call with incremented attempt count
            return retryWithExponentialBackoff(fn, retries - 1, 2 * delayMillis)(args)
        } else {
            // If not the specific error or retry count exceeded, rethrow the error
            throw error
        }
    }
}


