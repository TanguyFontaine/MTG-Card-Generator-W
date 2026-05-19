import { Frame } from "../classes/frame";
import { FrameLayer } from "../classes/frame_layer";
import { CardState } from "../contexts/card_state";
import { ManaCostObj } from "../classes/mana_cost";
import { CardTypeObj } from "../classes/card_type";
import { CardColor, SYMBOL_TO_COLORS } from "../classes/card_color";
import {
   OUTER_BORDER_LAYER,
   BACKGROUND_SHADOW_LAYER,
   makeBackgroundLayer,
   makeBorderLayer,
   makeNameTypeBoxLayer,
   makePtBoxLayer,
} from "./frame_layers";

/*****************************************************************************
 * Frame resolver
 *
 * Determines which PNG layers to use for a card's frame based on the card's
 * data (type line, mana cost, power/toughness).
 *
 * The assembly order is bottom-to-top:
 *   1. Outer border        (color-independent)
 *   2. Color border        (color-dependent)
 *   3. Background shadow   (color-independent)
 *   4. Color background    (color-dependent)
 *   5. Name/type boxes     (color-dependent)
 *   6. PT box              (color-dependent, creatures only)
 *****************************************************************************/

/** WUBRG order — used to return colors in a stable, canonical order. */
const WUBRG_ORDER = [
   CardColor.White,
   CardColor.Blue,
   CardColor.Black,
   CardColor.Red,
   CardColor.Green,
];

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

// ─── Per-layer file resolution ────────────────────────────────────────────────

function resolveBorderFile(cardType: CardTypeObj, cardColors: CardColor[], manaCost: ManaCostObj,
                           usesVehicleFrame: boolean, withOverride: boolean): string
{
   let fileName: string = "";

   if (usesVehicleFrame)
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
   manaCost: ManaCostObj, usesVehicleFrame: boolean, withOverride: boolean): string
{
   let fileName: string = "";

   if (usesVehicleFrame)
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

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Builds the complete Frame for a card from its CardState.
 * The PT box layer is only included when the card has power/toughness values.
 */
export function resolveFrame(cardState: CardState): Frame
{
   const { cardType, manaCost, power, toughness, frameColorOverride, usesVehicleFrame } = cardState;
   const cardColors = frameColorOverride ?? getCardColors(manaCost);
   const withOverride = frameColorOverride !== null;

   const layersBeforeArt: FrameLayer[] = [
      OUTER_BORDER_LAYER,
      makeBorderLayer(resolveBorderFile(cardType, cardColors, manaCost, usesVehicleFrame, withOverride)),
   ];

   const layersAfterArt: FrameLayer[] = [
      BACKGROUND_SHADOW_LAYER,
      makeBackgroundLayer(resolveBackgroundFile(cardType, cardColors)),
      makeNameTypeBoxLayer(resolveNameTypeBoxFile(cardType, cardColors, manaCost, withOverride)),
   ];

   const hasPT = power !== "" || toughness !== "";
   if (hasPT)
   {
      layersAfterArt.push(makePtBoxLayer(resolvePtBoxFile(cardType, cardColors, manaCost, usesVehicleFrame, withOverride)));
   }

   return new Frame(layersBeforeArt, layersAfterArt);
}
