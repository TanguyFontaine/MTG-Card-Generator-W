import { CardState } from "./card_state";

import { ManaCostObj } from "../classes/mana_cost";
import { CardTypeObj } from "../classes/card_type";
import type { ImageFile } from "../classes/image_file_interface";

// ─── Action Names ────────────────────────────────────────────
export enum CardActionName
{
   setCardId = "SET_CARD_ID",
   setCardName = "SET_CARD_NAME",
   setNameFontSize = "SET_NAME_FONT_SIZE",
   setImageFile = "SET_IMAGE_FILE",
   setImageCentering = "SET_IMAGE_CENTERING",
   setCardType = "SET_CARD_TYPE",
   setTypesFontSize = "SET_TYPES_FONT_SIZE",
   setCardFrame = "SET_CARD_FRAME",
   setManaCost = "SET_MANA_COST",
   setSpellDescription = "SET_SPELL_DESCRIPTION",
   setSpellFontSize = "SET_SPELL_FONT_SIZE",
   setFlavorText = "SET_FLAVOR_TEXT",
   setFlavorTextFontSize = "SET_FLAVOR_TEXT_FONT_SIZE",
   setPower = "SET_POWER",
   setToughness = "SET_TOUGHNESS",
   setPowerToughnessFontSize = "SET_POWER_TOUGHNESS_FONT_SIZE",
   setLoyalty = "SET_LOYALTY",
   resetCard = "RESET_CARD",
   loadCard = "LOAD_CARD",
}

// ─── Actions ─────────────────────────────────────────────────
// name -> the name of the action to perform (e.g., "SET_CARD_NAME", "SET_MANA_COST", etc.)
// data -> the data needed to perform that action (e.g., the new card name, the new mana cost, etc.)
export type CardAction =
   | { name: CardActionName.setCardId; data: number | null }
   | { name: CardActionName.setCardName; data: string }
   | { name: CardActionName.setNameFontSize; data: number }
   | { name: CardActionName.setImageFile; data: ImageFile }
   | { name: CardActionName.setImageCentering; data: string }
   | { name: CardActionName.setCardType; data: CardTypeObj }
   | { name: CardActionName.setTypesFontSize; data: number }
   | { name: CardActionName.setCardFrame; data: string }
   | { name: CardActionName.setManaCost; data: ManaCostObj }
   | { name: CardActionName.setSpellDescription; data: string }
   | { name: CardActionName.setSpellFontSize; data: number }
   | { name: CardActionName.setFlavorText; data: string }
   | { name: CardActionName.setFlavorTextFontSize; data: number }
   | { name: CardActionName.setPower; data: string }
   | { name: CardActionName.setToughness; data: string }
   | { name: CardActionName.setPowerToughnessFontSize; data: number }
   | { name: CardActionName.setLoyalty; data: string }
   | { name: CardActionName.resetCard }
   | { name: CardActionName.loadCard; data: Partial<CardState> };
