import React from 'react';
import { Text, HStack } from "@chakra-ui/react"
/**************************************************** */

import { Textbox } from "../style_compomemts/textbox"


/***************************************************************/
export function CardName(props) {
    return (
        <HStack spacing={2}>
            <Text>Name :</Text>
            <Textbox value={props.cardName} setValue={(value) => props.setCardName(value)} placeholder="Enter the name of your card here."/>
         </HStack>
    );
}
