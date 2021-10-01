import React from 'react';
import { HStack } from "@chakra-ui/react"
/**************************************************** */

import { Textarea } from "../style_components/textarea"
import { Text } from "../style_components/text"


/***************************************************************/
export function FlavorText(props) {
    return (
        <HStack spacing={2}>
            <Text>Flavor text :</Text>
            <Textarea setValue={(value) => props.setFlavorText(value)} placeholder="Enter the flavor text :"/>
         </HStack>
    );
}
