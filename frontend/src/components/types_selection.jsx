import React from 'react';
import { HStack } from "@chakra-ui/react"
/***************************************************************/

import { Checkbox } from "../style_components/checkbox"
import { CheckboxGroup } from "../style_components/checkbox_group"
import { Text } from "../style_components/text"
import { CREATURE, ARTIFACT, ENCHANTMENT, PLANESWALKER, BATTLE, INSTANT, SORCERY, LAND, KINDRED } from "../classes/card_type"
/***************************************************************/

export function TypesSelection(props) {

    const handleTypesChange = (selectedTypes) => {
        const newCardType = props.cardType.setTypes(selectedTypes);
        props.setCardType(newCardType);
    };

    return (
        <HStack spacing={4}>
            <Text>Types:</Text>
            <CheckboxGroup 
                name="types" 
                setValue={handleTypesChange}
                value={props.cardType.types}
            >
                <HStack spacing={4}>
                    <Checkbox value={CREATURE} displayLabel={CREATURE} />
                    <Checkbox value={ARTIFACT} displayLabel={ARTIFACT} />
                    <Checkbox value={ENCHANTMENT} displayLabel={ENCHANTMENT} />
                    <Checkbox value={PLANESWALKER} displayLabel={PLANESWALKER} />
                    <Checkbox value={BATTLE} displayLabel={BATTLE} />
                    <Checkbox value={INSTANT} displayLabel={INSTANT} />
                    <Checkbox value={SORCERY} displayLabel={SORCERY} />
                    <Checkbox value={LAND} displayLabel={LAND} />
                    <Checkbox value={KINDRED} displayLabel={KINDRED} />
                </HStack>
            </CheckboxGroup>
         </HStack>
    );
}
