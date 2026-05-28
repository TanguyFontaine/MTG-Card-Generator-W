import { Box, Grid, HStack, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from "@chakra-ui/react";
/***************************************************************/

import { Textarea } from "../../../style_components/textarea";
import { Text } from "../../../style_components/text";
import { SymbolButton } from "../symbols/symbol_button";
import { formatSymbol } from "../../../utils";
import { symbols } from "../../../resources/symbols";
import { FontSizeController } from "../font_size/font_size_controller";
/***************************************************************/

interface SpellDescriptionProps
{
   value: string;
   setValue: (value: string) => void;
   fontSize?: number;
   setFontSize?: (value: number) => void;
}

export function SpellDescription({ value, setValue, fontSize, setFontSize }: SpellDescriptionProps)
{
   function addSymbolToTextbox(symbol: string | number)
   {
      setValue(value.concat(formatSymbol(symbol)));
   }

   return (
      <Grid gap={4}>
         <HStack w="100%" justify="space-between" flexWrap="wrap" rowGap={2}>
            <Text color="brand.textSecondary" minW="70px">Abilities:</Text>
            <Textarea flex="1" minW="120px"
               inputValue={value} setInputValue={setValue}
               setValue={setValue}
               placeholder="Enter the abilities or the description of your spell :" />
            {fontSize !== undefined && setFontSize !== undefined &&
               <FontSizeController setValue={setFontSize} value={fontSize} />
            }
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
                  <HStack spacing={6} justify="center" flexWrap="wrap" rowGap={1}>
                     <HStack spacing={2} justify="center" flexWrap="wrap" rowGap={0}>
                        <SymbolButton symbol={0} setValue={() => addSymbolToTextbox(0)} />
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
                        <SymbolButton symbol={symbols.Infinity} setValue={() => addSymbolToTextbox(symbols.Infinity)} />
                        <SymbolButton symbol={symbols.Half} setValue={() => addSymbolToTextbox(symbols.Half)} />
                     </HStack>
                     <HStack spacing={3} justify="center" flexWrap="wrap">
                        <SymbolButton symbol={symbols.White} setValue={() => addSymbolToTextbox(symbols.White)} />
                        <SymbolButton symbol={symbols.Blue} setValue={() => addSymbolToTextbox(symbols.Blue)} />
                        <SymbolButton symbol={symbols.Black} setValue={() => addSymbolToTextbox(symbols.Black)} />
                        <SymbolButton symbol={symbols.Red} setValue={() => addSymbolToTextbox(symbols.Red)} />
                        <SymbolButton symbol={symbols.Green} setValue={() => addSymbolToTextbox(symbols.Green)} />
                        <SymbolButton symbol={symbols.Colorless} setValue={() => addSymbolToTextbox(symbols.Colorless)} />
                     </HStack>
                     <HStack spacing={1} justify="center" flexWrap="wrap">
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
                     <HStack spacing={2} justify="center" flexWrap="wrap">
                        <SymbolButton symbol={symbols.TwoGenWhite} setValue={() => addSymbolToTextbox(symbols.TwoGenWhite)} />
                        <SymbolButton symbol={symbols.TwoGenBlue} setValue={() => addSymbolToTextbox(symbols.TwoGenBlue)} />
                        <SymbolButton symbol={symbols.TwoGenBlack} setValue={() => addSymbolToTextbox(symbols.TwoGenBlack)} />
                        <SymbolButton symbol={symbols.TwoGenRed} setValue={() => addSymbolToTextbox(symbols.TwoGenRed)} />
                        <SymbolButton symbol={symbols.TwoGenGreen} setValue={() => addSymbolToTextbox(symbols.TwoGenGreen)} />
                     </HStack>
                     <HStack spacing={2} justify="center" flexWrap="wrap">
                        <SymbolButton symbol={symbols.ColorlessWhite} setValue={() => addSymbolToTextbox(symbols.ColorlessWhite)} />
                        <SymbolButton symbol={symbols.ColorlessBlue} setValue={() => addSymbolToTextbox(symbols.ColorlessBlue)} />
                        <SymbolButton symbol={symbols.ColorlessBlack} setValue={() => addSymbolToTextbox(symbols.ColorlessBlack)} />
                        <SymbolButton symbol={symbols.ColorlessRed} setValue={() => addSymbolToTextbox(symbols.ColorlessRed)} />
                        <SymbolButton symbol={symbols.ColorlessGreen} setValue={() => addSymbolToTextbox(symbols.ColorlessGreen)} />
                     </HStack>
                     <HStack spacing={2} justify="center" flexWrap="wrap">
                        <SymbolButton symbol={symbols.PhyColorless} setValue={() => addSymbolToTextbox(symbols.PhyColorless)} />
                        <SymbolButton symbol={symbols.PhyWhite} setValue={() => addSymbolToTextbox(symbols.PhyWhite)} />
                        <SymbolButton symbol={symbols.PhyBlue} setValue={() => addSymbolToTextbox(symbols.PhyBlue)} />
                        <SymbolButton symbol={symbols.PhyBlack} setValue={() => addSymbolToTextbox(symbols.PhyBlack)} />
                        <SymbolButton symbol={symbols.PhyRed} setValue={() => addSymbolToTextbox(symbols.PhyRed)} />
                        <SymbolButton symbol={symbols.PhyGreen} setValue={() => addSymbolToTextbox(symbols.PhyGreen)} />
                     </HStack>
                     <HStack spacing={1} justify="center" flexWrap="wrap">
                        <SymbolButton symbol={symbols.HybridPhyWU} setValue={() => addSymbolToTextbox(symbols.HybridPhyWU)} />
                        <SymbolButton symbol={symbols.HybridPhyWB} setValue={() => addSymbolToTextbox(symbols.HybridPhyWB)} />
                        <SymbolButton symbol={symbols.HybridPhyRW} setValue={() => addSymbolToTextbox(symbols.HybridPhyRW)} />
                        <SymbolButton symbol={symbols.HybridPhyRG} setValue={() => addSymbolToTextbox(symbols.HybridPhyRG)} />
                        <SymbolButton symbol={symbols.HybridPhyGU} setValue={() => addSymbolToTextbox(symbols.HybridPhyGU)} />
                        <SymbolButton symbol={symbols.HybridPhyGW} setValue={() => addSymbolToTextbox(symbols.HybridPhyGW)} />
                        <SymbolButton symbol={symbols.HybridPhyUB} setValue={() => addSymbolToTextbox(symbols.HybridPhyUB)} />
                        <SymbolButton symbol={symbols.HybridPhyUR} setValue={() => addSymbolToTextbox(symbols.HybridPhyUR)} />
                        <SymbolButton symbol={symbols.HybridPhyBR} setValue={() => addSymbolToTextbox(symbols.HybridPhyBR)} />
                        <SymbolButton symbol={symbols.HybridPhyBG} setValue={() => addSymbolToTextbox(symbols.HybridPhyBG)} />
                     </HStack>
                     <HStack spacing={2} justify="center" flexWrap="wrap">
                        <SymbolButton symbol={symbols.XColorless} setValue={() => addSymbolToTextbox(symbols.XColorless)} />
                        <SymbolButton symbol={symbols.XWhite} setValue={() => addSymbolToTextbox(symbols.XWhite)} />
                        <SymbolButton symbol={symbols.XBlue} setValue={() => addSymbolToTextbox(symbols.XBlue)} />
                        <SymbolButton symbol={symbols.XBlack} setValue={() => addSymbolToTextbox(symbols.XBlack)} />
                        <SymbolButton symbol={symbols.XRed} setValue={() => addSymbolToTextbox(symbols.XRed)} />
                        <SymbolButton symbol={symbols.XGreen} setValue={() => addSymbolToTextbox(symbols.XGreen)} />
                     </HStack>
                     <HStack spacing={2} justify="center" flexWrap="wrap">
                        <SymbolButton symbol={symbols.Tap} setValue={() => addSymbolToTextbox(symbols.Tap)} />
                        <SymbolButton symbol={symbols.Untap} setValue={() => addSymbolToTextbox(symbols.Untap)} />
                        <SymbolButton symbol={symbols.Snow} symbolOnly={true} setValue={() => addSymbolToTextbox(symbols.Snow)} />
                        <SymbolButton symbol={symbols.Energy} symbolOnly={true} setValue={() => addSymbolToTextbox(symbols.Energy)} />
                     </HStack>
                  </HStack>
               </AccordionPanel>
            </AccordionItem>
         </Accordion>

      </Grid>
   );
}
