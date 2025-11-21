import React from 'react';
import { HStack } from "@chakra-ui/react"
/***************************************************************/

import { Checkbox } from "../style_components/checkbox"
import { CheckboxGroup } from "../style_components/checkbox_group"
import { Text } from "../style_components/text"
import { LEGENDARY, SNOW, BASIC, TOKEN } from "../classes/card_type"
/***************************************************************/

export function SuperTypesSelection(props) {
    
    const handleSuperTypesChange = (selectedSuperTypes) => {
        const newCardType = props.cardType.setSuperTypes(selectedSuperTypes);
        props.setCardType(newCardType);
    };

    return (
        <HStack spacing={2}>
            <Text>Super types:</Text>
            <CheckboxGroup 
                name="superTypes" 
                setValue={handleSuperTypesChange}
                value={props.cardType.superTypes}
            >
                <HStack spacing={4}>
                    <Checkbox value={LEGENDARY} displayLabel={LEGENDARY} />
                    <Checkbox value={SNOW} displayLabel={SNOW} />
                    <Checkbox value={BASIC} displayLabel={BASIC} />
                    <Checkbox value={TOKEN} displayLabel={TOKEN} />
                </HStack>
            </CheckboxGroup>
         </HStack>
    );
}
