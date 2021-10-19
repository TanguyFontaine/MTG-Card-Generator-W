import React from 'react';
import { HStack } from "@chakra-ui/react"
/***************************************************************/

import { Textbox } from "../style_components/textbox"
import { Text } from "../style_components/text"
import { FontSizeControler } from "./font_size_controler"
/***************************************************************/

export function SubTypes(props) {
    return (
        <HStack spacing={2}>
            <Text>Sub types :</Text>
            <Textbox width={635} setValue={(subTypes) => props.setSubTypes(subTypes)} placeholder="Enter the sub types of your card here."/>
            <FontSizeControler setValue={props.setTypesFontSize} value={props.typesFontSize}/>
         </HStack>
    );
}
