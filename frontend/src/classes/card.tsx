interface Card
{
   id?: number;
   name: string;
   spellDescription: string;
   manaCost: string;
   type: string;
   flavorText: string;
   frame: string;
   imageUrl: string;
   power: string;
   toughness: string;
   loyalty?: string;
}

export type { Card };
