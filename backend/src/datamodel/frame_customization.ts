
export interface FrameCustomization
{
   /** null = auto-detect from mana cost; "C" = colorless; "WUBRG" string = explicit colors */
   frameColorOverride: string | null;
   withVehicleFrame: boolean;
   withColorIndicator: boolean;
   frameType: string;
}
