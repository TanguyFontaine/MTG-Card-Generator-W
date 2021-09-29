import React from 'react';
import { Text, HStack } from "@chakra-ui/react"
/**************************************************** */

import { Textarea } from "../style_compomemts/textarea"


/***************************************************************/
export function FlavorText(props) {
    return (
        <HStack spacing={2}>
            <Text>Flavor text :</Text>
            <Textarea setValue={(value) => props.setFlavorText(value)} placeholder="Enter the flavor text :"/>
         </HStack>
    );
}
