import React from "react";
import { Image, Box, HStack } from "@chakra-ui/react";
/***************************************************************/

import { Text } from "../../style_components/text";
import { frames, FrameLayers, OUTER_BORDER_PATH, BACKGROUND_SHADOW_PATH } from "../../ressources/frames";
import { Symbol } from "../card_edit/symbol";
import { TextLine } from "./text_line";
import { isValidImageExtension } from "../utilities";
import { ManaCostObj } from "../../classes/mana_cost";
import { CardTypeObj } from "../../classes/card_type";

import { symbols } from "../../ressources/symbols";
import logo from "../../../public/frames/logo_mini.png";

/***************************************************************/

export const CARD_RENDER_WIDTH = 2923;
export const CARD_RENDER_HEIGHT = 4000;

/***************************************************************/

function retrieveCorrespondingFrameLayers(frameColor: string): FrameLayers
{
   if (frameColor !== "" && frames[frameColor])
   {
      return frames[frameColor];
   }
   return frames["Colorless"];
}

// Take the spell descrition in param. It is a string whith the descritpion and encoded symbols
// example : [Tap] : add [g]
// returns a list of SymbolEments and Strings to be displayed
function createDisplayableSymbols(spellDescription: string, spellFontSize: number): (string | JSX.Element)[]
{
   const leftBracketSplit = spellDescription.split("[");

   let displayableElements: (string | JSX.Element)[] = [];
   let elementIndex = 0; // Counter for unique keys
   for (let i = 0; i < leftBracketSplit.length; i++)
   {
      const rightBracketSplit = leftBracketSplit[i].split("]");

      if (rightBracketSplit.length === 2)
      {
         // a symbol has been parsed, it is the left side of the ], the right is the rest of the description
         const symbolCode = rightBracketSplit[0];
         const displayableSymbol = (symbolCode === symbols.Energy) ?
            <Symbol key={`symbol-${elementIndex++}`} symbolOnly={true} symbol={symbolCode} fontSize={spellFontSize - 4} style={{ position: "relative", top: "-2px" }} /> :
            <Symbol key={`symbol-${elementIndex++}`} symbol={symbolCode} fontSize={spellFontSize - 8} style={{ position: "relative", top: "-3px" }} />;
         displayableElements = displayableElements.concat(displayableSymbol);
         displayableElements = displayableElements.concat(rightBracketSplit[1]);
      }
      else
      {
         displayableElements = displayableElements.concat(rightBracketSplit);
      }
   }

   return (displayableElements);
}

// Splits the description into lines and applies custom line height
// Each line is split into displayable elements (symbols and text)
// Returns an array of TextLine components, each representing a line of the description
function transformIntoDisplayableElements(spellDescription: string, spellFontSize: number): JSX.Element[]
{
   // React requires that each element in an array has a unique key prop, here we use the line index as a key
   return spellDescription.split("\n").map((line, idx) =>
      line.trim() === ""
         ? <TextLine key={idx} isEmpty={true} />
         : <TextLine key={idx}>{createDisplayableSymbols(line, spellFontSize)}</TextLine>
   );
}

/***************************************************************/

interface DisplayImageProps
{
   imageFileName: string;
   imageFileContent: string;
   imageCentering: string;
}

function DisplayImage(props: DisplayImageProps)
{
   const imageFileName = props.imageFileName;
   const imageFileContent = props.imageFileContent;
   const imageCentering = props.imageCentering;

   // Do not display the error panel while an image has not been selected
   if (imageFileName === "" || isValidImageExtension(imageFileName))
   {
      return (
         <Box w="2562px" h="1860px" position="absolute" top="428px" left="180px">
            <Image boxSize="inherit" objectPosition={imageCentering} objectFit="cover" alt={imageFileName} src={imageFileContent}></Image>
         </Box>
      );
   }
   return (
      <Text position="absolute" top="428px" left="180px" fontSize={107} color="white" noOfLines={2}>
         Invalid image file, supported extensions are :
         <br />
         png, jpg, jpeg, gif, webp
      </Text>
   );
}

/***************************************************************/

export interface CardRenderProps
{
   name: string;
   nameFontSize: number;
   imageFileName: string;
   imageFileContent: string;
   imageCentering: string;
   cardType: CardTypeObj;
   typesFontSize: number;
   manaCost: ManaCostObj;
   spellDescription: string;
   spellFontSize: number;
   flavorText: string;
   flavorTextFontSize: number;
   power: string;
   toughness: string;
   powerToughnessFontSize: number;
   selectedCardFrame: string;
}

