import { HStack } from "@chakra-ui/react";
/***************************************************************/

import { Textarea } from "../../style_components/textarea";
import { Text } from "../../style_components/text";
import { FontSizeController } from "./font_size_controller";
import { useCardContext } from "../../contexts/card_context";
import { CardActionName } from "../../contexts/card_actions";
/***************************************************************/

export function FlavorText()
{
   const { state, dispatch } = useCardContext();

   const setFlavorText = (value: string) => dispatch({ name: CardActionName.setFlavorText, data: value });
   const setFontSize = (value: number) => dispatch({ name: CardActionName.setFlavorTextFontSize, data: value });

   return (
      <HStack w="100%" justify="space-between" flexWrap="wrap" rowGap={2}>
         <Text color="brand.textSecondary" minW="70px">Flavor text:</Text>
         <Textarea flex="1" minW="120px"
            inputValue={state.flavorText} setInputValue={setFlavorText}
            setValue={setFlavorText}
            placeholder="Enter the flavor text :" />
         <FontSizeController
            setValue={setFontSize}
            value={state.flavorTextFontSize}
         />
      </HStack>
   );
}
