import { Frame } from "../classes/frame";
import { FrameLayer } from "../classes/frame_layer";
import { CardState } from "../contexts/card_state";
import { ManaCostObj } from "../classes/mana_cost";
import { CardTypeObj } from "../classes/card_type";
import { CardColor, SYMBOL_TO_COLORS } from "../classes/card_color";
import {
   makeOuterBorderLayer,
   makeBackgroundLayer,
   makeBackgroundShadowLayer,
   makeBorderLayer,
   makeNameTypeBoxLayer,
   makePtBoxLayer,
   makeColorIndicatorLayer,
   makeLegendaryCrownLayer,
} from "./frame_layers";
import { WUBRG_ORDER } from "./frame_utilities";

/*****************************************************************************
 * Frame resolver
 *
 * Determines which PNG layers to use for a card's frame based on the card's
 * data (type line, mana cost, power/toughness).
 *
 * The assembly order (bottom-to-top, matching z-index values in frame_layers.ts):
 *   1. Outer border        (color-independent)
 *   2. Color border        (color-dependent)
 *   3. Card art            (rendered separately, ART_Z_INDEX = 3)
 *   4. Background shadow   (color-independent)
 *   5. Color background    (color-dependent)
 *   6. Legendary crown     (legendary cards only)
 *   7. Name/type boxes     (color-dependent)
 *   8. PT box              (color-dependent, creatures only)
 *   9. Color indicator     (optional)
 *****************************************************************************/

/**
 * Returns the unique card colors present in the mana cost, in WUBRG order.
 * This is the public entry point for color identity from a mana cost.
 */
export function getCardColors(manaCost: ManaCostObj): CardColor[]
{
   const seen: Partial<Record<CardColor, true>> = {};

   manaCost.otherManaSymbols.forEach(symbol =>
   {
      const colors = SYMBOL_TO_COLORS[symbol] ?? [];
      colors.forEach(color => { seen[color] = true; });
   });

   return WUBRG_ORDER.filter(color => seen[color]);
}

// ─── File lookup tables ───────────────────────────────────────────────────────

const MONO_COLOR_FILES: Record<CardColor, string> = {
   [CardColor.White]:     "white.png",
   [CardColor.Blue]:      "blue.png",
   [CardColor.Black]:     "black.png",
   [CardColor.Red]:       "red.png",
   [CardColor.Green]:     "green.png",
};

/**
 * Hybrid file names, keyed by sorted pair of CardColor enum values.
 * Sort order follows the enum (Colorless=0, White=1, Blue=2, Black=3, Red=4, Green=5).
 */
const HYBRID_FILES: { [key: string]: string } = {
   [`${CardColor.White}_${CardColor.Blue}`]:  "H white-blue.png",
   [`${CardColor.White}_${CardColor.Black}`]: "H white-black.png",
   [`${CardColor.White}_${CardColor.Red}`]:   "H red-white.png",
   [`${CardColor.White}_${CardColor.Green}`]: "H green-white.png",
   [`${CardColor.Blue}_${CardColor.Black}`]:  "H blue-black.png",
   [`${CardColor.Blue}_${CardColor.Red}`]:    "H blue-red.png",
   [`${CardColor.Blue}_${CardColor.Green}`]:  "H green-blue.png",
   [`${CardColor.Black}_${CardColor.Red}`]:   "H black-red.png",
   [`${CardColor.Black}_${CardColor.Green}`]: "H black-green.png",
   [`${CardColor.Red}_${CardColor.Green}`]:   "H red-green.png",
};

function getHybridFile(colors: CardColor[]): string
{
   const sorted = [colors[0], colors[1]].sort((a, b) => a - b);
   return HYBRID_FILES[`${sorted[0]}_${sorted[1]}`] ?? "gold.png";
}

// ─── Color indicator file lookup ─────────────────────────────────────────────

// Maps a canonical color key (CardColor enum values sorted and joined) to the color indicator base filename (without extension).
const COLOR_INDICATOR_FILES: { [key: string]: string } = {
   // 1 color
   "0": "W",       "1": "U",       "2": "B",       "3": "R",       "4": "G",
   // 2 colors
   "01": "WU",    "02": "WB",    "03": "RW",    "04": "GW",
   "12": "UB",    "13": "UR",    "14": "GU",
   "23": "BR",    "24": "BG",    "34": "RG",
   // 3 colors
   "012": "UBW",  "013": "URW",  "014": "WUG",  "023": "RWB",  "024": "WBG",
   "034": "WRG",  "123": "BRU",  "124": "BGU",  "134": "GUR",  "234": "RGB",
   // 4 colors
   "0123": "BWRU", "0124": "GWUB", "0134": "RUGW", "0234": "RWBG", "1234": "BGRU",
   // 5 colors
   "01234": "WBGUR",
};

// Sort the card's colors and retrieve the corresponding color indicator file, if any.
function resolveColorIndicatorFile(colors: CardColor[]): string
{
   const key = Array.from(colors).sort((a, b) => a - b).join("");
   const baseName = COLOR_INDICATOR_FILES[key];
   return baseName ? `${baseName}.png` : "";
}

