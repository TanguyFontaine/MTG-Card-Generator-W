import { symbols } from "../ressources/symbols";

/** The six Magic: The Gathering color identities. */
export enum CardColor
{
   White,
   Blue,
   Black,
   Red,
   Green,
}


 // ─── Symbol → color mapping ───────────────────────────────────────────────────
export const SYMBOL_TO_COLORS: { [key: string]: CardColor[] } = {
   [symbols.White]:    [CardColor.White],
   [symbols.Blue]:     [CardColor.Blue],
   [symbols.Black]:    [CardColor.Black],
   [symbols.Red]:      [CardColor.Red],
   [symbols.Green]:    [CardColor.Green],
   // Hybrid — contribute both colors
   [symbols.HybridWU]: [CardColor.White, CardColor.Blue],
   [symbols.HybridWB]: [CardColor.White, CardColor.Black],
   [symbols.HybridRW]: [CardColor.Red,   CardColor.White],
   [symbols.HybridRG]: [CardColor.Red,   CardColor.Green],
   [symbols.HybridGU]: [CardColor.Green, CardColor.Blue],
   [symbols.HybridGW]: [CardColor.Green, CardColor.White],
   [symbols.HybridUB]: [CardColor.Blue,  CardColor.Black],
   [symbols.HybridUR]: [CardColor.Blue,  CardColor.Red],
   [symbols.HybridBR]: [CardColor.Black, CardColor.Red],
   [symbols.HybridBG]: [CardColor.Black, CardColor.Green],
   // Twobrid — one colored pip
   [symbols.TWhite]:   [CardColor.White],
   [symbols.TBlue]:    [CardColor.Blue],
   [symbols.TBlack]:   [CardColor.Black],
   [symbols.TRed]:     [CardColor.Red],
   [symbols.TGreen]:   [CardColor.Green],
   // Phyrexian — one colored pip
   [symbols.PhyWhite]: [CardColor.White],
   [symbols.PhyBlue]:  [CardColor.Blue],
   [symbols.PhyBlack]: [CardColor.Black],
   [symbols.PhyRed]:   [CardColor.Red],
   [symbols.PhyGreen]: [CardColor.Green],
   // X-color pips
   [symbols.XWhite]:   [CardColor.White],
   [symbols.XBlue]:    [CardColor.Blue],
   [symbols.XBlack]:   [CardColor.Black],
   [symbols.XRed]:     [CardColor.Red],
   [symbols.XGreen]:   [CardColor.Green],
   // symbols.Colorless ("c"), Snow, Energy, XColorless, Tap, Untap,
   // loyalty symbols → no color contribution, intentionally omitted.
};
