import React from 'react';
import { Box, HStack } from "@chakra-ui/react"
/**************************************************** */

import { Checkbox } from "../style_components/checkbox"
import { CheckboxGroup } from "../style_components/checkbox_group"
import { Text } from "../style_components/text"


/***************************************************************/
export function TypesSelection(props) {
    return (
        <HStack spacing={2}>
            <Text>Select types :</Text>
            <CheckboxGroup name="types" setValue={(value) => props.setTypes(value)}>
                <HStack spacing={4}>
                    <Checkbox value="creatrue" displayLabel="Creatrue" />
                    <Checkbox value="artifact" displayLabel="Artifact" />
                    <Checkbox value="enchantment" displayLabel="Enchantment" />
                    <Checkbox value="planeswalker" displayLabel="Planeswalker" />
                    <Checkbox value="instant" displayLabel="Instant" />
                    <Checkbox value="sorcery" displayLabel="Sorcery" />
                    <Checkbox value="land" displayLabel="Land" />
                    <Checkbox value="tribal" displayLabel="Tribal" />
                </HStack>
            </CheckboxGroup>
         </HStack>
    );
}
