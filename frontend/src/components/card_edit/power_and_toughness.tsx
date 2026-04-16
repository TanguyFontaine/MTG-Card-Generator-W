import { HStack } from "@chakra-ui/react";
/***************************************************************/

import { Textbox } from "../../style_components/textbox";
import { Text } from "../../style_components/text";
import { FontSizeController } from "./font_size_controller";
import { useCardContext } from "../../contexts/card_context";
import { CardActionName } from "../../contexts/card_actions";
/***************************************************************/

export function PowerToughness()
{
   const { state, dispatch } = useCardContext();

   const setPower = (value: string) => dispatch({ name: CardActionName.setPower, data: value });
   const setToughness = (value: string) => dispatch({ name: CardActionName.setToughness, data: value });
   const setFontSize = (value: number) => dispatch({ name: CardActionName.setPowerToughnessFontSize, data: value });

   return (
      <HStack w="100%" justify="space-between" flexWrap="wrap" rowGap={2}>
         <Text color="brand.textSecondary">Power:</Text>
         <Textbox flex="1" minW="80px" value={state.power} setValue={setPower} placeholder="Power" />
         <Text color="brand.textSecondary">Toughness:</Text>
         <Textbox flex="1" minW="80px" value={state.toughness} setValue={setToughness} placeholder="Toughness" />
         <FontSizeController setValue={setFontSize} value={state.powerToughnessFontSize}
         />
      </HStack>
   );
}
