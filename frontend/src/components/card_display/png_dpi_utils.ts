// Utility for injecting DPI metadata into PNG files via the pHYs chunk.
//
// PNG files have no inherent DPI — without this chunk, printing software defaults
// to 96 DPI and renders the card at the wrong physical size. Injecting a pHYs chunk
// tells any conformant application (Photoshop, GIMP, Word, print services...) the
// intended pixels-per-unit, so the card prints at exactly 63×88 mm (2.5×3.5 in).

/***************************************************************/

const PNG_SIGNATURE_LENGTH = 8;
const IHDR_CHUNK_LENGTH = 25; // 4 (length field) + 4 (type) + 13 (data) + 4 (CRC)
// pHYs must be inserted right after IHDR, before any image data
const PHYS_INSERT_OFFSET = PNG_SIGNATURE_LENGTH + IHDR_CHUNK_LENGTH;

const PHYS_CHUNK_PAYLOAD_LENGTH = 9; // 4 (X ppu) + 4 (Y ppu) + 1 (unit)
const PHYS_CHUNK_TOTAL_LENGTH = 4 + 4 + PHYS_CHUNK_PAYLOAD_LENGTH + 4; // length + type + payload + CRC
const UNIT_METER = 1;

/***************************************************************/

// CRC32 lookup table using the standard PNG polynomial (ISO 3309)
const CRC32_TABLE: Uint32Array = buildCrc32Table();

function buildCrc32Table(): Uint32Array
{
   const table = new Uint32Array(256);
   for (let i = 0; i < 256; i++)
   {
      let c = i;
      for (let k = 0; k < 8; k++)
      {
         c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      }
      table[i] = c;
   }
   return table;
}

function crc32(data: Uint8Array): number
{
   let crc = 0xFFFFFFFF;
   for (let i = 0; i < data.length; i++)
   {
      crc = CRC32_TABLE[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8);
   }
   return (crc ^ 0xFFFFFFFF) >>> 0;
}

function writeUint32BE(buffer: Uint8Array, offset: number, value: number): void
{
   buffer[offset]     = (value >>> 24) & 0xFF;
   buffer[offset + 1] = (value >>> 16) & 0xFF;
   buffer[offset + 2] = (value >>> 8)  & 0xFF;
   buffer[offset + 3] =  value         & 0xFF;
}

/***************************************************************/

/**
 * Decodes a base64 PNG data URL into a raw Uint8Array.
 */
export function dataUrlToUint8Array(dataUrl: string): Uint8Array
{
   const base64 = dataUrl.split(",")[1];
   const binaryString = atob(base64);
   const bytes = new Uint8Array(binaryString.length);
   for (let i = 0; i < binaryString.length; i++)
   {
      bytes[i] = binaryString.charCodeAt(i);
   }
   return bytes;
}

/**
 * Injects a pHYs chunk into a PNG binary to embed DPI metadata.
 * The chunk is inserted right after the IHDR chunk, as required by the PNG spec.
 * @param pngData - Raw PNG binary as Uint8Array
 * @param dpi - Desired resolution in dots per inch (e.g. 375 for a standard MTG card)
 * @returns New Uint8Array with the pHYs chunk inserted
 */
export function injectPngDpi(pngData: Uint8Array, dpi: number): Uint8Array
{
   const pixelsPerMeter = Math.round(dpi / 0.0254);

   const physChunk = new Uint8Array(PHYS_CHUNK_TOTAL_LENGTH);

   // Length field: number of payload bytes
   writeUint32BE(physChunk, 0, PHYS_CHUNK_PAYLOAD_LENGTH);

   // Chunk type: ASCII "pHYs"
   physChunk[4] = 0x70; // p
   physChunk[5] = 0x48; // H
   physChunk[6] = 0x59; // Y
   physChunk[7] = 0x73; // s

   // Pixels per unit X and Y
   writeUint32BE(physChunk, 8, pixelsPerMeter);
   writeUint32BE(physChunk, 12, pixelsPerMeter);

   // Unit specifier: 1 = meter
   physChunk[16] = UNIT_METER;

   // CRC32 over type + payload bytes (indices 4 to 16 inclusive)
   const crc = crc32(physChunk.subarray(4, 17));
   writeUint32BE(physChunk, 17, crc);

   // Assemble final PNG: [signature + IHDR] + [pHYs] + [rest of PNG]
   const result = new Uint8Array(pngData.length + PHYS_CHUNK_TOTAL_LENGTH);
   result.set(pngData.subarray(0, PHYS_INSERT_OFFSET), 0);
   result.set(physChunk, PHYS_INSERT_OFFSET);
   result.set(pngData.subarray(PHYS_INSERT_OFFSET), PHYS_INSERT_OFFSET + PHYS_CHUNK_TOTAL_LENGTH);

   return result;
}
