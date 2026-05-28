import React from "react";
import { Image, Box, HStack } from "@chakra-ui/react";
/***************************************************************/

import { Text } from "../../style_components/text";
import { resolveFrame } from "../../classes/frame/frame_resolver";
import { ART_Z_INDEX, CARD_UI_Z_INDEX } from "../../classes/frame/frame_layers";
import { CardState } from "../../contexts/card_state";
import { Symbol } from "../card_edit/symbols/symbol";
import { isValidImageExtension } from "../../utils";
import { FrameType } from "../../classes/frame/frame_type";
import { transformIntoDisplayableElements } from "./card_render_utilities";
import { LevelUpCardText } from "./card_render_level_up";

import logo from "../../../public/frames/logo_mini.png";

/***************************************************************/

export const CARD_RENDER_WIDTH = 2923;
export const CARD_RENDER_HEIGHT = 4000;

/***************************************************************/

interface DisplayImageProps
{
   imageFileName: string;
   imageFileContent: string;
   imageCentering: string;
   zIndex: number;
}

function DisplayImage(props: DisplayImageProps)
{
   const imageFileName = props.imageFileName;
   const imageFileContent = props.imageFileContent;
   const imageCentering = props.imageCentering;
   const artBoxStyle = { position: "absolute" as const, top: "428px", left: "180px", zIndex: props.zIndex };
   //const artBoxStyle = { position: "absolute" as const, top: "260px", left: "0px", zIndex: props.zIndex }; // for extended frames

   // Do not display the error panel while an image has not been selected
   // Display an empty box to avoid download error with html-to-image when no image is selected
   // as it tries to load the image with an empty string as source and fails, even if the image is not displayed at all
   if (imageFileName === "")
   {
      return <Box w="2562px" h="1860px" {...artBoxStyle} />;
   }
   if (isValidImageExtension(imageFileName))
   {
         //<Box w="2923px" h="2200px" {...artBoxStyle}> for extended frames
      return (
         <Box w="2562px" h="1860px" {...artBoxStyle}>
            <Image boxSize="inherit" objectPosition={imageCentering} objectFit="cover" alt={imageFileName} src={imageFileContent}></Image>
         </Box>
      );
   }
   return (
      <Text {...artBoxStyle} fontSize={107} color="white" noOfLines={2}>
         Invalid image file, supported extensions are :
         <br />
         png, jpg, jpeg, gif, webp
      </Text>
   );
}

// ─── Level-up card text is rendered by LevelUpCardText in card_render_level_up.tsx.

/***************************************************************/

export interface CardRenderProps
{
   cardState: CardState;
   imageFileContent: string;
}