// ─── Per-layer file resolution ────────────────────────────────────────────────

function resolveBorderFile(cardType: CardTypeObj, cardColors: CardColor[], manaCost: ManaCostObj,
                           withVehicleFrame: boolean, withOverride: boolean): string
{
   let fileName: string = "";

   if (withVehicleFrame)
      fileName = "vehicle.png";
   else if (cardType.types.includes("Artifact"))
      fileName = "artifact.png";
   else if (cardColors.length === 0 )
      fileName = "colourless.png";
   else if (cardColors.length === 1)
      fileName = MONO_COLOR_FILES[cardColors[0]];
   else if (cardColors.length === 2 && (manaCost.isHybridTwoColors() || withOverride))
      fileName = getHybridFile(cardColors);
   else
      fileName = "gold.png";

   return fileName;
}

function resolveBackgroundFile(cardType: CardTypeObj, cardColors: CardColor[]): string
{
   let fileName: string = "";

   // for the background, we want the hybrid file as long as there are exactly 2 colors, highest priority
   if (cardColors.length === 2)
      fileName = getHybridFile(cardColors)
   else if (cardColors.length === 1)
      fileName = MONO_COLOR_FILES[cardColors[0]];
   else if (cardColors.length > 2)
      fileName = "gold.png";
   else if (cardType.types.includes("Artifact"))
      fileName = "artifact.png";
   else
      fileName = "colourless.png";

   return fileName;
}

function resolveLegendaryCrownFile(cardType: CardTypeObj, cardColors: CardColor[]): string
{
   // Legendary crown should match the background color
   return resolveBackgroundFile(cardType, cardColors);
}

function resolveNameTypeBoxFile(cardType: CardTypeObj, cardColors: CardColor[], manaCost: ManaCostObj, withOverride: boolean): string
{
   let fileName: string = "";

   if (cardColors.length === 1)
      fileName = MONO_COLOR_FILES[cardColors[0]];
   else if (cardColors.length > 1 && !manaCost.isHybridTwoColors() && !withOverride )
      fileName = "gold.png";
   else if (cardType.types.includes("Land"))
      fileName = "land.png";
   else if (cardType.types.includes("Artifact"))
      fileName = "artifact.png";
   else
      fileName = "colourless.png";

   return fileName;
}

function resolvePtBoxFile(cardType: CardTypeObj, cardColors: CardColor[],
   manaCost: ManaCostObj, withVehicleFrame: boolean, withOverride: boolean): string
{
   let fileName: string = "";

   if (withVehicleFrame)
      fileName = "vehicle.png";
   else if (cardColors.length === 1)
      fileName = MONO_COLOR_FILES[cardColors[0]];
   else if (cardColors.length > 1 && !manaCost.isHybridTwoColors() && !withOverride)
      fileName = "gold.png";
   else if (cardType.types.includes("Land"))
      fileName = "land.png";
   else if (cardType.types.includes("Artifact"))
      fileName = "artifact.png";
   else
      fileName = "colourless.png";

   return fileName;
}

function addMandatoryLayer(layers: FrameLayer[], layer: FrameLayer): void
{
   layers.push(layer);
}
function addOptionalLayer(layers: FrameLayer[], condition: boolean, layer: FrameLayer): void
{
   if (condition)
      layers.push(layer);
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Builds the complete Frame for a card from its CardState.
 * The PT box layer is only included when the card has power/toughness values.
 */
export function resolveFrame(cardState: CardState): Frame
{
   const { cardType, manaCost, power, toughness, frameColorOverride, withVehicleFrame, withColorIndicator } = cardState;
   const cardColors = frameColorOverride ?? getCardColors(manaCost);
   const withOverride = frameColorOverride !== null;
   const hasPT = power !== "" || toughness !== "";
   const isLegendary = cardType.isLegendary();

   // All frame layers — z-index values on each FrameLayer control the stacking order.
   // The card art is rendered separately at ART_Z_INDEX (= 5) in card_render.tsx.
   const layers: FrameLayer[] = [];
   addMandatoryLayer(layers, makeOuterBorderLayer());
   addMandatoryLayer(layers, makeBorderLayer(resolveBorderFile(cardType, cardColors, manaCost, withVehicleFrame, withOverride), isLegendary));
   addMandatoryLayer(layers, makeBackgroundShadowLayer(isLegendary));
   addMandatoryLayer(layers, makeBackgroundLayer(resolveBackgroundFile(cardType, cardColors)));
   addOptionalLayer(layers, isLegendary, makeLegendaryCrownLayer(resolveLegendaryCrownFile(cardType, cardColors)));
   addMandatoryLayer(layers, makeNameTypeBoxLayer(resolveNameTypeBoxFile(cardType, cardColors, manaCost, withOverride)));
   addOptionalLayer(layers, hasPT, makePtBoxLayer(resolvePtBoxFile(cardType, cardColors, manaCost, withVehicleFrame, withOverride)));
   addOptionalLayer(layers, withColorIndicator && frameColorOverride !== null,
                    makeColorIndicatorLayer(resolveColorIndicatorFile(cardColors)));

   return new Frame(layers);
}
