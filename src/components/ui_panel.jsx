import React from 'react';
import { Box, Grid, VStack, useStyleConfig } from "@chakra-ui/react"
/***************************************************************/

import { ImageSelector } from "./image_selector"
import { ImageCentering } from "./image_centering"
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


    //<Loyalty setLoyalty={(value) => props.setLoyalty(value)}/>

    return (
        <Box __css={style} >
            <Grid mt="3%" mx="5%" gap="1.5em">
                <CardName setCardName={(value) => props.setCardName(value)}/>
                <TypesSelection setTypes={(value) => props.setTypes(value)}/>
                <SuperTypesSelection setSuperTypes={(value) => props.setSuperTypes(value)}/>
                <SubTypes setSubTypes={(value) => props.setSubTypes(value)}/>
                <ManaCost setManaCost={(value) => props.setManaCost(value)} manaCost={props.manaCost} 
                          setColorlessManaAmount={(value) => props.setColorlessManaAmount(value)} colorlessManaAmount={props.colorlessManaAmount}/>
                <CardFrameSelection setCardFrame={(value) => props.setCardFrame(value)}/>
                <SpellDescription setSpellDescription={(value) => props.setSpellDescription(value)} spellDescription={props.spellDescription}/>
                <FlavorText setFlavorText={(value) => props.setFlavorText(value)}/>
                <PowerToughness setPower={(value) => props.setPower(value)} setToughness={(value) => props.setToughness(value)}/>
                <ImageSelector setImageFileFunction={(file) => props.setImageFileFunction(file)} selectedImageFileName={props.selectedImageFileName}/>
                <ImageCentering setImageCentering={(value) => props.setImageCentering(value)}/>
            </Grid>
        </Box>
    );
}
