import React from 'react';
import { Button as ChakraButton}  from "@chakra-ui/react"
/***************************************************************/

export function Button(props) {
    return (
        <ChakraButton size="md" {...props} />
    );
}