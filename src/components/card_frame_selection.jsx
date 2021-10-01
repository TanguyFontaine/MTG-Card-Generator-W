import React from 'react';
import { HStack } from "@chakra-ui/react"
/**************************************************** */

import { Text } from "../style_components/text"
import { Select } from "../style_components/select"

/***************************************************************/
export function CardFrameSelection(props) {

    const frames = ["Colorless",
                    "White",
                    "Blue",
                    "Black",
                    "Red",
                    "Green",
                    "Golden",
                    "Grey",
                    "Hybrid White/Blue",
                    "Hybrid White/Black",
                    "Hybrid Red/White",
                    "Hybrid Red/Green",
                    "Hybrid Green/Blue",
                    "Hybrid Green/White",
                    "Hybrid Blue/Black",
                    "Hybrid Blue/Red",
                    "Hybrid Black/Red",
                    "Hybrid Black/Green"]

    return (
        <HStack spacing={2}>
            <Text>Card frame :</Text>
            <Select options={frames} setValue={(value) => props.setCardFrame(value)} placeholder="Select the frame of your card." />
         </HStack>
    );
}