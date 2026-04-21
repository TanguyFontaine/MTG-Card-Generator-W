import { Box, useStyleConfig } from "@chakra-ui/react";
/***************************************************************/

import { useCardContext } from "../../contexts/card_context";
import { CardRender, CARD_RENDER_WIDTH, CARD_RENDER_HEIGHT } from "./card_render";

/***************************************************************/

const MOBILE_CARD_SCALE = 0.55;
const SM_CARD_SCALE = 0.73;

/***************************************************************/

export function CardImagePanel()
{
   const { state } = useCardContext();
   const style = useStyleConfig("CardImagePanel");

   const imageFileContent = state.imageFile.localFile ? state.imageFile.localFile : state.imageFile.contentFromUrl;

   return (
      <Box __css={style} h={{ base: "auto", md: "100vh" }} w="100%" sx={{ wordSpacing: "0.2em" }}>
         <Box
            display="flex"
            justifyContent={{ base: "center", md: "flex-start" }}
            pl={{ base: 0, md: "20%" }}
            pt={{ base: 4, md: 0 }}
            w="100%"
         >
            <Box
               w={{ base: `${Math.round(CARD_RENDER_WIDTH * MOBILE_CARD_SCALE)}px`, sm: `${Math.round(CARD_RENDER_WIDTH * SM_CARD_SCALE)}px`, md: `${CARD_RENDER_WIDTH}px` }}
               h={{ base: `${Math.round(CARD_RENDER_HEIGHT * MOBILE_CARD_SCALE)}px`, sm: `${Math.round(CARD_RENDER_HEIGHT * SM_CARD_SCALE)}px`, md: `${CARD_RENDER_HEIGHT}px` }}
               overflow="hidden"
               flexShrink={0}
            >
               <Box
                  transform={{ base: `scale(${MOBILE_CARD_SCALE})`, sm: `scale(${SM_CARD_SCALE})`, md: "none" }}
                  transformOrigin="top left"
               >
                  <CardRender
                     name={state.cardName}
                     nameFontSize={state.nameFontSize}
                     imageFileName={state.imageFile.localFileName}
                     imageFileContent={imageFileContent}
                     imageCentering={state.imageCentering}
                     cardType={state.cardType}
                     typesFontSize={state.typesFontSize}
                     manaCost={state.manaCost}
                     spellDescription={state.spellDescription}
                     spellFontSize={state.spellFontSize}
                     flavorText={state.flavorText}
                     flavorTextFontSize={state.flavorTextFontSize}
                     power={state.power}
                     toughness={state.toughness}
                     powerToughnessFontSize={state.powerToughnessFontSize}
                     selectedCardFrame={state.cardFrame}
                  />
               </Box>
            </Box>
         </Box>
      </Box>
   );
}