export const CardRender = React.forwardRef<HTMLDivElement, CardRenderProps>(function CardRender(props, ref)
{
   const { cardState, imageFileContent } = props;
   const {
      cardName: name, nameFontSize,
      imageFile: { localFileName: imageFileName, url: imageUrl },
      imageCentering,
      cardType, typesFontSize,
      manaCost,
      spellDescription, spellFontSize,
      flavorText, flavorTextFontSize,
      power, toughness, powerToughnessFontSize,
      withColorIndicator, frameColorOverride,
      frameType,
   } = cardState;

   const typesItems = cardType.types.map((type, index) => <Text key={`type-${index}`}>{type}</Text>);
   const superTypesItems = cardType.superTypes.map((superType, index) => <Text key={`supertype-${index}`}>{superType}</Text>);

   const displayableManaCost = manaCost.otherManaSymbols.map((symbol, index) => <Box key={`mana-${index}`}><Symbol symbol={symbol} shadow={true} /></Box>);

   // Formulas to display values at the rigths position

   //the mana cost at the right place
   // 96.8 is hard coded pos of the 1st mana symbol, 5.12 is the size of mana symbol with fontSize(24)
   // we do not forget the colorless mana that is not the mana cost list
   const manaCostLeftPos = 93.5 - (manaCost.otherManaSymbols.length + (manaCost.colorlessAmount > -1 ? 1 : 0)) * 5.4 + "%";

   // adjust the power toughness position depending on the length of both values and the font size
   const baseLeftPos = power.charAt(0) === "1" ? 85.75 : 85.25; // Small adjustment for 1 power based, since 1 takes less space than other digits
   const powerLeftPos = baseLeftPos - (((power.length + toughness.length) * 1.2) / (160 / powerToughnessFontSize)) + "%";
   const powerTopPos = 92.5 + (3.36 - powerToughnessFontSize * 0.022) + "%";

   // adjust the name height pos depending on the font size
   const nameTopPos = 4.6 + (3.15 - nameFontSize * 0.022) + "%";

   const typesTopPos = 59 + (2.75 - typesFontSize * 0.022) + "%";
   const showColorIndicator = withColorIndicator && frameColorOverride !== null;
   const typesLeftPos = showColorIndicator ? "11.5%" : "7%";

   const spellDescriptionLineHeight = (spellFontSize * 0.0075) + "em";
   const flavorTextLineHeight = (flavorTextFontSize * 0.062) + "em";

   const displayableSpellDescription = transformIntoDisplayableElements(spellDescription, spellFontSize);

   const frame = resolveFrame(cardState);

   return (
      <Box ref={ref} position="relative" height={`${CARD_RENDER_HEIGHT}px`} width={`${CARD_RENDER_WIDTH}px`}>

         {/* Frame layers — z-index on each layer controls stacking order */}
         {frame.layers.map((layer, index) => (
            <Image
               key={`frame-${index}`}
               position="absolute"
               zIndex={layer.zIndex}
               top={`${layer.top}px`}
               left={`${layer.left}px`}
               w={`${layer.width}px`}
               h={`${layer.height}px`}
               objectFit="fill"
               src={layer.imagePath}
            />
         ))}

         {/* Art image */}
         <DisplayImage imageFileName={imageFileName || imageUrl || ""} imageFileContent={imageFileContent} imageCentering={imageCentering} zIndex={ART_Z_INDEX} />

         <Text pos="absolute" zIndex={CARD_UI_Z_INDEX} top={nameTopPos} left="7%" fontSize={nameFontSize}>{name}</Text>

         <Box data-name="manaCost" pos="absolute" zIndex={CARD_UI_Z_INDEX} top="4.6%" left={manaCostLeftPos} fontSize={116}>
            <HStack spacing={4}>
               {manaCost.colorlessAmount > -1 ? <Box><Symbol symbol={manaCost.colorlessAmount} shadow={true} /></Box> : <Box />}
               <HStack spacing={4}>
                  {displayableManaCost}
               </HStack>
            </HStack>
         </Box>

         <HStack fontSize={typesFontSize} pos="absolute" zIndex={CARD_UI_Z_INDEX} top={typesTopPos} left={typesLeftPos} spacing="0.3em">
            {superTypesItems}
            {typesItems}
            <Text>{cardType.subTypes}</Text>
         </HStack>
         <Image boxSize="196px" pos="absolute" zIndex={CARD_UI_Z_INDEX} top="58.5%" left="87%" src={logo} />

         {
            frameType === FrameType.LevelUp
            ? <LevelUpCardText cardState={cardState} />
            : (
               <>
                  <Box fontSize={spellFontSize} lineHeight={spellDescriptionLineHeight} sx={{ wordSpacing: "0.08em" }}>
                     <Text whiteSpace="pre-wrap" fontFamily="EB Garamond" fontWeight={500} pos="absolute" zIndex={CARD_UI_Z_INDEX} top="65.24%" left="7.25%" width="85.8%">{displayableSpellDescription}</Text>
                  </Box>

                  <HStack fontSize={powerToughnessFontSize} pos="absolute" zIndex={CARD_UI_Z_INDEX} top={powerTopPos} left={powerLeftPos} spacing={1} color={cardState.withVehicleFrame ? "white" : undefined}>
                     <Text>{power} </Text>
                     {power !== "" || toughness !== "" ? <Text>/</Text> : <Text />}
                     <Text>{toughness} </Text>
                  </HStack>

                  <Box lineHeight={flavorTextLineHeight} sx={{ wordSpacing: "0.12em" }}>
                     <Text as="i" fontSize={flavorTextFontSize} whiteSpace="pre-wrap" fontFamily="EB Garamond" fontWeight={500} pos="absolute" zIndex={CARD_UI_Z_INDEX} top="75%" left="7.25%" width="85.8%">{flavorText}</Text>
                  </Box>
               </>
            )
         }
      </Box>
   );
});
