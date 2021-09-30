import React from 'react';
import { Text, HStack } from "@chakra-ui/react"
/**************************************************** */

import { Textbox } from "../style_compomemts/textbox"


/***************************************************************/
export function Loyalty(props) {
    return (
        <HStack spacing={2}>
            <Text>Loyalty :</Text>
            <Textbox setValue={(value) => props.setLoyalty(value)} placeholder="Enter the name of your card here."/>
         </HStack>
    );
}
