import React from 'react';
import { Text, HStack } from "@chakra-ui/react"
/**************************************************** */

import { Textbox } from "../style_compomemts/textbox"


/***************************************************************/
export function PowerToughness(props) {
    return (
        <HStack spacing={2}>
            <Text>Power :</Text>
            <Textbox setValue={(value) => props.setPower(value)} placeholder="Power"/>
            <Text>      Toughness :</Text>
            <Textbox setValue={(value) => props.setToughness(value)} placeholder="Toughness"/>
         </HStack>
    );
}
