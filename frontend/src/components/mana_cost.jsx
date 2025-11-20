import React from 'react';
import { Box, VStack, HStack, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from "@chakra-ui/react"
/***************************************************************/

import { Button } from "../style_components/button"
import { Text } from "../style_components/text"
import { SymbolButton } from "./symbol_button"
import { symbols } from "../ressources/symbols"
import { ManaCostObj } from "../classes/mana_cost"
/***************************************************************/

export function ManaCost(props) {

    function setManaCostFunction(symbol)
    {
        const newManaCost = props.manaCost.addSymbol(symbol);
        props.setManaCost(newManaCost);
    } 
    
    function setColorlessManaAmount(currentColorlessAmount)
    {
        const newManaCost = props.manaCost.setColorlessAmount(currentColorlessAmount + 1);
        props.setManaCost(newManaCost);
    } 

    function resetValues()
    {
        props.setManaCost(ManaCostObj.empty());
    }

    return (
        <VStack spacing={2}>
            <HStack spacing={5}>
                <Text>Mana cost:</Text>
                <SymbolButton symbol={"0"} fontSize={25} setValue={() => setColorlessManaAmount(props.manaCost.colorlessAmount)} />
                <SymbolButton symbol={symbols.White} fontSize={25} setValue={() => setManaCostFunction(symbols.White)} />
                <SymbolButton symbol={symbols.Blue} fontSize={25} setValue={() => setManaCostFunction(symbols.Blue)} />
                <SymbolButton symbol={symbols.Black} fontSize={25} setValue={() => setManaCostFunction(symbols.Black)} />
                <SymbolButton symbol={symbols.Red} fontSize={25} setValue={() => setManaCostFunction(symbols.Red)} />
                <SymbolButton symbol={symbols.Green} fontSize={25} setValue={() => setManaCostFunction(symbols.Green)} />
                
                <Button onClick={() => resetValues()}>Clear</Button>

            </HStack>
            <Accordion allowToggle>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                More mana symbols
                            </Box>
                        <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <VStack spacing={1}>
                            <HStack spacing={2}>
                                <SymbolButton symbol={symbols.Colorless} setValue={() => setManaCostFunction(symbols.Colorless)} />
                                <SymbolButton symbol={symbols.HybridWU} setValue={() => setManaCostFunction(symbols.HybridWU)} />
                                <SymbolButton symbol={symbols.HybridWB} setValue={() => setManaCostFunction(symbols.HybridWB)} />
                                <SymbolButton symbol={symbols.HybridRW} setValue={() => setManaCostFunction(symbols.HybridRW)} />
                                <SymbolButton symbol={symbols.HybridRG} setValue={() => setManaCostFunction(symbols.HybridRG)} />
                                <SymbolButton symbol={symbols.HybridGU} setValue={() => setManaCostFunction(symbols.HybridGU)} />
                                <SymbolButton symbol={symbols.HybridGW} setValue={() => setManaCostFunction(symbols.HybridGW)} />
                                <SymbolButton symbol={symbols.HybridUB} setValue={() => setManaCostFunction(symbols.HybridUB)} />
                                <SymbolButton symbol={symbols.HybridUR} setValue={() => setManaCostFunction(symbols.HybridUR)} />
                                <SymbolButton symbol={symbols.HybridBR} setValue={() => setManaCostFunction(symbols.HybridBR)} />
                                <SymbolButton symbol={symbols.HybridBG} setValue={() => setManaCostFunction(symbols.HybridBG)} />
                            </HStack>
                            <HStack spacing={2}>
                                <SymbolButton symbol={symbols.TWhite} setValue={() => setManaCostFunction(symbols.TWhite)} />
                                <SymbolButton symbol={symbols.TBlue} setValue={() => setManaCostFunction(symbols.TBlue)} />
                                <SymbolButton symbol={symbols.TBlack} setValue={() => setManaCostFunction(symbols.TBlack)} />
                                <SymbolButton symbol={symbols.TRed} setValue={() => setManaCostFunction(symbols.TRed)} />
                                <SymbolButton symbol={symbols.TGreen} setValue={() => setManaCostFunction(symbols.TGreen)} />

                                <SymbolButton symbol={symbols.PhyColorless} setValue={() => setManaCostFunction(symbols.PhyColorless)} />
                                <SymbolButton symbol={symbols.PhyWhite} setValue={() => setManaCostFunction(symbols.PhyWhite)} />
                                <SymbolButton symbol={symbols.PhyBlue} setValue={() => setManaCostFunction(symbols.PhyBlue)} />
                                <SymbolButton symbol={symbols.PhyBlack} setValue={() => setManaCostFunction(symbols.PhyBlack)} />
                                <SymbolButton symbol={symbols.PhyRed} setValue={() => setManaCostFunction(symbols.PhyRed)} />
                                <SymbolButton symbol={symbols.PhyGreen} setValue={() => setManaCostFunction(symbols.PhyGreen)} />
                            </HStack>
                            <HStack>
                                <SymbolButton symbol={symbols.XColorless} setValue={() => setManaCostFunction(symbols.XColorless)} />
                                <SymbolButton symbol={symbols.XWhite} setValue={() => setManaCostFunction(symbols.XWhite)} />
                                <SymbolButton symbol={symbols.XBlue} setValue={() => setManaCostFunction(symbols.XBlue)} />
                                <SymbolButton symbol={symbols.XBlack} setValue={() => setManaCostFunction(symbols.XBlack)} />
                                <SymbolButton symbol={symbols.XRed} setValue={() => setManaCostFunction(symbols.XRed)} />
                                <SymbolButton symbol={symbols.XGreen} setValue={() => setManaCostFunction(symbols.XGreen)} />

                                <SymbolButton symbol={symbols.Snow} setValue={() => setManaCostFunction(symbols.Snow)} />
                                <SymbolButton symbol={symbols.Inifity} setValue={() => setManaCostFunction(symbols.Inifity)} />
                                <SymbolButton symbol={symbols.Half} setValue={() => setManaCostFunction(symbols.Half)} />
                            </HStack>
                        </VStack>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
         </VStack>
    );
}
