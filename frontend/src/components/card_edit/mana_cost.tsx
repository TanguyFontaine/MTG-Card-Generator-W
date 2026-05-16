import { Box, VStack, HStack, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from "@chakra-ui/react";
/***************************************************************/

import { Button } from "../../style_components/button";
import { Text } from "../../style_components/text";
import { SymbolButton } from "./symbol_button";
import { symbols } from "../../ressources/symbols";
import { ManaCostObj } from "../../classes/mana_cost";
import { useCardContext } from "../../contexts/card_context";
import { CardActionName } from "../../contexts/card_actions";
/***************************************************************/

export function ManaCost()
{
   const { state, dispatch } = useCardContext();

   function setManaCostFunction(symbol: string)
   {
      const newManaCost = state.manaCost.addSymbol(symbol);
      dispatch({ name: CardActionName.setManaCost, data: newManaCost });
   }

   function setColorlessManaAmount(currentColorlessAmount: number)
   {
      const newManaCost = state.manaCost.setColorlessAmount(currentColorlessAmount + 1);
      dispatch({ name: CardActionName.setManaCost, data: newManaCost });
   }

   function resetValues()
   {
      dispatch({ name: CardActionName.setManaCost, data: ManaCostObj.newEmpty() });
   }

   return (
      <VStack spacing={2} align="stretch">
         <HStack justify="space-between">
            <Text color="brand.textSecondary">Mana cost:</Text>

            <Button variant="outline" size="sm" onClick={() => resetValues()}>Clear</Button>

         </HStack>
         <HStack spacing={4} overflowX="auto" pb={1} justify="center">
            <SymbolButton symbol={"0"} fontSize={25} setValue={() => setColorlessManaAmount(state.manaCost.colorlessAmount)} />
            <SymbolButton symbol={symbols.White} fontSize={25} setValue={() => setManaCostFunction(symbols.White)} />
            <SymbolButton symbol={symbols.Blue} fontSize={25} setValue={() => setManaCostFunction(symbols.Blue)} />
            <SymbolButton symbol={symbols.Black} fontSize={25} setValue={() => setManaCostFunction(symbols.Black)} />
            <SymbolButton symbol={symbols.Red} fontSize={25} setValue={() => setManaCostFunction(symbols.Red)} />
            <SymbolButton symbol={symbols.Green} fontSize={25} setValue={() => setManaCostFunction(symbols.Green)} />
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
                  <HStack spacing={6} justify="center" flexWrap="wrap" rowGap={1}>
                     <HStack spacing={1} flexWrap="wrap" rowGap={0} justify="center">
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
                     <HStack spacing={2} justify="center" flexWrap="wrap">
                        <SymbolButton symbol={symbols.TwoGenWhite} setValue={() => setManaCostFunction(symbols.TwoGenWhite)} />
                        <SymbolButton symbol={symbols.TwoGenBlue} setValue={() => setManaCostFunction(symbols.TwoGenBlue)} />
                        <SymbolButton symbol={symbols.TwoGenBlack} setValue={() => setManaCostFunction(symbols.TwoGenBlack)} />
                        <SymbolButton symbol={symbols.TwoGenRed} setValue={() => setManaCostFunction(symbols.TwoGenRed)} />
                        <SymbolButton symbol={symbols.TwoGenGreen} setValue={() => setManaCostFunction(symbols.TwoGenGreen)} />
                     </HStack>
                     <HStack spacing={2} justify="center" flexWrap="wrap">
                        <SymbolButton symbol={symbols.ColorlessWhite} setValue={() => setManaCostFunction(symbols.ColorlessWhite)} />
                        <SymbolButton symbol={symbols.ColorlessBlue} setValue={() => setManaCostFunction(symbols.ColorlessBlue)} />
                        <SymbolButton symbol={symbols.ColorlessBlack} setValue={() => setManaCostFunction(symbols.ColorlessBlack)} />
                        <SymbolButton symbol={symbols.ColorlessRed} setValue={() => setManaCostFunction(symbols.ColorlessRed)} />
                        <SymbolButton symbol={symbols.ColorlessGreen} setValue={() => setManaCostFunction(symbols.ColorlessGreen)} />
                     </HStack>
                     <HStack spacing={2} justify="center" flexWrap="wrap">
                        <SymbolButton symbol={symbols.PhyColorless} setValue={() => setManaCostFunction(symbols.PhyColorless)} />
                        <SymbolButton symbol={symbols.PhyWhite} setValue={() => setManaCostFunction(symbols.PhyWhite)} />
                        <SymbolButton symbol={symbols.PhyBlue} setValue={() => setManaCostFunction(symbols.PhyBlue)} />
                        <SymbolButton symbol={symbols.PhyBlack} setValue={() => setManaCostFunction(symbols.PhyBlack)} />
                        <SymbolButton symbol={symbols.PhyRed} setValue={() => setManaCostFunction(symbols.PhyRed)} />
                        <SymbolButton symbol={symbols.PhyGreen} setValue={() => setManaCostFunction(symbols.PhyGreen)} />
                     </HStack>
                     <HStack spacing={1} justify="center" flexWrap="wrap">
                        <SymbolButton symbol={symbols.HybridPhyWU} setValue={() => setManaCostFunction(symbols.HybridPhyWU)} />
                        <SymbolButton symbol={symbols.HybridPhyWB} setValue={() => setManaCostFunction(symbols.HybridPhyWB)} />
                        <SymbolButton symbol={symbols.HybridPhyRW} setValue={() => setManaCostFunction(symbols.HybridPhyRW)} />
                        <SymbolButton symbol={symbols.HybridPhyRG} setValue={() => setManaCostFunction(symbols.HybridPhyRG)} />
                        <SymbolButton symbol={symbols.HybridPhyGU} setValue={() => setManaCostFunction(symbols.HybridPhyGU)} />
                        <SymbolButton symbol={symbols.HybridPhyGW} setValue={() => setManaCostFunction(symbols.HybridPhyGW)} />
                        <SymbolButton symbol={symbols.HybridPhyUB} setValue={() => setManaCostFunction(symbols.HybridPhyUB)} />
                        <SymbolButton symbol={symbols.HybridPhyUR} setValue={() => setManaCostFunction(symbols.HybridPhyUR)} />
                        <SymbolButton symbol={symbols.HybridPhyBR} setValue={() => setManaCostFunction(symbols.HybridPhyBR)} />
                        <SymbolButton symbol={symbols.HybridPhyBG} setValue={() => setManaCostFunction(symbols.HybridPhyBG)} />
                     </HStack>
                     <HStack spacing={2} justify="center" flexWrap="wrap">
                        <SymbolButton symbol={symbols.XColorless} setValue={() => setManaCostFunction(symbols.XColorless)} />
                        <SymbolButton symbol={symbols.XWhite} setValue={() => setManaCostFunction(symbols.XWhite)} />
                        <SymbolButton symbol={symbols.XBlue} setValue={() => setManaCostFunction(symbols.XBlue)} />
                        <SymbolButton symbol={symbols.XBlack} setValue={() => setManaCostFunction(symbols.XBlack)} />
                        <SymbolButton symbol={symbols.XRed} setValue={() => setManaCostFunction(symbols.XRed)} />
                        <SymbolButton symbol={symbols.XGreen} setValue={() => setManaCostFunction(symbols.XGreen)} />
                     </HStack>
                     <HStack spacing={4} justify="center" flexWrap="wrap">
                        <SymbolButton symbol={symbols.Colorless} setValue={() => setManaCostFunction(symbols.Colorless)} />
                        <SymbolButton symbol={symbols.Snow} setValue={() => setManaCostFunction(symbols.Snow)} />
                        <SymbolButton symbol={symbols.Infinity} setValue={() => setManaCostFunction(symbols.Infinity)} />
                        <SymbolButton symbol={symbols.Half} setValue={() => setManaCostFunction(symbols.Half)} />                     </HStack>
                  </HStack>
               </AccordionPanel>
            </AccordionItem>
         </Accordion>
      </VStack>
   );
}
