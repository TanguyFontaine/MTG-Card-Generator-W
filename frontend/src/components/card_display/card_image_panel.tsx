import { useRef } from "react";
import { Box, useStyleConfig } from "@chakra-ui/react";
/***************************************************************/

import { useCardContext } from "../../contexts/card_context";
import { CardRender, CARD_RENDER_WIDTH, CARD_RENDER_HEIGHT } from "./card_render";
import { DownloadCardButton } from "./download_card_button";

/***************************************************************/

// Display scales: the card renders at 2923×4000 (native frame resolution).
// These factors scale it down so it appears at the same visual size as the old 656×937 render.
const MD_CARD_SCALE = 0.224;    // 656 / 2923 ≈ 0.224
const SM_CARD_SCALE = 0.164;    // (656 * 0.73) / 2923 ≈ 0.164
const MOBILE_CARD_SCALE = 0.124; // (656 * 0.55) / 2923 ≈ 0.124

/***************************************************************/

export function CardImagePanel()
{
   const { state } = useCardContext();
   const style = useStyleConfig("CardImagePanel");
   const cardRef = useRef<HTMLDivElement>(null);

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
               w={{ base: `${Math.round(CARD_RENDER_WIDTH * MOBILE_CARD_SCALE)}px`, sm: `${Math.round(CARD_RENDER_WIDTH * SM_CARD_SCALE)}px`, md: `${Math.round(CARD_RENDER_WIDTH * MD_CARD_SCALE)}px` }}
               h={{ base: `${Math.round(CARD_RENDER_HEIGHT * MOBILE_CARD_SCALE)}px`, sm: `${Math.round(CARD_RENDER_HEIGHT * SM_CARD_SCALE)}px`, md: `${Math.round(CARD_RENDER_HEIGHT * MD_CARD_SCALE)}px` }}
               overflow="hidden"
               flexShrink={0}
            >
               <Box
                  transform={{ base: `scale(${MOBILE_CARD_SCALE})`, sm: `scale(${SM_CARD_SCALE})`, md: `scale(${MD_CARD_SCALE})` }}
                  transformOrigin="top left"
               >
                  <CardRender
                     ref={cardRef}
                     cardState={state}
                     imageFileContent={imageFileContent}
                  />
               </Box>
            </Box>
         </Box>
         <Box
            display="flex"
            justifyContent={{ base: "center", md: "flex-start" }}
            pl={{ base: 0, md: "20%" }}
            pt={4}
         >
            <DownloadCardButton cardRef={cardRef} />
         </Box>
      </Box>
   );
}
