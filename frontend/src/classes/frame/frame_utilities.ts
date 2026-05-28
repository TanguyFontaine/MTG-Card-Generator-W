import { CardColor } from "../card_color";

// ─── WUBRG character mapping ──────────────────────────────────────────────────

const COLOR_TO_CHAR: Record<CardColor, string> = {
   [CardColor.White]: "W",
   [CardColor.Blue]:  "U",
   [CardColor.Black]: "B",
   [CardColor.Red]:   "R",
   [CardColor.Green]: "G",
};

const CHAR_TO_COLOR: Record<string, CardColor> = {
   "W": CardColor.White,
   "U": CardColor.Blue,
   "B": CardColor.Black,
   "R": CardColor.Red,
   "G": CardColor.Green,
};

/** WUBRG order — used to return colors in a stable, canonical order. */
export const WUBRG_ORDER = [
   CardColor.White,
   CardColor.Blue,
   CardColor.Black,
   CardColor.Red,
   CardColor.Green,
];

// ─── Conversion functions ─────────────────────────────────────────────────────

// Colorless: empty array (UI state) <-> "C" string (DB)

export function colorsToWubrgString(colors: CardColor[] | null): string | null
{
   if (colors === null)
      return null;
   if (colors.length === 0)
      return "C";
   return colors.map(c => COLOR_TO_CHAR[c]).join("");
}

export function wubrgStringToColors(colorsStr: string | null | undefined): CardColor[] | null
{
   if (colorsStr === null || colorsStr === undefined)
      return null;
   if (colorsStr === "C")
      return [];
   return colorsStr.split("").reduce<CardColor[]>((colors, char) =>
   {
      colors.push(CHAR_TO_COLOR[char]);
      return colors;
   }, []);
}
