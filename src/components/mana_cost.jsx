import React, { useState } from 'react';
import { Box, VStack, HStack, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from "@chakra-ui/react"
/***************************************************************/

import { Button } from "../style_components/button"
import { Text } from "../style_components/text"
import { ManaSymbol } from "./mana_symbol"
import { symbols } from "../ressources/symbols"

/***************************************************************/

function ManaSymbolElement(props) {
    return (
        <Box as="button" onClick={() => props.setManaCost(props.manaCost.concat(props.symbol))} {...props}>
            <ManaSymbol symbol={props.symbol} shadow={true}/>
        </Box>
    );
}

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
                <ManaSymbolElement symbol={symbols.White} fontSize={30} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                <ManaSymbolElement symbol={symbols.Blue} fontSize={30} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                <ManaSymbolElement symbol={symbols.Black} fontSize={30} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                <ManaSymbolElement symbol={symbols.Red} fontSize={30} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                <ManaSymbolElement symbol={symbols.Green} fontSize={30} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                
                <Button onClick={() => resetValues()}>Clear</Button>

            </HStack>
            <Accordion allowToggle>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                More symbols
                            </Box>
                        <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <VStack spacing={1}>
                            <HStack spacing={2}>
                                <ManaSymbolElement symbol={symbols.Colorless} fontSize={20} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                                <ManaSymbolElement symbol={symbols.HybridWU} fontSize={20} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                                <ManaSymbolElement symbol={symbols.HybridWB} fontSize={20} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                                <ManaSymbolElement symbol={symbols.HybridRW} fontSize={20} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                                <ManaSymbolElement symbol={symbols.HybridRG} fontSize={20} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                                <ManaSymbolElement symbol={symbols.HybridGU} fontSize={20} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                                <ManaSymbolElement symbol={symbols.HybridGW} fontSize={20} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                                <ManaSymbolElement symbol={symbols.HybridUB} fontSize={20} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                                <ManaSymbolElement symbol={symbols.HybridUR} fontSize={20} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                                <ManaSymbolElement symbol={symbols.HybridBR} fontSize={20} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                                <ManaSymbolElement symbol={symbols.HybridBG} fontSize={20} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                            </HStack>
                            <HStack spacing={2}>
                                <ManaSymbolElement symbol={symbols.TWhite} fontSize={20} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                                <ManaSymbolElement symbol={symbols.TBlue} fontSize={20} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                                <ManaSymbolElement symbol={symbols.TBlack} fontSize={20} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                                <ManaSymbolElement symbol={symbols.TRed} fontSize={20} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                                <ManaSymbolElement symbol={symbols.TGreen} fontSize={20} manaCost={props.manaCost} setManaCost={props.setManaCost} />

                                <ManaSymbolElement symbol={symbols.PhyColorless} fontSize={20} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                                <ManaSymbolElement symbol={symbols.PhyWhite} fontSize={20} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                                <ManaSymbolElement symbol={symbols.PhyBlue} fontSize={20} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                                <ManaSymbolElement symbol={symbols.PhyBlack} fontSize={20} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                                <ManaSymbolElement symbol={symbols.PhyRed} fontSize={20} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                                <ManaSymbolElement symbol={symbols.PhyGreen} fontSize={20} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                            </HStack>
                            <HStack>
                                <ManaSymbolElement symbol={symbols.Snow} fontSize={20} manaCost={props.manaCost} setManaCost={props.setManaCost} />

                                <ManaSymbolElement symbol={symbols.XColorless} fontSize={20} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                                <ManaSymbolElement symbol={symbols.XWhite} fontSize={20} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                                <ManaSymbolElement symbol={symbols.XBlue} fontSize={20} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                                <ManaSymbolElement symbol={symbols.XBlack} fontSize={20} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                                <ManaSymbolElement symbol={symbols.XRed} fontSize={20} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                                <ManaSymbolElement symbol={symbols.XGreen} fontSize={20} manaCost={props.manaCost} setManaCost={props.setManaCost} />
                            </HStack>
                        </VStack>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
         </VStack>
    );
}
