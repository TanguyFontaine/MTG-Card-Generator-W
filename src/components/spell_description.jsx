import React, { useState } from 'react';
import { Box, Grid, VStack, HStack, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from "@chakra-ui/react"
/***************************************************************/

import { Textarea } from "../style_components/textarea"
import { Text } from "../style_components/text"
import { SymbolButton } from "./symbol_button"
import { symbols } from "../ressources/symbols"
/***************************************************************/

export function SpellDescription(props) {

    const [selectedSymbol, setSelectedSymbol] = useState("")

    return (
        <Grid gap={4}>
            <HStack spacing={2}>
                <Text>Abilities :</Text>
                <Textarea setValue={(value) => props.setSpellDescription(value)} placeholder="Enter the abilities or the description of your spell :"/>
            </HStack>

            <Accordion allowToggle>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                Symbol codes (add the following code between [ ] to display the symbol) : {selectedSymbol}
                            </Box>
                        <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <VStack spacing={1}>
                            <HStack spacing={2}>
                                <SymbolButton symbol={1} setValue={() => setSelectedSymbol(1)} />
                                <SymbolButton symbol={2} setValue={() => setSelectedSymbol(2)} />
                                <SymbolButton symbol={3} setValue={() => setSelectedSymbol(3)} />
                                <SymbolButton symbol={4} setValue={() => setSelectedSymbol(4)} />
                                <SymbolButton symbol={5} setValue={() => setSelectedSymbol(5)} />
                                <SymbolButton symbol={6} setValue={() => setSelectedSymbol(6)} />
                                <SymbolButton symbol={7} setValue={() => setSelectedSymbol(7)} />
                                <SymbolButton symbol={8} setValue={() => setSelectedSymbol(8)} />
                                <SymbolButton symbol={9} setValue={() => setSelectedSymbol(9)} />
                                <SymbolButton symbol={10} setValue={() => setSelectedSymbol(10)} />
                                <SymbolButton symbol={11} setValue={() => setSelectedSymbol(11)} />
                                <SymbolButton symbol={12} setValue={() => setSelectedSymbol(12)} />
                                <SymbolButton symbol={13} setValue={() => setSelectedSymbol(13)} />
                                <SymbolButton symbol={14} setValue={() => setSelectedSymbol(14)} />
                                <SymbolButton symbol={15} setValue={() => setSelectedSymbol(15)} />
                                <SymbolButton symbol={16} setValue={() => setSelectedSymbol(16)} />
                                <SymbolButton symbol={17} setValue={() => setSelectedSymbol(17)} />
                                <SymbolButton symbol={18} setValue={() => setSelectedSymbol(18)} />
                                <SymbolButton symbol={19} setValue={() => setSelectedSymbol(19)} />
                                <SymbolButton symbol={20} setValue={() => setSelectedSymbol(20)} />
                                <SymbolButton symbol={symbols.Inifity} setValue={() => setSelectedSymbol(symbols.Inifity)} />
                                <SymbolButton symbol={symbols.Half} setValue={() => setSelectedSymbol(symbols.Half)} />
                            </HStack>
                            <HStack spacing={2}>
                                <SymbolButton symbol={symbols.Tap} setValue={() => setSelectedSymbol(symbols.Tap)} />
                                <SymbolButton symbol={symbols.Untap} setValue={() => setSelectedSymbol(symbols.Untap)} />
                                <Box />
                                <SymbolButton symbol={symbols.White} setValue={() => setSelectedSymbol(symbols.White)} />
                                <SymbolButton symbol={symbols.Blue} setValue={() => setSelectedSymbol(symbols.Blue)} />
                                <SymbolButton symbol={symbols.Black} setValue={() => setSelectedSymbol(symbols.Black)} />
                                <SymbolButton symbol={symbols.Red} setValue={() => setSelectedSymbol(symbols.Red)} />
                                <SymbolButton symbol={symbols.Green} setValue={() => setSelectedSymbol(symbols.Green)} />
                                <Box />
                                <SymbolButton symbol={symbols.Colorless} setValue={() => setSelectedSymbol(symbols.Colorless)} />
                                <Box />
                                <SymbolButton symbol={symbols.HybridWU} setValue={() => setSelectedSymbol(symbols.HybridWU)} />
                                <SymbolButton symbol={symbols.HybridWB} setValue={() => setSelectedSymbol(symbols.HybridWB)} />
                                <SymbolButton symbol={symbols.HybridRW} setValue={() => setSelectedSymbol(symbols.HybridRW)} />
                                <SymbolButton symbol={symbols.HybridRG} setValue={() => setSelectedSymbol(symbols.HybridRG)} />
                                <SymbolButton symbol={symbols.HybridGU} setValue={() => setSelectedSymbol(symbols.HybridGU)} />
                                <SymbolButton symbol={symbols.HybridGW} setValue={() => setSelectedSymbol(symbols.HybridGW)} />
                                <SymbolButton symbol={symbols.HybridUB} setValue={() => setSelectedSymbol(symbols.HybridUB)} />
                                <SymbolButton symbol={symbols.HybridUR} setValue={() => setSelectedSymbol(symbols.HybridUR)} />
                                <SymbolButton symbol={symbols.HybridBR} setValue={() => setSelectedSymbol(symbols.HybridBR)} />
                                <SymbolButton symbol={symbols.HybridBG} setValue={() => setSelectedSymbol(symbols.HybridBG)} />
                            </HStack>
                            <HStack spacing={2}>
                                <SymbolButton symbol={symbols.TWhite} setValue={() => setSelectedSymbol(symbols.TWhite)} />
                                <SymbolButton symbol={symbols.TBlue} setValue={() => setSelectedSymbol(symbols.TBlue)} />
                                <SymbolButton symbol={symbols.TBlack} setValue={() => setSelectedSymbol(symbols.TBlack)} />
                                <SymbolButton symbol={symbols.TRed} setValue={() => setSelectedSymbol(symbols.TRed)} />
                                <SymbolButton symbol={symbols.TGreen} setValue={() => setSelectedSymbol(symbols.TGreen)} />
                                <Box />
                                <SymbolButton symbol={symbols.PhyColorless} setValue={() => setSelectedSymbol(symbols.PhyColorless)} />
                                <SymbolButton symbol={symbols.PhyWhite} setValue={() => setSelectedSymbol(symbols.PhyWhite)} />
                                <SymbolButton symbol={symbols.PhyBlue} setValue={() => setSelectedSymbol(symbols.PhyBlue)} />
                                <SymbolButton symbol={symbols.PhyBlack} setValue={() => setSelectedSymbol(symbols.PhyBlack)} />
                                <SymbolButton symbol={symbols.PhyRed} setValue={() => setSelectedSymbol(symbols.PhyRed)} />
                                <SymbolButton symbol={symbols.PhyGreen} setValue={() => setSelectedSymbol(symbols.PhyGreen)} />
                                <Box />
                                <SymbolButton symbol={symbols.XColorless} setValue={() => setSelectedSymbol(symbols.XColorless)} />
                                <SymbolButton symbol={symbols.XWhite} setValue={() => setSelectedSymbol(symbols.XWhite)} />
                                <SymbolButton symbol={symbols.XBlue} setValue={() => setSelectedSymbol(symbols.XBlue)} />
                                <SymbolButton symbol={symbols.XBlack} setValue={() => setSelectedSymbol(symbols.XBlack)} />
                                <SymbolButton symbol={symbols.XRed} setValue={() => setSelectedSymbol(symbols.XRed)} />
                                <SymbolButton symbol={symbols.XGreen} setValue={() => setSelectedSymbol(symbols.XGreen)} />
                                <Box />
                                <SymbolButton symbol={symbols.Snow} symbolOnly={true} setValue={() => setSelectedSymbol(symbols.Snow)} />
                                <SymbolButton symbol={symbols.Energy} symbolOnly={true} setValue={() => setSelectedSymbol(symbols.Energy)} />

                            </HStack>
                        </VStack>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>

        </Grid>
    );
}
