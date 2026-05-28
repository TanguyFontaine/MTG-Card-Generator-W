import { FrameLayer } from "./frame_layer";

// ─── Canvas ───────────────────────────────────────────────────────────────────
// All coordinates are in pixels within the full 2923×4000 canvas.

const BASE_PATH = "/frames";
const OUTER_BORDER_LAYER_FILE = "main outer borders.png";
const BACKGROUND_SHADOW_LAYER_FILE = "background shadows.png"

// ─── Z-index layer order ──────────────────────────────────────────────────────
// Stacking order (bottom to top):
//   1  outer border
//   2  color border
//   3  background shadow
//   4  background
//   5  ART_Z_INDEX — card art, rendered separately in card_render.tsx
//   6  legendary crown
//   7  name/type boxes
//   8  PT box
//   9  color indicator
//  10  CARD_UI_Z_INDEX — text and UI elements rendered on top of all frame layers

const Z_OUTER_BORDER      = 1;
const Z_COLOR_BORDER      = 2;
const Z_BG_SHADOW         = 3;
const Z_BACKGROUND        = 4;
export const ART_Z_INDEX  = 5; // Layer 5 to manage full art later, but we'll se how it goes
const Z_LEGENDARY_CROWN   = 6;
const Z_NAME_TYPE_BOX     = 7;
const Z_PT_BOX            = 8;
const Z_COLOR_INDICATOR   = 9;
export const CARD_UI_Z_INDEX = 10;

// ─── Legendary specific layer builders ────────────────────────────────────────

export function makeLegendaryCrownLayer(file: string): FrameLayer
{
   return new FrameLayer(`${BASE_PATH}/legendary crowns/${file}`, 32, 12, 2882, 654, Z_LEGENDARY_CROWN);
}

function makeLegendaryBackgroundShadowLayer(): FrameLayer
{
   return new FrameLayer(`${BASE_PATH}/backgrounds/legendary/${BACKGROUND_SHADOW_LAYER_FILE}`, 113, 89, 2736, 3740, Z_BG_SHADOW);
}

function makeLegendaryBorderLayer(file: string): FrameLayer
{
   return new FrameLayer(`${BASE_PATH}/borders/legendary/${file}`, 70, 70, 2780, 3782, Z_COLOR_BORDER);
}

// ─── Level-up specific layer builders ────────────────────────────────────────

function makeLevelBackgroundLayer(file: string): FrameLayer
{
   return new FrameLayer(`${BASE_PATH}/backgrounds/levels/${file}`, 131, 105, 2710, 3722, Z_BACKGROUND);
}

function makeLevelUpIconsLayer(file: string): FrameLayer
{
   return new FrameLayer(`${BASE_PATH}/boxes/level_up_icons/${file}`, 2660, 80, 2750, 1156, Z_PT_BOX);
}


// ─── Color-specific layer builders ───────────────────────────────────────────

export function makeOuterBorderLayer(): FrameLayer
{
   return new FrameLayer(`${BASE_PATH}/borders/${OUTER_BORDER_LAYER_FILE}`, 0, 0, 2923, 4000, Z_OUTER_BORDER);
}

function makeBaseBackgroundLayer(file: string): FrameLayer
{
   return new FrameLayer(`${BASE_PATH}/backgrounds/${file}`, 131, 105, 2710, 3722, Z_BACKGROUND);
}

export function makeBackgroundLayer(file: string,  isLevelUp: boolean): FrameLayer
{
   if (isLevelUp)
      return makeLevelBackgroundLayer(file);

   return makeBaseBackgroundLayer(file);
}

export function makeBackgroundShadowLayer(isLegendary: boolean): FrameLayer
{
   if (isLegendary)
      return makeLegendaryBackgroundShadowLayer();

   return new FrameLayer(`${BASE_PATH}/backgrounds/${BACKGROUND_SHADOW_LAYER_FILE}`, 113, 89, 2736, 3740, Z_BG_SHADOW);
}

export function makeBorderLayer(file: string, isLegendary: boolean): FrameLayer
{
   if (isLegendary)
      return makeLegendaryBorderLayer(file);

   return new FrameLayer(`${BASE_PATH}/borders/${file}`, 70, 70, 2780, 3782, Z_COLOR_BORDER);
}

export function makeNameTypeBoxLayer(file: string): FrameLayer
{
   return new FrameLayer(`${BASE_PATH}/boxes/name_type/${file}`, 152, 125, 2668, 2412, Z_NAME_TYPE_BOX);
}

function makePTBoxLayer(file: string): FrameLayer
{
   return new FrameLayer(`${BASE_PATH}/boxes/power_toughness/${file}`, 3666, 2277, 555, 296, Z_PT_BOX);
}

export function makeBoxesLayer(file: string, isLevelUp: boolean): FrameLayer
{
   if (isLevelUp)
      return makeLevelUpIconsLayer(file);

   return makePTBoxLayer(file);
}

export function makeColorIndicatorLayer(file: string): FrameLayer
{
   return new FrameLayer(`${BASE_PATH}/color indicators/${file}`, 2376, 176, 129, 129, Z_COLOR_INDICATOR);
}


