import React from 'react';
import { HStack } from "@chakra-ui/react"
/***************************************************************/

import { SaveCardButton } from "../components/save_card_button"
import { LoadCardButton } from "../components/load_card_button"
import { NewCardButton } from "../components/new_card_button"

/***************************************************************/

export function CardSavingUI(props) {
        
    return (
        <HStack spacing='auto'>
            <SaveCardButton
                cardId={props.cardId} setCardId={props.setCardId}
                cardName={props.cardName}
                cardDescription={props.spellDescription}
                cardType={props.cardType}
                manaCost={props.manaCost}
                flavorText={props.flavorText}
                power={props.power}
                toughness={props.toughness}
                cardFrameColor={props.cardFrameColor}
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
                setLoyalty={props.setLoyalty}
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
