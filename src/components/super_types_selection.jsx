import React from 'react';
import { HStack } from "@chakra-ui/react"
/**************************************************** */

import { Checkbox } from "../style_components/checkbox"
import { CheckboxGroup } from "../style_components/checkbox_group"
import { Text } from "../style_components/text"


/***************************************************************/
export function SuperTypesSelection(props) {
    return (
        <HStack spacing={2}>
            <Text>Select super types :</Text>
            <CheckboxGroup name="superTypes" setValue={(value) => props.setSuperTypes(value)}>
                <HStack spacing={4}>
                    <Checkbox value="legendary" displayLabel="Legendary" />
                    <Checkbox value="snow" displayLabel="Snow" />
                    <Checkbox value="basic" displayLabel="Basic" />
                    <Checkbox value="token" displayLabel="Token" />
                </HStack>
            </CheckboxGroup>
         </HStack>
    );
}