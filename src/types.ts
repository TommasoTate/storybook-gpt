export type Config = {
    componentsPath: string
    storybookPath: string
    excludePaths?: (string | RegExp)[]
}

export interface TsxFileInfo {
    fileName: `${string}.tsx`
    fullPath: string
    segments: string
}

export type RetryOptions = {
    retries: number,
    delayMillis: number
    extraInfo?: string
}

export type PromptOptions = {
    parentFolder: string
}