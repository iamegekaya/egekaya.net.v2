import { readFileSync } from "node:fs";

/**
 * Read a JPEG's pixel dimensions from its header.
 *
 * Build-time only — this walks the file with node:fs and must never be imported
 * into a client component.
 *
 * The masonry layout needs each photo's aspect ratio before render, and the
 * alternative was another dependency for one 30-line header walk. Only JPEG is
 * handled because that is what the portfolio folder contains; anything else
 * returns null and the caller falls back.
 */
export type JpegSize = { width: number; height: number };

// Start-of-frame markers. These are the ones that carry dimensions; the gaps
// (C4, C8, CC) are Huffman table, JPEG extension, and arithmetic coding.
const SOF_MARKERS = new Set([
  0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf,
]);

export function readJpegSize(filePath: string): JpegSize | null {
  let buffer: Buffer;

  try {
    buffer = readFileSync(filePath);
  } catch {
    return null;
  }

  // SOI
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;

  let offset = 2;

  while (offset < buffer.length - 1) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];
    offset += 2;

    // Padding and standalone markers carry no length field.
    if (marker === 0xff || (marker >= 0xd0 && marker <= 0xd9) || marker === 0x01) continue;

    if (offset + 1 >= buffer.length) return null;
    const segmentLength = buffer.readUInt16BE(offset);

    if (SOF_MARKERS.has(marker)) {
      // [length:2][precision:1][height:2][width:2]
      if (offset + 7 > buffer.length) return null;
      return {
        height: buffer.readUInt16BE(offset + 3),
        width: buffer.readUInt16BE(offset + 5),
      };
    }

    if (segmentLength < 2) return null;
    offset += segmentLength;
  }

  return null;
}
