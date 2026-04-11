import { HStack } from "@chakra-ui/react";
/***************************************************************/

import { Text } from "../style_components/text";
import { Textbox } from "../style_components/textbox";
import { FontSizeController } from "./font_size_controller";
import { useCardContext } from "../contexts/card_context";
import { CardActionName } from "../contexts/card_actions";
/***************************************************************/

export function CardName()
{
   const { state, dispatch } = useCardContext();

   const setCardName = (value: string) => dispatch({ name: CardActionName.setCardName, data: value });
   const setFontSize = (value: number) => dispatch({ name: CardActionName.setNameFontSize, data: value });

   return (
      <HStack w="100%" justify="space-between">
         <Text color="brand.textSecondary" minW="70px">Name:</Text>
         <Textbox
            w="75%"
            value={state.cardName}
            setValue={setCardName}
            placeholder="Enter the name of your card here."
         />
         <FontSizeController setValue={setFontSize} value={state.nameFontSize} />
      </HStack>
   );
}
