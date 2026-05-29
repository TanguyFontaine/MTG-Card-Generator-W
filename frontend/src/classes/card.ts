// Class representing a card for backend data transfer.

interface FrameCustomization
{
   /** null = auto-detect; "C" = colorless; "WUBRG" string = explicit colors */
   frameColorOverride: string | null;
   withVehicleFrame: boolean;
   withColorIndicator: boolean;
   frameType?: string;
}

interface Card
{
   id?: number;
   name: string;
   spellDescription: string;
   manaCost: string;
   type: string;
   flavorText: string;
   imageUrl: string;
   power: string;
   toughness: string;
   loyalty?: string;
   frameCustomization: FrameCustomization;
   specialFrameData?: unknown | null; // Contains frame sizes of specific frame fields
   fontSizesMainFields: Record<string, number>;  // Font sizes for normal card fields: name, types, spell, flavorText, powerToughness
}

export type { Card };