export const CardRender = React.forwardRef<HTMLDivElement, CardRenderProps>(function CardRender(props, ref)
{
   const {
      name, nameFontSize,
      imageFileName, imageFileContent, imageCentering,
      cardType, typesFontSize,
      manaCost,
      spellDescription, spellFontSize,
      flavorText, flavorTextFontSize,
      power, toughness, powerToughnessFontSize,
      selectedCardFrame,
   } = props;

   const typesItems = cardType.types.map((type, index) => <Text key={`type-${index}`}>{type}</Text>);
   const superTypesItems = cardType.superTypes.map((superType, index) => <Text key={`supertype-${index}`}>{superType}</Text>);

   const displayableManaCost = manaCost.otherManaSymbols.map((symbol, index) => <Box key={`mana-${index}`}><Symbol symbol={symbol} shadow={true} /></Box>);

   // Formulas to display values at the rigths position

   //the mana cost at the right place
   // 96.8 is hard coded pos of the 1st mana symbol, 5.12 is the size of mana symbol with fontSize(24)
   // we do not forget the colorless mana that is not the mana cost list
   const manaCostLeftPos = 93.5 - (manaCost.otherManaSymbols.length + (manaCost.colorlessAmount > -1 ? 1 : 0)) * 5.4 + "%";

   // adjust the power toughness position depending on the length of both values and the font size
   const powerLeftPos = 85 - ((power.length + toughness.length) / (160 / powerToughnessFontSize)) + "%";
   const powerTopPos = 92.55 + (3.36 - powerToughnessFontSize * 0.022) + "%";
   const hasPT = power !== "" || toughness !== "";

   // adjust the name height pos depending on the font size
   const nameTopPos = 4.6 + (3.15 - nameFontSize * 0.022) + "%";
   const typesTopPos = 59 + (2.75 - typesFontSize * 0.022) + "%";
   const spellDescriptionLineHeight = (spellFontSize * 0.0075) + "em";
   const flavorTextLineHeight = (flavorTextFontSize * 0.062) + "em";

   const displayableSpellDescription = transformIntoDisplayableElements(spellDescription, spellFontSize);

   const frameLayers = retrieveCorrespondingFrameLayers(selectedCardFrame);

   return (
      <Box ref={ref} position="relative" height={`${CARD_RENDER_HEIGHT}px`} width={`${CARD_RENDER_WIDTH}px`}>

         {/* Layer 1: Outer background border — 2923×4000, full canvas */}
         <Image position="absolute" top="0" left="0" w={`${CARD_RENDER_WIDTH}px`} h={`${CARD_RENDER_HEIGHT}px`} objectFit="fill" src={OUTER_BORDER_PATH} />

         {/* Layer 2: Color-specific background  border — 2780×3782, offset (70, 70) */}
         <Image position="absolute" top="70px" left="70px" w="2780px" h="3782px" objectFit="fill" src={frameLayers.border} />

         {/* Layer 3: Art image */}
         <DisplayImage imageFileName={imageFileName} imageFileContent={imageFileContent} imageCentering={imageCentering} />

         {/* Layer 4: inner background shadow — 2736×3740, offset (89, 113)  */}
         <Image position="absolute" top="113px" left="89px" w="2736px" h="3740px" objectFit="fill" src={BACKGROUND_SHADOW_PATH} />

         {/* Layer 5: Color background — 2710×3722, offset (105, 131) within the 2923×4000 canvas */}
         <Image position="absolute" top="131px" left="105px" w="2710px" h="3722px" objectFit="fill" src={frameLayers.background} />

         {/* Layer 6: Name / type line boxes — 2668×2412, offset (125, 152) */}
         <Image position="absolute" top="152px" left="125px" w="2668px" h="2412px" objectFit="fill" src={frameLayers.nameTypeBox} />

         {/* Layer 7: Power / toughness box — 555×296, offset (2277, 3666), creatures only */}
         {hasPT && <Image position="absolute" top="3666px" left="2277px" w="555px" h="296px" objectFit="fill" src={frameLayers.ptBox} />}

         <Text pos="absolute" top={nameTopPos} left="7%" fontSize={nameFontSize}>{name}</Text>

         <Box data-name="manaCost" pos="absolute" top="4.6%" left={manaCostLeftPos} fontSize={116}>
            <HStack spacing={4}>
               {manaCost.colorlessAmount > -1 ? <Box><Symbol symbol={manaCost.colorlessAmount} shadow={true} /></Box> : <Box />}
               <HStack spacing={4}>
                  {displayableManaCost}
               </HStack>
            </HStack>
         </Box>

         <HStack fontSize={typesFontSize} pos="absolute" top={typesTopPos} left="7%" spacing="0.3em">
            {superTypesItems}
            {typesItems}
            <Text>{cardType.subTypes}</Text>
         </HStack>
         <Image boxSize="196px" pos="absolute" top="58.5%" left="87%" src={logo} />

         <Box fontSize={spellFontSize} lineHeight={spellDescriptionLineHeight} sx={{ wordSpacing: "0.08em" }}>
            <Text whiteSpace="pre-wrap" fontFamily="EB Garamond" fontWeight={500} pos="absolute" top="65.24%" left="7.25%" width="85.8%">{displayableSpellDescription}</Text>
         </Box>

         <HStack fontSize={powerToughnessFontSize} pos="absolute" top={powerTopPos} left={powerLeftPos} spacing={1}>
            <Text>{power} </Text>
            {power !== "" || toughness !== "" ? <Text>/</Text> : <Text />}
            <Text>{toughness} </Text>
         </HStack>

         <Box lineHeight={flavorTextLineHeight} sx={{ wordSpacing: "0.12em" }}>
            <Text as="i" fontSize={flavorTextFontSize} whiteSpace="pre-wrap" fontFamily="EB Garamond" fontWeight={500} pos="absolute" top="75%" left="7.25%" width="85.8%">{flavorText}</Text>
         </Box>
      </Box>
   );
});
