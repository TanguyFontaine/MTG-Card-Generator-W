import React, { useState } from 'react';
import { Box, VStack, HStack } from "@chakra-ui/react"
/***************************************************************/

import { Button } from "../style_components/button"
import { Text } from "../style_components/text"
import { ManaSymbol } from "./mana_symbol"
import { symbols } from "../ressources/symbols"

/***************************************************************/

export function ManaCost(props) {
    let [colorlessAmount, setColorlessAmount] = useState(0)
    let [manaCostSymbols, setManaCostSymbols] =  useState([])

    const displayableManaCost = manaCostSymbols.map((symbol) => <Box><ManaSymbol symbol={symbol} shadow={false}/></Box>);

    function resetValues() {
        setManaCostSymbols([])
        setColorlessAmount(0)
    }

    return (
        <VStack spacing={2}>
            <HStack spacing={5}>
                <Text>Mana cost :</Text>
                <Box as="button" fontSize={30} onClick={() => setColorlessAmount(colorlessAmount + 1)}><ManaSymbol symbol={0} shadow={true}/></Box>
                <Box as="button" fontSize={30} onClick={() => setManaCostSymbols(manaCostSymbols.concat(symbols.White))}><ManaSymbol symbol={symbols.White} shadow={true}/></Box>
                <Box as="button" fontSize={30} onClick={() => setManaCostSymbols(manaCostSymbols.concat(symbols.Blue))}><ManaSymbol symbol={symbols.Blue} shadow={true}/></Box>
                <Box as="button" fontSize={30} onClick={() => setManaCostSymbols(manaCostSymbols.concat(symbols.Black))}><ManaSymbol symbol={symbols.Black} shadow={true}/></Box>
                <Box as="button" fontSize={30} onClick={() => setManaCostSymbols(manaCostSymbols.concat(symbols.Red))}><ManaSymbol symbol={symbols.Red} shadow={true}/></Box>
                <Box as="button" fontSize={30} onClick={() => setManaCostSymbols(manaCostSymbols.concat(symbols.Green))}><ManaSymbol symbol={symbols.Green} shadow={true}/></Box>
                <Button onClick={() => resetValues()}>Clear</Button>
            </HStack>
            <HStack spacing={1}>
                {colorlessAmount > 0 ? <Box><ManaSymbol symbol={colorlessAmount} shadow={false}/></Box> : <Box />}
                <HStack spacing={1}> 
                    {displayableManaCost}
                </HStack>
            </HStack>
         </VStack>
    );
}
