import React from 'react';
import { Box, VStack } from "@chakra-ui/react"
/**************************************************** */

import { ImageSelector } from "./image_selector"
import { CardName } from "./card_name"
import { TypesSelection } from "./types_selection"


/***************************************************************/
export function UiPanel(props) {
    return (
        <Box>
            <VStack spacing={2}>
                <CardName cardName={props.cardName} setCardName={(value) => props.setCardName(value)}/>
                <TypesSelection types={props.types} setTypes={(value) => props.setTypes(value)}/>
                <ImageSelector setImageFileFunction={(file) => props.setImageFileFunction(file)} selectedImageFileName={props.selectedImageFileName}/>
            </VStack>
        </Box>
    );
}
