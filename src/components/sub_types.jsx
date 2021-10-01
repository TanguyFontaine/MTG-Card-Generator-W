import React from 'react';
import { HStack } from "@chakra-ui/react"
/**************************************************** */

import { Textbox } from "../style_compomemts/textbox"
import { Text } from "../style_compomemts/text"


/***************************************************************/
export function SubTypes(props) {
    return (
        <HStack spacing={2}>
            <Text>Sub types :</Text>
            <Textbox setValue={(subTypes) => props.setSubTypes(subTypes)} placeholder="Enter the sub types of your card here."/>
         </HStack>
    );
}
