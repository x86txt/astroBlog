import { readFileSync } from "node:fs";
import { join } from "node:path";
import { initWasm, Resvg } from "@resvg/resvg-wasm";
import { type CollectionEntry } from "astro:content";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";
import tagOgImage from "./og-templates/tag";

let wasmInitialized = false;

async function initializeWasm() {
  if (wasmInitialized) return;
  try {
    const wasmPath = join(process.cwd(), "node_modules/@resvg/resvg-wasm/index_bg.wasm");
    await initWasm(readFileSync(wasmPath));
    wasmInitialized = true;
  } catch (error) {
    console.error("Failed to initialize resvg-wasm:", error);
    throw error;
  }
}

async function svgBufferToPngBuffer(svg: string) {
  await initializeWasm();
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function generateOgImageForPost(post: CollectionEntry<"blog">) {
  const svg = await postOgImage(post);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await siteOgImage();
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForTag(tagName: string) {
  const svg = await tagOgImage(tagName);
  return svgBufferToPngBuffer(svg);
}

