import React from 'react';
import { Text as ChakraText}  from "@chakra-ui/react"

/***************************************************************/
export function Text(props) {
    return (
        <ChakraText isTruncated={true} {...props} />
    );
}