const BASE_PATH = "/frames";

export const OUTER_BORDER_PATH = `${BASE_PATH}/borders/main outer borders .png`;
export const BACKGROUND_SHADOW_PATH = `${BASE_PATH}/backgrounds/background shadows.png`;

export interface FrameLayers
{
   background: string;
   border: string;
   nameTypeBox: string;
   ptBox: string;
}

function makeLayers(
   backgroundFile: string,
   borderFile: string,
   nameTypeBoxFile: string,
   ptBoxFile: string,
): FrameLayers
{
   return {
      background: `${BASE_PATH}/backgrounds/${backgroundFile}`,
      border: `${BASE_PATH}/borders/${borderFile}`,
      nameTypeBox: `${BASE_PATH}/boxes/name_type/${nameTypeBoxFile}`,
      ptBox: `${BASE_PATH}/boxes/power_toughness/${ptBoxFile}`,
   };
}

// Hybrid cards share the gold (multicolor) name/type and PT boxes,
// since no hybrid-specific box variants exist.
const HYBRID_BOXES: [string, string] = ["colourless.png", "colourless.png"];

export const frames: Record<string, FrameLayers> = {
   "Colorless":          makeLayers("colourless.png",    "colourless.png",    "colourless.png", "colourless.png"),
   "White":              makeLayers("white.png",          "white.png",         "white.png",      "white.png"),
   "Blue":               makeLayers("blue.png",           "blue.png",          "blue.png",       "blue.png"),
   "Black":              makeLayers("black.png",          "black.png",         "black.png",      "black.png"),
   "Red":                makeLayers("red.png",            "red.png",           "red.png",        "red.png"),
   "Green":              makeLayers("green.png",          "green.png",         "green.png",      "green.png"),
   "Gold":               makeLayers("gold.png",           "gold.png",          "gold.png",       "gold.png"),
   "Artifact":           makeLayers("artifact.png",       "artifact.png",      "artifact.png",   "artifact.png"),
   "Land":               makeLayers("colourless.png",     "colourless.png",    "land.png",       "land.png"),
   "Vehicle":            makeLayers("artifact.png",       "vehicle.png",       "artifact.png",   "vehicle.png"),
   "Hybrid White/Blue":  makeLayers("H white-blue.png",   "H white-blue.png",  ...HYBRID_BOXES),
   "Hybrid White/Black": makeLayers("H white-black.png",  "H white-black.png", ...HYBRID_BOXES),
   "Hybrid Red/White":   makeLayers("H red-white.png",    "H red-white.png",   ...HYBRID_BOXES),
   "Hybrid Red/Green":   makeLayers("H red-green.png",    "H red-green.png",   ...HYBRID_BOXES),
   "Hybrid Green/Blue":  makeLayers("H green-blue.png",   "H green-blue.png",  ...HYBRID_BOXES),
   "Hybrid Green/White": makeLayers("H green-white.png",  "H green-white.png", ...HYBRID_BOXES),
   "Hybrid Blue/Black":  makeLayers("H blue-black.png",   "H blue-black.png",  ...HYBRID_BOXES),
   "Hybrid Blue/Red":    makeLayers("H blue-red.png",     "H blue-red.png",    ...HYBRID_BOXES),
   "Hybrid Black/Red":   makeLayers("H black-red.png",    "H black-red.png",   ...HYBRID_BOXES),
   "Hybrid Black/Green": makeLayers("H black-green.png",  "H black-green.png", ...HYBRID_BOXES),
   // Backwards-compatibility aliases for cards saved with old frame names
   "Golden":             makeLayers("gold.png",           "gold.png",          "gold.png",       "gold.png"),
   "Grey":               makeLayers("artifact.png",       "artifact.png",      "artifact.png",   "artifact.png"),
};
