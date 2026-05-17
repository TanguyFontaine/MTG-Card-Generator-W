import { ManaCostObj } from "../classes/mana_cost";
import { CardTypeObj } from "../classes/card_type";
import type { ImageFile } from "../classes/image_file_interface";
import { CardColor } from "../classes/card_color";

// Class reprensenting the entire state of the card in the frontend.
export interface CardState
{
   cardId: number | null;
   cardName: string;
   nameFontSize: number;
   imageFile: ImageFile;
   imageCentering: string;
   cardType: CardTypeObj;
   typesFontSize: number;
   manaCost: ManaCostObj;
   spellDescription: string;
   spellFontSize: number;
   flavorText: string;
   flavorTextFontSize: number;
   power: string;
   toughness: string;
   powerToughnessFontSize: number;
   loyalty: string;
   /** null = auto-detect from mana cost; [] = colorless; [CardColor.X, ...] = explicit override */
   frameColorOverride: CardColor[] | null;
   usesVehicleFrame: boolean;
}

export const INITIAL_STATE: CardState = {
   cardId: null,
   cardName: "",
   nameFontSize: 143,
   imageFile: { localFile: "", localFileName: "", url: "", contentFromUrl: "" },
   imageCentering: "center",
   cardType: CardTypeObj.newEmpty(),
   typesFontSize: 125,
   manaCost: ManaCostObj.newEmpty(),
   spellDescription: "",
   spellFontSize: 98,
   flavorText: "",
   flavorTextFontSize: 94,
   power: "",
   toughness: "",
   powerToughnessFontSize: 152,
   loyalty: "",
   frameColorOverride: null,
   usesVehicleFrame: false,
};
