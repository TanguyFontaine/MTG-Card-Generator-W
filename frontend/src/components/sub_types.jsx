import React from 'react';
import { HStack } from "@chakra-ui/react"
/***************************************************************/

import { Textbox } from "../style_components/textbox"
import { Text } from "../style_components/text"
import { FontSizeControler } from "./font_size_controler"
/***************************************************************/

export function SubTypes(props)
{
    const handleSubTypesChange = (subTypes) => {
        const newCardType = props.cardType.setSubTypes(subTypes);
            props.setCardType(newCardType);
    };

    return (
        <HStack spacing='auto'>
            <Text>Sub types:</Text>
            <Textbox 
                width="72%" 
                value={props.cardType.subTypes}
                setValue={handleSubTypesChange} 
                placeholder="Enter the sub types of your card here."
            />
            <FontSizeControler setValue={props.setTypesFontSize} value={props.typesFontSize}/>
         </HStack>
    );
}
