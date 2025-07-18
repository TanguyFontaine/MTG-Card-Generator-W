import React, { useState } from 'react';
import { Box, Grid, VStack, HStack, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from "@chakra-ui/react"
/***************************************************************/

import { Textarea } from "../style_components/textarea"
import { Text } from "../style_components/text"
import { SymbolButton } from "./symbol_button"
import { symbols } from "../ressources/symbols"
import { FontSizeControler } from "./font_size_controler"
/***************************************************************/

export function SpellDescription(props) {

    function addSymbolToTextbox(symbol)
    {
        let newInputValue = props.spellDescription.concat("[" + symbol + "]")
        props.setSpellDescription(newInputValue);
    } 

    return (
        <Grid gap={4}>
            <HStack spacing='auto'>
                <Text>Abilities:</Text>
                <Textarea width="75%"
                          inputValue={props.spellDescription} setInputValue={props.setSpellDescription}
                          setValue={(value) => props.setSpellDescription(value)} 
                          placeholder="Enter the abilities or the description of your spell :"/>
                <FontSizeControler setValue={props.setSpellFontSize} value={props.spellFontSize}/>
            </HStack>

            <Accordion allowToggle>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box fontSize={14} flex="1" textAlign="left">
                                Click to expand the list of symbols.
                            </Box>
                        <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <VStack spacing={1}>
                            <HStack spacing={2}>
                                <SymbolButton symbol={1} setValue={() => addSymbolToTextbox(1)} />
                                <SymbolButton symbol={2} setValue={() => addSymbolToTextbox(2)} />
                                <SymbolButton symbol={3} setValue={() => addSymbolToTextbox(3)} />
                                <SymbolButton symbol={4} setValue={() => addSymbolToTextbox(4)} />
                                <SymbolButton symbol={5} setValue={() => addSymbolToTextbox(5)} />
                                <SymbolButton symbol={6} setValue={() => addSymbolToTextbox(6)} />
                                <SymbolButton symbol={7} setValue={() => addSymbolToTextbox(7)} />
                                <SymbolButton symbol={8} setValue={() => addSymbolToTextbox(8)} />
                                <SymbolButton symbol={9} setValue={() => addSymbolToTextbox(9)} />
                                <SymbolButton symbol={10} setValue={() => addSymbolToTextbox(10)} />
                                <SymbolButton symbol={11} setValue={() => addSymbolToTextbox(11)} />
                                <SymbolButton symbol={12} setValue={() => addSymbolToTextbox(12)} />
                                <SymbolButton symbol={13} setValue={() => addSymbolToTextbox(13)} />
                                <SymbolButton symbol={14} setValue={() => addSymbolToTextbox(14)} />
                                <SymbolButton symbol={15} setValue={() => addSymbolToTextbox(15)} />
                                <SymbolButton symbol={16} setValue={() => addSymbolToTextbox(16)} />
                                <SymbolButton symbol={17} setValue={() => addSymbolToTextbox(17)} />
                                <SymbolButton symbol={18} setValue={() => addSymbolToTextbox(18)} />
                                <SymbolButton symbol={19} setValue={() => addSymbolToTextbox(19)} />
                                <SymbolButton symbol={20} setValue={() => addSymbolToTextbox(20)} />
                                <SymbolButton symbol={symbols.Inifity} setValue={() => addSymbolToTextbox(symbols.Inifity)} />
                                <SymbolButton symbol={symbols.Half} setValue={() => addSymbolToTextbox(symbols.Half)} />
                            </HStack>
                            <HStack spacing={2}>
                                <SymbolButton symbol={symbols.Tap} setValue={() => addSymbolToTextbox(symbols.Tap)} />
                                <SymbolButton symbol={symbols.Untap} setValue={() => addSymbolToTextbox(symbols.Untap)} />
                                <Box />
                                <SymbolButton symbol={symbols.White} setValue={() => addSymbolToTextbox(symbols.White)} />
                                <SymbolButton symbol={symbols.Blue} setValue={() => addSymbolToTextbox(symbols.Blue)} />
                                <SymbolButton symbol={symbols.Black} setValue={() => addSymbolToTextbox(symbols.Black)} />
                                <SymbolButton symbol={symbols.Red} setValue={() => addSymbolToTextbox(symbols.Red)} />
                                <SymbolButton symbol={symbols.Green} setValue={() => addSymbolToTextbox(symbols.Green)} />
                                <Box />
                                <SymbolButton symbol={symbols.Colorless} setValue={() => addSymbolToTextbox(symbols.Colorless)} />
                                <Box />
                                <SymbolButton symbol={symbols.HybridWU} setValue={() => addSymbolToTextbox(symbols.HybridWU)} />
                                <SymbolButton symbol={symbols.HybridWB} setValue={() => addSymbolToTextbox(symbols.HybridWB)} />
                                <SymbolButton symbol={symbols.HybridRW} setValue={() => addSymbolToTextbox(symbols.HybridRW)} />
                                <SymbolButton symbol={symbols.HybridRG} setValue={() => addSymbolToTextbox(symbols.HybridRG)} />
                                <SymbolButton symbol={symbols.HybridGU} setValue={() => addSymbolToTextbox(symbols.HybridGU)} />
                                <SymbolButton symbol={symbols.HybridGW} setValue={() => addSymbolToTextbox(symbols.HybridGW)} />
                                <SymbolButton symbol={symbols.HybridUB} setValue={() => addSymbolToTextbox(symbols.HybridUB)} />
                                <SymbolButton symbol={symbols.HybridUR} setValue={() => addSymbolToTextbox(symbols.HybridUR)} />
                                <SymbolButton symbol={symbols.HybridBR} setValue={() => addSymbolToTextbox(symbols.HybridBR)} />
                                <SymbolButton symbol={symbols.HybridBG} setValue={() => addSymbolToTextbox(symbols.HybridBG)} />
                            </HStack>
                            <HStack spacing={2}>
                                <SymbolButton symbol={symbols.TWhite} setValue={() => addSymbolToTextbox(symbols.TWhite)} />
                                <SymbolButton symbol={symbols.TBlue} setValue={() => addSymbolToTextbox(symbols.TBlue)} />
                                <SymbolButton symbol={symbols.TBlack} setValue={() => addSymbolToTextbox(symbols.TBlack)} />
                                <SymbolButton symbol={symbols.TRed} setValue={() => addSymbolToTextbox(symbols.TRed)} />
                                <SymbolButton symbol={symbols.TGreen} setValue={() => addSymbolToTextbox(symbols.TGreen)} />
                                <Box />
                                <SymbolButton symbol={symbols.PhyColorless} setValue={() => addSymbolToTextbox(symbols.PhyColorless)} />
                                <SymbolButton symbol={symbols.PhyWhite} setValue={() => addSymbolToTextbox(symbols.PhyWhite)} />
                                <SymbolButton symbol={symbols.PhyBlue} setValue={() => addSymbolToTextbox(symbols.PhyBlue)} />
                                <SymbolButton symbol={symbols.PhyBlack} setValue={() => addSymbolToTextbox(symbols.PhyBlack)} />
                                <SymbolButton symbol={symbols.PhyRed} setValue={() => addSymbolToTextbox(symbols.PhyRed)} />
                                <SymbolButton symbol={symbols.PhyGreen} setValue={() => addSymbolToTextbox(symbols.PhyGreen)} />
                                <Box />
                                <SymbolButton symbol={symbols.XColorless} setValue={() => addSymbolToTextbox(symbols.XColorless)} />
                                <SymbolButton symbol={symbols.XWhite} setValue={() => addSymbolToTextbox(symbols.XWhite)} />
                                <SymbolButton symbol={symbols.XBlue} setValue={() => addSymbolToTextbox(symbols.XBlue)} />
                                <SymbolButton symbol={symbols.XBlack} setValue={() => addSymbolToTextbox(symbols.XBlack)} />
                                <SymbolButton symbol={symbols.XRed} setValue={() => addSymbolToTextbox(symbols.XRed)} />
                                <SymbolButton symbol={symbols.XGreen} setValue={() => addSymbolToTextbox(symbols.XGreen)} />
                                <Box />
                                <SymbolButton symbol={symbols.Snow} symbolOnly={true} setValue={() => addSymbolToTextbox(symbols.Snow)} />
                                <SymbolButton symbol={symbols.Energy} symbolOnly={true} setValue={() => addSymbolToTextbox(symbols.Energy)} />

                            </HStack>
                        </VStack>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>

        </Grid>
    );
}
