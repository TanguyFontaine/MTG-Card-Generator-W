import React from 'react';
import { HStack } from "@chakra-ui/react"
/**************************************************** */

import { Text } from "../style_components/text"
import { Select } from "../style_components/select" 
import { frames } from "../ressources/frames"

/***************************************************************/
export function CardFrameSelection(props) {

    const frameColors = frames.map((frame) => frame.color)

    return (
        <HStack spacing={2}>
            <Text>Card frame :</Text>
            <Select options={frameColors} setValue={(value) => props.setCardFrame(value)} placeholder="Select the frame of your card." />
         </HStack>
    );
}
