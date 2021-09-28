import React from 'react';
import { Box, VStack } from "@chakra-ui/react"
/**************************************************** */

import { ImageSelector } from "./image_selector"
import { CardName } from "./card_name"
import { TypesSelection } from "./types_selection"
import { SuperTypesSelection } from "./super_types_selection"
import { SubTypes } from "./sub_types"
import { CardFrameSelection } from "./card_frame_selection"


/***************************************************************/
export function UiPanel(props) {
    return (
        <Box>
            <VStack spacing={2}>
                <CardName cardName={props.cardName} setCardName={(value) => props.setCardName(value)}/>
                <TypesSelection types={props.types} setTypes={(value) => props.setTypes(value)}/>
                <SuperTypesSelection superTypes={props.superTypes} setSuperTypes={(value) => props.setSuperTypes(value)}/>
                <SubTypes subTypes={props.subTypes} setSubTypes={(value) => props.setSubTypes(value)}/>
                <CardFrameSelection setCardFrame={(value) => props.setCardFrame(value)}/>
                <ImageSelector setImageFileFunction={(file) => props.setImageFileFunction(file)} selectedImageFileName={props.selectedImageFileName}/>
            </VStack>
        </Box>
    );
}
