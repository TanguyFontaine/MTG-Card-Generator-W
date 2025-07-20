import React from 'react';
import { Box } from "@chakra-ui/react"
/***************************************************************/

import { Symbol } from "./symbol"
/***************************************************************/

export function SymbolButton(props) {
    return (
        <Box as="button" fontSize={20} onClick={props.setValue} {...props}>
            <Symbol symbol={props.symbol} symbolOnly={props.symbolOnly} shadow={true}/>
        </Box>
    );
}