import { defineConfig } from "tsup";
import { readdir, writeFile, readFile } from "node:fs/promises";
import { join } from "node:path";

const OUT_DIR = "bookmarklets";

export default defineConfig((overrideOptions) => ({
  entry: ["src/*.ts"],
  minify: true,
  minifyWhitespace: false,
  minifyIdentifiers: false,
  minifySyntax: false,
  format: "iife", // Forces browser to not interpret as HTML output
  outDir: OUT_DIR,
  clean: true,
  /**
   * Prepends `javascript:` to the output files. Ideally, I would use `banner`
   * but that results in a newline chracter.
   */
  onSuccess: async () => {
    const javascriptFiles = (
      await readdir(OUT_DIR, { withFileTypes: true })
    ).filter((dirent) => dirent.isFile() && dirent.name.endsWith(".js"));

    await Promise.all(
      javascriptFiles.map(async ({ parentPath, name }) => {
        const filePath = join(parentPath, name);
        const fileContent = await readFile(filePath, "utf-8");

        return writeFile(filePath, `javascript:${fileContent}`);
      }),
    );
  },
  ...overrideOptions,
}));
