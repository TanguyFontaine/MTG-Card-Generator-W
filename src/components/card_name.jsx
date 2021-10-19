import React from 'react';
import { HStack } from "@chakra-ui/react"
/***************************************************************/

import { Text } from "../style_components/text"
import { Textbox } from "../style_components/textbox"
import { FontSizeControler } from "./font_size_controler"
/***************************************************************/

export function CardName(props) {
    return (
        <HStack spacing={2}>
            <Text>Name :</Text>
            <Textbox width={660} setValue={(value) => props.setCardName(value)} placeholder="Enter the name of your card here."/>
            <FontSizeControler setValue={props.setNameFontSize} value={props.nameFontSize}/>
         </HStack>
    );
}
