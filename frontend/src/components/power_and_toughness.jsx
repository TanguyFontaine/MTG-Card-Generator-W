import React from 'react';
import { HStack, Box} from "@chakra-ui/react"
/***************************************************************/

import { Textbox } from "../style_components/textbox"
import { Text } from "../style_components/text"
import { FontSizeControler } from "./font_size_controler"
/***************************************************************/

export function PowerToughness(props) {
    return (
        <HStack spacing='auto'>
            <Text>Power:</Text>
            <Textbox width={252} value={props.power} setValue={(value) => props.setPower(value)} placeholder="Power"/>
            <Box width={30}/>
            <Text>Toughness:</Text>
            <Textbox width={252} value={props.toughness} setValue={(value) => props.setToughness(value)} placeholder="Toughness"/>
            <FontSizeControler setValue={props.setPTFontSize} value={props.ptFontSize}/>
         </HStack>
    );
}
