import { createFromSource } from "fumadocs-core/search/server";
import { source } from "~/lib/source";

/**
 * Use Edge Runtime for CloudFlare Pages compatibility
 */
export const runtime = "edge";

export const { GET } = createFromSource(source);
