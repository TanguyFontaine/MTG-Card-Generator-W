import React from 'react';
import { HStack } from "@chakra-ui/react"
/***************************************************************/

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
                    <Checkbox value="Creature" displayLabel="Creature" />
                    <Checkbox value="Artifact" displayLabel="Artifact" />
                    <Checkbox value="Enchantment" displayLabel="Enchantment" />
                    <Checkbox value="Planeswalker" displayLabel="Planeswalker" />
                    <Checkbox value="Instant" displayLabel="Instant" />
                    <Checkbox value="Sorcery" displayLabel="Sorcery" />
                    <Checkbox value="Land" displayLabel="Land" />
                    <Checkbox value="Tribal" displayLabel="Tribal" />
                </HStack>
            </CheckboxGroup>
         </HStack>
    );
}
