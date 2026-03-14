import { ManaCostObj } from "../classes/mana_cost";
import { CardTypeObj } from "../classes/card_type";
import type { ImageFile } from "./image_file_interface";

export interface CardSettersProps
{
   setCardId?: (id: number | null) => void;
   setCardName?: (value: string) => void;
   setSpellDescription?: (value: string) => void;
   setFlavorText?: (value: string) => void;
   setPower?: (value: string) => void;
   setToughness?: (value: string) => void;
   setLoyalty?: (value: string) => void;
   setCardFrame?: (value: string) => void;
   setManaCost?: (manaCost: ManaCostObj) => void;
   setCardType?: (cardType: CardTypeObj) => void;
   setImageFile: (file: ImageFile) => void;
}
