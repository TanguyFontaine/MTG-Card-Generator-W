import React from 'react';
import { Box } from "@chakra-ui/react"
/***************************************************************/

import { Symbol } from "./symbol"
/***************************************************************/

export function SymbolButton(props) {
    const { setValue, symbol, symbolOnly, shadow, ...otherProps } = props;
    
    return (
        <Box as="button" fontSize={20} onClick={setValue} {...otherProps}>
            <Symbol symbol={symbol} symbolOnly={symbolOnly} shadow={shadow || true}/>
        </Box>
    );
}