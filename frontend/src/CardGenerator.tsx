import { useState } from "react";
// 1. import `ChakraProvider` component to have chakra work correctly
import { ChakraProvider } from "@chakra-ui/react";
import { Box, useControllableState } from "@chakra-ui/react";

import "@fontsource/eb-garamond/400.css";
import "@fontsource/eb-garamond/500.css";
import "@fontsource/eb-garamond/600.css";
import "@fontsource/eb-garamond/700.css";
import "@fontsource/eb-garamond/800.css";
import "@saeris/typeface-beleren-bold";
import "mana-font";

/***************************************************************/

import theme from "./theme";
import { UiPanel } from "./components/ui_panel";
import { CardImagePanel } from "./components/card_image_panel";
import { useResizablePanel, MIN_PANEL_WIDTH, MAX_PANEL_WIDTH_RATIO } from "./hooks/use_resizable_panel";
import { ManaCostObj } from "./classes/mana_cost";
import { CardTypeObj } from "./classes/card_type";
import { ImageFile } from "./classes/image_file_interface";

/***************************************************************/
function CardGenerator()
{
   const [cardId, setCardId] = useState<number | null>(null);

   const [cardName, setCardName] = useState("");
   const [nameFontSize, setNameFontSize] = useControllableState({ defaultValue: 32 });

   const [imageFile, setImageFile] = useState<ImageFile>({
      localFile: "",
      localFileName: "",
      url: "",
      contentFromUrl: "",
   });
   const [imageCentering, setImageCentering] = useState("center");

   const [cardType, setCardType] = useState(CardTypeObj.newEmpty());
   const [typesFontSize, setTypesFontSize] = useControllableState({ defaultValue: 28 });

   const [cardFrame, setCardFrame] = useState("");

   const [manaCost, setManaCost] = useState(ManaCostObj.newEmpty());

   const [spellDescription, setSpellDescription] = useState("");
   const [spellFontSize, setSpellFontSize] = useControllableState({ defaultValue: 22 });

   const [flavorText, setFlavorText] = useState("");
   const [flavorTextFontSize, setFlavorTextFontSize] = useControllableState({ defaultValue: 21 });

   const [power, setPower] = useState("");
   const [toughness, setToughness] = useState("");
   const [ptFontSize, setPTFontSize] = useControllableState({ defaultValue: 34 });

   // clean planeswalker ?
   const [loyalty, setLoyalty] = useState("");

   const { panelWidth, handleMouseDown } = useResizablePanel();

   return (
      <ChakraProvider theme={theme} >
         <Box display={{ md: "flex" }} h="100vh" w="100%" bg="brand.base">
            <Box w={`${panelWidth}px`} minW={`${MIN_PANEL_WIDTH}px`} maxW={`${MAX_PANEL_WIDTH_RATIO * 100}%`} h="100vh" overflowY="auto"
               borderRight="1px solid" borderColor="brand.border" bg="brand.base">
               <UiPanel
                  cardId={cardId} setCardId={setCardId}
                  cardName={cardName} setCardName={setCardName} nameFontSize={nameFontSize} setNameFontSize={setNameFontSize}
                  setImageFile={setImageFile} selectedImageFileName={imageFile.localFileName}
                  imageFile={imageFile}
                  cardType={cardType} setCardType={setCardType} typesFontSize={typesFontSize} setTypesFontSize={setTypesFontSize}
                  manaCost={manaCost} setManaCost={setManaCost}
                  cardFrame={cardFrame} setCardFrame={setCardFrame}
                  spellDescription={spellDescription} setSpellDescription={setSpellDescription} spellFontSize={spellFontSize} setSpellFontSize={setSpellFontSize}
                  flavorText={flavorText} setFlavorText={setFlavorText} flavorTextFontSize={flavorTextFontSize} setFlavorTextFontSize={setFlavorTextFontSize}
                  power={power} setPower={setPower}
                  toughness={toughness} setToughness={setToughness}
                  ptFontSize={ptFontSize} setPTFontSize={setPTFontSize}
                  loyalty={loyalty} setLoyalty={setLoyalty}
                  setImageCentering={setImageCentering}
               />
            </Box>
            <Box w="6px" h="100vh" cursor="col-resize" bg="brand.border" transition="background 0.15s ease" onMouseDown={handleMouseDown} flexShrink={0} />
            <Box flex="1" h="100vh" overflowY="auto">
               <CardImagePanel
                  imageFile={imageFile}
                  cardName={cardName} nameFontSize={nameFontSize}
                  cardType={cardType} typesFontSize={typesFontSize}
                  manaCost={manaCost}
                  cardFrame={cardFrame}
                  spellDescription={spellDescription} spellFontSize={spellFontSize}
                  flavorText={flavorText} flavorTextFontSize={flavorTextFontSize}
                  power={power} toughness={toughness} ptFontSize={ptFontSize}
                  loyalty={loyalty}
                  imageCentering={imageCentering} />
            </Box>
         </Box>
      </ChakraProvider>
   );
}

export { CardGenerator };
