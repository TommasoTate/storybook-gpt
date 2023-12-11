import fs from 'fs';
import path from 'path';

export interface TsxFileInfo {
    fileName: `${string}.tsx`
    fullPath: string
}

export const buildComponentTree = (dirPath: string): TsxFileInfo[] => {
    const files = fs.readdirSync(dirPath)

    return files.reduce<TsxFileInfo[]>((accumulator, file) => {
        const filePath = path.join(dirPath, file)
        const stat = fs.statSync(filePath)

        if (stat.isDirectory()) {
            // Recursively search in subdirectories and combine with current accumulator
            return [...accumulator, ...buildComponentTree(filePath)]
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
