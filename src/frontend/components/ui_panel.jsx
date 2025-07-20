import React from 'react';
import { Box, Grid, useStyleConfig } from "@chakra-ui/react"
/***************************************************************/

import { ImageSelector } from "./image_selector"
import { CardName } from "./card_name"
import { TypesSelection } from "./types_selection"
import { SuperTypesSelection } from "./super_types_selection"
import { SubTypes } from "./sub_types"
import { ManaCost } from "./mana_cost"
import { CardFrameSelection } from "./card_frame_selection"
import { SpellDescription } from "./spell_description"
import { FlavorText } from "./flavor_text"
import { PowerToughness } from "./power_and_toughness"
/***************************************************************/

export function UiPanel(props) {

    const style = useStyleConfig("UiPanel")
    
    //<Loyalty setLoyalty={props.setLoyalty}/>

    return (
        <Box __css={style} w="100%">
            <Grid mt="3%" mx="5%" gap="1.5em">
                <CardName cardName={props.cardName} setCardName={props.setCardName} setNameFontSize={props.setNameFontSize} nameFontSize={props.nameFontSize}/>
                <TypesSelection types={props.types} setTypes={props.setTypes}/>
                <SuperTypesSelection superTypes={props.superTypes} setSuperTypes={props.setSuperTypes}/>
                <SubTypes subTypes={props.subTypes} setSubTypes={props.setSubTypes} setTypesFontSize={props.setTypesFontSize} typesFontSize={props.typesFontSize}/>
                <ManaCost manaCost={props.manaCost} setManaCost={props.setManaCost} 
                          colorlessManaAmount={props.colorlessManaAmount} setColorlessManaAmount={props.setColorlessManaAmount}/>
                <CardFrameSelection cardFrameColor={props.cardFrameColor} setCardFrame={props.setCardFrame}/>
                <SpellDescription spellDescription={props.spellDescription} setSpellDescription={props.setSpellDescription} 
                                  spellFontSize={props.spellFontSize} setSpellFontSize={props.setSpellFontSize}/>
                <FlavorText flavorText={props.flavorText} setFlavorText={props.setFlavorText} flavorTextFontSize={props.flavorTextFontSize} setFlavorTextFontSize={props.setFlavorTextFontSize}/>
                <PowerToughness power={props.power} setPower={props.setPower} toughness={props.toughness} setToughness={props.setToughness} ptFontSize={props.ptFontSize} setPTFontSize={props.setPTFontSize}/>
                <ImageSelector setImageFileFunction={props.setImageFileFunction} selectedImageFileName={props.selectedImageFileName} setImageCentering={props.setImageCentering}/> 
            </Grid>
        </Box>
    );
}
