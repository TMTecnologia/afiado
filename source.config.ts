import { defineConfig, defineDocs } from "fumadocs-mdx/config";

// Options: https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
  dir: "docs",
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
