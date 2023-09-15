export type BuildMode = "production" | "development";

export interface BuildPaths {
  entry: string;
  build: string;
}

export interface IBuildOptions {
  mode: BuildMode;
  paths: BuildPaths;
  isDev: boolean;
}
