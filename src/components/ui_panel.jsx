import React from 'react';
import { Box, Grid, VStack, useStyleConfig } from "@chakra-ui/react"
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
        <Box __css={style} >
            <Grid mt="3%" mx="5%" gap="1.5em">
                <CardName setCardName={props.setCardName} setNameFontSize={props.setNameFontSize} nameFontSize={props.nameFontSize}/>
                <TypesSelection setTypes={props.setTypes}/>
                <SuperTypesSelection setSuperTypes={props.setSuperTypes}/>
                <SubTypes setSubTypes={props.setSubTypes} setTypesFontSize={props.setTypesFontSize} typesFontSize={props.typesFontSize}/>
                <ManaCost setManaCost={props.setManaCost} manaCost={props.manaCost} 
                          setColorlessManaAmount={props.setColorlessManaAmount} colorlessManaAmount={props.colorlessManaAmount}/>
                <CardFrameSelection setCardFrame={props.setCardFrame}/>
                <SpellDescription setSpellDescription={props.setSpellDescription} 
                                  setSpellFontSize={props.setSpellFontSize} spellFontSize={props.spellFontSize}/>
                <FlavorText setFlavorText={props.setFlavorText} setFlavorTextFontSize={props.setFlavorTextFontSize} flavorTextFontSize={props.flavorTextFontSize}/>
                <PowerToughness setPower={props.setPower} setToughness={props.setToughness} setPTFontSize={props.setPTFontSize} ptFontSize={props.ptFontSize}/>
                <ImageSelector setImageFileFunction={props.setImageFileFunction} selectedImageFileName={props.selectedImageFileName} setImageCentering={props.setImageCentering}/>
            </Grid>
        </Box>
    );
}
