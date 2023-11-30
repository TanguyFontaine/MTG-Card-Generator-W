import React from 'react';
import { HStack } from "@chakra-ui/react"
/***************************************************************/

import { Checkbox } from "../style_components/checkbox"
import { CheckboxGroup } from "../style_components/checkbox_group"
import { Text } from "../style_components/text"
/***************************************************************/

export function SuperTypesSelection(props) {
    return (
        <HStack spacing={2}>
            <Text>Super types:</Text>
            <CheckboxGroup name="superTypes" setValue={(value) => props.setSuperTypes(value)}>
                <HStack spacing={4}>
                    <Checkbox value="Legendary" displayLabel="Legendary" />
                    <Checkbox value="Snow" displayLabel="Snow" />
                    <Checkbox value="Basic" displayLabel="Basic" />
                    <Checkbox value="Token" displayLabel="Token" />
                </HStack>
            </CheckboxGroup>
         </HStack>
    );
}
