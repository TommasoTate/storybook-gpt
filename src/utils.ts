import { Config, RetryOptions, TsxFileInfo } from './types'
import { Options, lilconfig } from 'lilconfig'
import fs from 'fs'
import path from 'path'

export const readComponentsFolder = (dirPath: string, excludePaths?: (string | RegExp)[]): TsxFileInfo[] => {

    const reducer = (accumulator: TsxFileInfo[], file: string) => {
        // Exclude subfolders matching the excludePaths
        if (excludePaths && excludePaths.some((excludePath) => (typeof excludePath === 'string' ? new RegExp(excludePath) : excludePath).test(file))) {
            return accumulator
        }
        const filePath = path.join(dirPath, file)
        const stat = fs.statSync(filePath)

        if (stat.isDirectory()) {
            // Recursively search in non-excluded subdirectories and combine with current accumulator
            return [...accumulator, ...readComponentsFolder(filePath, excludePaths)]
        }
        if (files.includes('index.tsx')) {
            // Remove the first and last segments (the components folder and the file name)
            // and return the parent folder name as the file name
            const segments = dirPath.split('/')
            const parentFolder = segments.slice(-1)
            return [{
                fileName: `${parentFolder}.tsx`as const,
                fullPath: path.join(dirPath, 'index.tsx'),
                segments: path.join(...segments.slice(1, -1))
            }]
    
        }
        if (file.endsWith('.tsx')) {
            const segments = filePath.split('/')
            // Return accumulator with new .tsx file info added
            return [...accumulator, {
                fileName: file,
                // Remove the first and last segments (the components folder and the file name)
                segments: segments.length < 3 ? null : path.join(...filePath.split('/').slice(1, -1)),
                fullPath: filePath
            }] as TsxFileInfo[]
        }

        return accumulator
    }
    const files = fs.readdirSync(dirPath)


    return files.reduce<TsxFileInfo[]>(reducer, [])

    
}
const options: Options = {
    searchPlaces: ['storybook-gpt.config.json']
}
export const getConfig = async (): Promise<Config> => {
    const explorer = lilconfig('storybook-gpt', options)

    const result = await explorer.search()

    return result?.config
}

export const retryWithExponentialBackoff = <T, Args extends string[]>(fn: (...args: Args) => Promise<T | undefined>, options: RetryOptions ) => async (...args: Args): Promise<T | undefined> =>  {
    const { retries, delayMillis, extraInfo } = options
    const retry = async (retries: number, attempts: number): Promise<T | undefined>=> {
        try {
            // Try executing the function with the provided arguments
            console.log(`Attempt ${attempts} of ${retries} with args ${extraInfo}`)
            return await fn(...args)
        } catch (error) {
            // Check for the specific error and retry count

            // @ts-expect-error code property is not defined on Error
            if (error.code === 'rate_limit_exceeded' && retries > 0) {
                // Wait for an exponential amount of time
                console.log(`Rate limit exceeded. Waiting ${Math.pow(2, attempts - 1) * delayMillis}ms before retrying...`)
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempts - 1) * delayMillis))
                // Recursive call with incremented attempt count
                return retry(retries - 1, attempts + 1)
            } else {
                // If not the specific error or retry count exceeded, rethrow the error
                console.log(`Error: ${error}`)
            }
        }
    }
    return retry(retries, 1)
}


