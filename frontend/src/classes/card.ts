// Class representing a card for backend data transfer.

interface FrameCustomization
{
   /** null = auto-detect; "C" = colorless; "WUBRG" string = explicit colors */
   frameColorOverride: string | null;
   withVehicleFrame: boolean;
   withColorIndicator: boolean;
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
}

export type { Card };
