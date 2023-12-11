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