import React, { useState } from 'react';
import { HStack } from "@chakra-ui/react"
/***************************************************************/

import { Textarea } from "../style_components/textarea"
import { Text } from "../style_components/text"
import { FontSizeControler } from "./font_size_controler"
/***************************************************************/

export function FlavorText(props) {
    // The flavor text is a string, it can contain any character
    return (
        <HStack spacing='auto'>
            <Text>Flavor text:</Text>
            <Textarea width="73%" 
                      inputValue={props.flavorText} setInputValue={props.setFlavorText} 
                      setValue={(value) => props.setFlavorText(value)} 
                      placeholder="Enter the flavor text :"/>
            <FontSizeControler setValue={props.setFlavorTextFontSize} value={props.flavorTextFontSize}/>
         </HStack>
    );
}
