import fs from "fs";
import path from "path";

async function loadGoogleFonts(): Promise<
  Array<{ name: string; data: ArrayBuffer; weight: number; style: string }>
> {
  const regularPath = path.resolve("./src/assets/fonts/geist-sans-regular.ttf");
  const boldPath = path.resolve("./src/assets/fonts/geist-sans-bold.ttf");
  const regularData = fs.readFileSync(regularPath);
  const boldData = fs.readFileSync(boldPath);

  return [
    { name: "Geist", data: regularData.buffer, weight: 400, style: "normal" },
    { name: "Geist", data: regularData.buffer, weight: 600, style: "normal" },
    { name: "Geist", data: boldData.buffer, weight: 700, style: "normal" },
    { name: "Geist", data: boldData.buffer, weight: 900, style: "normal" },
  ];
}

export default loadGoogleFonts;
