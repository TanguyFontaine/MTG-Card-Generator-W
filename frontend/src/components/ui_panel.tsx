import { Box, Grid, useStyleConfig } from "@chakra-ui/react";
/***************************************************************/

import { ImageSelector } from "./image_selector";
import { CardSavingUI } from "./card_saving_ui";
import { CardName } from "./card_name";
import { TypesSelection } from "./types_selection";
import { SuperTypesSelection } from "./super_types_selection";
import { SubTypes } from "./sub_types";
import { ManaCost } from "./mana_cost";
import { CardFrameSelection } from "./card_frame_selection";
import { SpellDescription } from "./spell_description";
import { FlavorText } from "./flavor_text";
import { PowerToughness } from "./power_and_toughness";
import { ManaCostObj } from "../classes/mana_cost";
import { CardTypeObj } from "../classes/card_type";
import type { ImageFile } from "../classes/image_file_interface";
/***************************************************************/

interface UiPanelProps
{
   cardId: number | null;
   cardName: string;
   nameFontSize: number;
   selectedImageFileName: string;
   imageFile: ImageFile;
   cardType: CardTypeObj;
   typesFontSize: number;
   manaCost: ManaCostObj;
   cardFrame: string;
   spellDescription: string;
   spellFontSize: number;
   flavorText: string;
   flavorTextFontSize: number;
   power: string;
   toughness: string;
   ptFontSize: number;
   loyalty: string;

   setCardId: (id: number | null) => void;
   setCardName: (value: string) => void;
   setNameFontSize: (value: number) => void;
   setImageFile: (file: ImageFile) => void;
   setCardType: (cardType: CardTypeObj) => void;
   setTypesFontSize: (value: number) => void;
   setManaCost: (manaCost: ManaCostObj) => void;
   setCardFrame: (value: string) => void;
   setSpellDescription: (value: string) => void;
   setSpellFontSize: (value: number) => void;
   setFlavorText: (value: string) => void;
   setFlavorTextFontSize: (value: number) => void;
   setPower: (value: string) => void;
   setToughness: (value: string) => void;
   setPTFontSize: (value: number) => void;
   setLoyalty: (value: string) => void;
   setImageCentering: (value: string) => void;
}

export function UiPanel(props: UiPanelProps)
{
   const style = useStyleConfig("UiPanel");

   //<Loyalty setLoyalty={props.setLoyalty}/>

   return (
      <Box __css={style} w="100%">
         <Grid mt="3%" mx="5%" gap="1.5em">
            <CardName cardName={props.cardName} setCardName={props.setCardName} setNameFontSize={props.setNameFontSize} nameFontSize={props.nameFontSize} />
            <TypesSelection cardType={props.cardType} setCardType={props.setCardType} />
            <SuperTypesSelection cardType={props.cardType} setCardType={props.setCardType} />
            <SubTypes cardType={props.cardType} setCardType={props.setCardType} setTypesFontSize={props.setTypesFontSize} typesFontSize={props.typesFontSize} />
            <ManaCost manaCost={props.manaCost} setManaCost={props.setManaCost} />
            <CardFrameSelection cardFrame={props.cardFrame} setCardFrame={props.setCardFrame} />
            <SpellDescription spellDescription={props.spellDescription} setSpellDescription={props.setSpellDescription}
               spellFontSize={props.spellFontSize} setSpellFontSize={props.setSpellFontSize} />
            <FlavorText flavorText={props.flavorText} setFlavorText={props.setFlavorText} flavorTextFontSize={props.flavorTextFontSize} setFlavorTextFontSize={props.setFlavorTextFontSize} />
            <PowerToughness power={props.power} setPower={props.setPower} toughness={props.toughness} setToughness={props.setToughness} ptFontSize={props.ptFontSize} setPTFontSize={props.setPTFontSize} />
            <ImageSelector setImageFile={props.setImageFile} selectedImageFileName={props.selectedImageFileName} setImageCentering={props.setImageCentering} />
            <CardSavingUI
               cardId={props.cardId} setCardId={props.setCardId}
               cardName={props.cardName} setCardName={props.setCardName}
               spellDescription={props.spellDescription} setSpellDescription={props.setSpellDescription}
               cardType={props.cardType} setCardType={props.setCardType}
               manaCost={props.manaCost} setManaCost={props.setManaCost}
               flavorText={props.flavorText} setFlavorText={props.setFlavorText}
               power={props.power} setPower={props.setPower}
               toughness={props.toughness} setToughness={props.setToughness}
               loyalty={props.loyalty} setLoyalty={props.setLoyalty}
               cardFrame={props.cardFrame} setCardFrame={props.setCardFrame}
               imageFile={props.imageFile} setImageFile={props.setImageFile}
            />
         </Grid>
      </Box>
   );
}
