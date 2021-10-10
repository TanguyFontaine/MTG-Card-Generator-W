import React, { useState } from 'react';
import { Box, VStack, HStack } from "@chakra-ui/react"
/***************************************************************/

import { Button } from "../style_components/button"
import { Text } from "../style_components/text"
import { ManaSymbol } from "./mana_symbol"
import { symbols } from "../ressources/symbols"

/***************************************************************/

export function ManaCost(props) {
    const setManaCostFunction = props.setManaCost
    const manaCost = props.manaCost

    const setColorlessManaAmount = props.setColorlessManaAmount
    const colorlessManaAmount = props.colorlessManaAmount

    function resetValues() {
        setManaCostFunction([])
        setColorlessManaAmount(0)
    }

    return (
        <VStack spacing={2}>
            <HStack spacing={5}>
                <Text>Mana cost :</Text>
                <Box as="button" fontSize={30} onClick={() => setColorlessManaAmount(colorlessManaAmount + 1)}><ManaSymbol symbol={0} shadow={true}/></Box>
                <Box as="button" fontSize={30} onClick={() => setManaCostFunction(manaCost.concat(symbols.White))}><ManaSymbol symbol={symbols.White} shadow={true}/></Box>
                <Box as="button" fontSize={30} onClick={() => setManaCostFunction(manaCost.concat(symbols.Blue))}><ManaSymbol symbol={symbols.Blue} shadow={true}/></Box>
                <Box as="button" fontSize={30} onClick={() => setManaCostFunction(manaCost.concat(symbols.Black))}><ManaSymbol symbol={symbols.Black} shadow={true}/></Box>
                <Box as="button" fontSize={30} onClick={() => setManaCostFunction(manaCost.concat(symbols.Red))}><ManaSymbol symbol={symbols.Red} shadow={true}/></Box>
                <Box as="button" fontSize={30} onClick={() => setManaCostFunction(manaCost.concat(symbols.Green))}><ManaSymbol symbol={symbols.Green} shadow={true}/></Box>
                <Button onClick={() => resetValues()}>Clear</Button>
            </HStack>
         </VStack>
    );
}
