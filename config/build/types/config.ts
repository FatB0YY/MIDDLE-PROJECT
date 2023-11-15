export type BuildMode = 'production' | 'development'

export interface BuildPaths {
  entry: string
  build: string
  html: string
  public: string
  src: string
}

export interface IBuildEnv {
  mode: BuildMode
  port: number
  apiUrl: string
}

export interface IBuildOptions {
  mode: BuildMode
  paths: BuildPaths
  isDev: boolean
  isProd: boolean
  port: number
  apiUrl: string
  project: 'sb' | 'client' | 'jest'
}
