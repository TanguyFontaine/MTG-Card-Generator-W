import { ManaCostObj } from "../classes/mana_cost";
import { CardTypeObj } from "../classes/card_type";
import type { ImageFile } from "../classes/image_file_interface";
import { CardColor } from "../classes/card_color";
import { FrameType } from "../classes/frame/frame_type";
import { LevelAbility } from "../classes/level_ability";

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
   withVehicleFrame: boolean;
   withColorIndicator: boolean;
   frameType: FrameType;
   levelBaseAbility: LevelAbility;
   levelAbility1: LevelAbility;
   levelAbility2: LevelAbility;
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
   withVehicleFrame: false,
   withColorIndicator: false,
   frameType: FrameType.Normal,
   levelBaseAbility: { levelMin: "", levelMax: "", spellDescription: "", power: "", toughness: "", levelFontSize: 150, spellFontSize: 100, ptFontSize: 152 },
   levelAbility1: { levelMin: "", levelMax: "", spellDescription: "", power: "", toughness: "", levelFontSize: 150, spellFontSize: 100, ptFontSize: 152 },
   levelAbility2: { levelMin: "", levelMax: "", spellDescription: "", power: "", toughness: "", levelFontSize: 150, spellFontSize: 100, ptFontSize: 152 },
};
