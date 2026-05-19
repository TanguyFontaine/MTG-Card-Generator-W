import { FrameLayer } from "./frame_layer";

// ─── Canvas ───────────────────────────────────────────────────────────────────
// All coordinates are in pixels within the full 2923×4000 canvas.

const BASE_PATH = "/frames";

// ─── Shared layers (color-independent) ───────────────────────────────────────

export const OUTER_BORDER_LAYER = new FrameLayer(
   `${BASE_PATH}/borders/main outer borders .png`,
   0, 0, 2923, 4000,
);

export const BACKGROUND_SHADOW_LAYER = new FrameLayer(
   `${BASE_PATH}/backgrounds/background shadows.png`,
   113, 89, 2736, 3740,
);

// ─── Color-specific layer builders ───────────────────────────────────────────

export function makeBackgroundLayer(file: string): FrameLayer
{
   return new FrameLayer(`${BASE_PATH}/backgrounds/${file}`, 131, 105, 2710, 3722);
}

export function makeBorderLayer(file: string): FrameLayer
{
   return new FrameLayer(`${BASE_PATH}/borders/${file}`, 70, 70, 2780, 3782);
}

export function makeNameTypeBoxLayer(file: string): FrameLayer
{
   return new FrameLayer(`${BASE_PATH}/boxes/name_type/${file}`, 152, 125, 2668, 2412);
}

export function makePtBoxLayer(file: string): FrameLayer
{
   return new FrameLayer(`${BASE_PATH}/boxes/power_toughness/${file}`, 3666, 2277, 555, 296);
}

export function makeColorIndicatorLayer(file: string): FrameLayer
{
   return new FrameLayer(`${BASE_PATH}/color indicators/${file}`, 2376, 176, 129, 129);
}
