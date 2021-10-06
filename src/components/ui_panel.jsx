import React from 'react';
import { Box, VStack, Stack, Grid, useStyleConfig } from "@chakra-ui/react"
/**************************************************** */

import { ImageSelector } from "./image_selector"
import { CardName } from "./card_name"
import { TypesSelection } from "./types_selection"
import { SuperTypesSelection } from "./super_types_selection"
import { SubTypes } from "./sub_types"
import { CardFrameSelection } from "./card_frame_selection"
import { SpellDescription } from "./spell_description"
import { FlavorText } from "./flavor_text"
import { PowerToughness } from "./power_and_toughness"
import { Loyalty } from "./loyalty"

/***************************************************************/
export function UiPanel(props) {

    const style = useStyleConfig("UiPanel")

    return (
        <Box __css={style} >
            <Grid mt="7%" mx="5%" gap={6}>
                <CardName setCardName={(value) => props.setCardName(value)}/>
                <TypesSelection setTypes={(value) => props.setTypes(value)}/>
                <SuperTypesSelection setSuperTypes={(value) => props.setSuperTypes(value)}/>
                <SubTypes setSubTypes={(value) => props.setSubTypes(value)}/>
                <CardFrameSelection setCardFrame={(value) => props.setCardFrame(value)}/>
                <SpellDescription setSpellDescription={(value) => props.setSpellDescription(value)}/>
                <FlavorText setFlavorText={(value) => props.setFlavorText(value)}/>
                <PowerToughness setPower={(value) => props.setPower(value)} setToughness={(value) => props.setToughness(value)}/>
                <Loyalty setLoyalty={(value) => props.setLoyalty(value)}/>
                <ImageSelector setImageFileFunction={(file) => props.setImageFileFunction(file)} selectedImageFileName={props.selectedImageFileName}/>
            </Grid>
        </Box>
    );
}
