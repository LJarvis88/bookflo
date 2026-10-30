/**
 * Client-side square app-icon generation from an uploaded logo/mark.
 * Production would do this server-side at signup; the prototype keeps the
 * result as a data URL on BrandTokens.appIconUrl.
 */

function parseHex(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "").trim();
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h.padEnd(6, "0").slice(0, 6);
  return {
    r: parseInt(full.slice(0, 2), 16) || 0,
    g: parseInt(full.slice(2, 4), 16) || 0,
    b: parseInt(full.slice(4, 6), 16) || 0,
  };
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not read image"));
    img.src = src;
  });
}

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

/** Pad uploaded mark into a square PWA icon on the brand background. */
export async function makeAppIconDataUrl(
  sourceDataUrl: string,
  backgroundHex: string,
  size = 512,
  padRatio = 0.14,
): Promise<string> {
  const img = await loadImage(sourceDataUrl);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");

  const { r, g, b } = parseHex(backgroundHex || "#0E1420");
  ctx.fillStyle = `rgb(${r},${g},${b})`;
  ctx.fillRect(0, 0, size, size);

  const pad = Math.round(size * padRatio);
  const maxW = size - pad * 2;
  const maxH = size - pad * 2;
  const scale = Math.min(maxW / img.width, maxH / img.height);
  const w = Math.round(img.width * scale);
  const h = Math.round(img.height * scale);
  const x = Math.floor((size - w) / 2);
  const y = Math.floor((size - h) / 2);
  ctx.drawImage(img, x, y, w, h);

  return canvas.toDataURL("image/png");
}

export async function processLogoUpload(
  file: File,
  backgroundHex: string,
): Promise<{ logoUrl: string; appIconUrl: string }> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please upload an image file (PNG, JPG, SVG, WebP).");
  }
  if (file.size > 4 * 1024 * 1024) {
    throw new Error("Keep the logo under 4 MB for this prototype.");
  }
  const logoUrl = await readFileAsDataUrl(file);
  const appIconUrl = await makeAppIconDataUrl(logoUrl, backgroundHex);
  return { logoUrl, appIconUrl };
}
