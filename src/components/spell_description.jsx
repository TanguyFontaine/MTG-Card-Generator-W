import React from 'react';
import { HStack } from "@chakra-ui/react"
/**************************************************** */

import { Textarea } from "../style_components/textarea"
import { Text } from "../style_components/text"


/***************************************************************/
export function SpellDescription(props) {
    return (
        <HStack spacing={2}>
            <Text>Abilities :</Text>
            <Textarea setValue={(value) => props.setSpellDescription(value)} placeholder="Enter the abilities or the description of your spell :"/>
         </HStack>
    );
}