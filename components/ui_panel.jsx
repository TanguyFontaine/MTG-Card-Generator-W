import React from 'react';
import { Box, VStack } from "@chakra-ui/react"
/**************************************************** */

import { ImageSelector } from "./image_selector"
import { CardName } from "./card_name"
import { TypesSelection } from "./types_selection"
import { SuperTypesSelection } from "./super_types_selection"
import { SubTypes } from "./sub_types"
import { CardFrameSelection } from "./card_frame_selection"
import { SpellDescription } from "./spell_description"


/***************************************************************/
export function UiPanel(props) {
    return (
        <Box>
            <VStack spacing={2}>
                <CardName setCardName={(value) => props.setCardName(value)}/>
                <TypesSelection setTypes={(value) => props.setTypes(value)}/>
                <SuperTypesSelection setSuperTypes={(value) => props.setSuperTypes(value)}/>
                <SubTypes setSubTypes={(value) => props.setSubTypes(value)}/>
                <CardFrameSelection setCardFrame={(value) => props.setCardFrame(value)}/>
                <SpellDescription setSpellDescription={(value) => props.setSpellDescription(value)}/>
                <ImageSelector setImageFileFunction={(file) => props.setImageFileFunction(file)} selectedImageFileName={props.selectedImageFileName}/>
            </VStack>
        </Box>
    );
}
