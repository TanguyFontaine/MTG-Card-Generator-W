import React, { useState } from 'react';
import { HStack } from "@chakra-ui/react"
/***************************************************************/

import { Textarea } from "../style_components/textarea"
import { Text } from "../style_components/text"
import { FontSizeControler } from "./font_size_controler"
/***************************************************************/

export function FlavorText(props) {

    const [inputValue, setInputValue] = useState("");

    return (
        <HStack spacing='auto'>
            <Text>Flavor text :</Text>
            <Textarea width="73%" 
                      inputValue={inputValue} setInputValue={setInputValue} 
                      setValue={(value) => props.setFlavorText(value)} 
                      placeholder="Enter the flavor text :"/>
            <FontSizeControler setValue={props.setFlavorTextFontSize} value={props.flavorTextFontSize}/>
         </HStack>
    );
}
