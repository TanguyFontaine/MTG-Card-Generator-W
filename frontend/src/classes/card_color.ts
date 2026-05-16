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
   [symbols.HybridPhyWU]: [CardColor.White, CardColor.Blue],
   [symbols.HybridPhyWB]: [CardColor.White, CardColor.Black],
   [symbols.HybridPhyRW]: [CardColor.Red,   CardColor.White],
   [symbols.HybridPhyRG]: [CardColor.Red,   CardColor.Green],
   [symbols.HybridPhyGU]: [CardColor.Green, CardColor.Blue],
   [symbols.HybridPhyGW]: [CardColor.Green, CardColor.White],
   [symbols.HybridPhyUB]: [CardColor.Blue,  CardColor.Black],
   [symbols.HybridPhyUR]: [CardColor.Blue,  CardColor.Red],
   [symbols.HybridPhyBR]: [CardColor.Black, CardColor.Red],
   [symbols.HybridPhyBG]: [CardColor.Black, CardColor.Green],
   // Twobrid — one colored pip
   [symbols.TwoGenWhite]:   [CardColor.White],
   [symbols.TwoGenBlue]:    [CardColor.Blue],
   [symbols.TwoGenBlack]:   [CardColor.Black],
   [symbols.TwoGenRed]:     [CardColor.Red],
   [symbols.TwoGenGreen]:   [CardColor.Green],
   [symbols.ColorlessWhite]:   [CardColor.White],
   [symbols.ColorlessBlue]:    [CardColor.Blue],
   [symbols.ColorlessBlack]:   [CardColor.Black],
   [symbols.ColorlessRed]:     [CardColor.Red],
   [symbols.ColorlessGreen]:   [CardColor.Green],
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
