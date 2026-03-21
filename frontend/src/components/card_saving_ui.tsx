import { HStack } from "@chakra-ui/react";
/***************************************************************/

import { SaveCardButton } from "../components/save_card_button";
import { LoadCardButton } from "../components/load_card_button";
import { NewCardButton } from "../components/new_card_button";
import { ManaCostObj } from "../classes/mana_cost";
import { CardTypeObj } from "../classes/card_type";
import type { ImageFile } from "../classes/image_file_interface";

/***************************************************************/

interface CardSavingUIProps
{
   cardId: number | null;
   cardName: string;
   spellDescription: string;
   cardType: CardTypeObj;
   manaCost: ManaCostObj;
   flavorText: string;
   power: string;
   toughness: string;
   loyalty: string;
   cardFrame: string;
   imageFile: ImageFile;

   setCardId: (id: number | null) => void;
   setCardName: (value: string) => void;
   setSpellDescription: (value: string) => void;
   setCardType: (cardType: CardTypeObj) => void;
   setManaCost: (manaCost: ManaCostObj) => void;
   setFlavorText: (value: string) => void;
   setPower: (value: string) => void;
   setToughness: (value: string) => void;
   setLoyalty: (value: string) => void;
   setCardFrame: (value: string) => void;
   setImageFile: (file: ImageFile) => void;
}

export function CardSavingUI(props: CardSavingUIProps)
{
   return (
      <HStack w="100%" justify="space-between">
         <SaveCardButton
            cardId={props.cardId} setCardId={props.setCardId}
            cardName={props.cardName}
            spellDescription={props.spellDescription}
            cardType={props.cardType}
            manaCost={props.manaCost}
            flavorText={props.flavorText}
            power={props.power}
            toughness={props.toughness}
            cardFrame={props.cardFrame}
            imageFile={props.imageFile} />
         <NewCardButton
            setCardId={props.setCardId}
            setCardName={props.setCardName}
            setSpellDescription={props.setSpellDescription}
            setCardType={props.setCardType}
            setManaCost={props.setManaCost}
            setFlavorText={props.setFlavorText}
            setPower={props.setPower}
            setToughness={props.setToughness}
            setCardFrame={props.setCardFrame}
            setImageFile={props.setImageFile}
         />
         <LoadCardButton
            setCardId={props.setCardId}
            setCardName={props.setCardName}
            setSpellDescription={props.setSpellDescription}
            setCardType={props.setCardType}
            setManaCost={props.setManaCost}
            setFlavorText={props.setFlavorText}
            setPower={props.setPower}
            setToughness={props.setToughness}
            setLoyalty={props.setLoyalty}
            setCardFrame={props.setCardFrame}
            setImageFile={props.setImageFile}
         />
      </HStack>
   );
}
