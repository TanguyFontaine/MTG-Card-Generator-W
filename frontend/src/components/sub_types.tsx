import { HStack } from "@chakra-ui/react";
/***************************************************************/

import { Textbox } from "../style_components/textbox";
import { Text } from "../style_components/text";
import { FontSizeController } from "./font_size_controller";
import { useCardContext } from "../contexts/card_context";
import { CardActionName } from "../contexts/card_actions";
/***************************************************************/

export function SubTypes()
{
   const { state, dispatch } = useCardContext();

   const handleSubTypesChange = (subTypes: string) =>
   {
      const newCardType = state.cardType.setSubTypes(subTypes);
      dispatch({ name: CardActionName.setCardType, data: newCardType });
   };
   const setFontSize = (value: number) => dispatch({ name: CardActionName.setTypesFontSize, data: value });

   return (
      <HStack w="100%" justify="space-between">
         <Text color="brand.textSecondary" minW="70px">Subtypes:</Text>
         <Textbox
            width="72%"
            value={state.cardType.subTypes}
            setValue={handleSubTypesChange}
            placeholder="Enter the sub types of your card here."
         />
         <FontSizeController setValue={setFontSize} value={state.typesFontSize} />
      </HStack>
   );
}
