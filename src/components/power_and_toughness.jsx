import React from 'react';
import { HStack } from "@chakra-ui/react"
/***************************************************************/

import { Textbox } from "../style_components/textbox"
import { Text } from "../style_components/text"
/***************************************************************/

export function PowerToughness(props) {
    return (
        <HStack spacing={2}>
            <Text>Power :</Text>
            <Textbox setValue={(value) => props.setPower(value)} placeholder="Power"/>
            <Text>Toughness :</Text>
            <Textbox setValue={(value) => props.setToughness(value)} placeholder="Toughness"/>
         </HStack>
    );
}
