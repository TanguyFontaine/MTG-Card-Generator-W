import { ManaCostObj } from "../classes/mana_cost";
import { CardTypeObj } from "../classes/card_type";
import type { ImageFile } from "../classes/image_file_interface";

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
   cardFrame: string;
   manaCost: ManaCostObj;
   spellDescription: string;
   spellFontSize: number;
   flavorText: string;
   flavorTextFontSize: number;
   power: string;
   toughness: string;
   powerToughnessFontSize: number;
   loyalty: string;
}

export const INITIAL_STATE: CardState = {
   cardId: null,
   cardName: "",
   nameFontSize: 32,
   imageFile: { localFile: "", localFileName: "", url: "", contentFromUrl: "" },
   imageCentering: "center",
   cardType: CardTypeObj.newEmpty(),
   typesFontSize: 28,
   cardFrame: "",
   manaCost: ManaCostObj.newEmpty(),
   spellDescription: "",
   spellFontSize: 22,
   flavorText: "",
   flavorTextFontSize: 21,
   power: "",
   toughness: "",
   powerToughnessFontSize: 34,
   loyalty: "",
};
