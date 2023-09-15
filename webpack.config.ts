import webpack from "webpack";
import path from "path";
import { buildWebpackConfig } from "./config/build/buildWebpackConfig";
import { BuildPaths, IBuildEnv } from "./config/build/types/config";

export default (env: IBuildEnv) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    build: path.resolve(__dirname, "build"),
  };

  const mode = env.mode || "development";
  const isDev = mode === "development";
  const PORT = env.port || 3000;

  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    isDev,
    port: PORT,
  });

  return config;
};
