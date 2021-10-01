import React from 'react';
import { Stack, HStack } from "@chakra-ui/react"
/**************************************************** */

import { Textbox } from "../style_components/textbox"
import { Text } from "../style_components/text"


/***************************************************************/
export function PowerToughness(props) {
    return (
        <Stack direction="row" spacing={2}>
            <Text>Power :</Text>
            <Textbox setValue={(value) => props.setPower(value)} placeholder="Power"/>
            <Text>Toughness :</Text>
            <Textbox setValue={(value) => props.setToughness(value)} placeholder="Toughness"/>
         </Stack>
    );
}
