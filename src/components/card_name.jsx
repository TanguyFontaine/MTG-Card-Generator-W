import React from 'react';
import { Box, HStack } from "@chakra-ui/react"
/**************************************************** */

import { Text } from "../style_components/text"
import { Textbox } from "../style_components/textbox"

/***************************************************************/
export function CardName(props) {
    return (
        <HStack spacing={2}>
            <Text>Name :</Text>
            <Textbox setValue={(value) => props.setCardName(value)} placeholder="Enter the name of your card here."/>
         </HStack>
    );
}
