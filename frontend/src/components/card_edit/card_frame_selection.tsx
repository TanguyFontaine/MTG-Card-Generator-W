import { HStack } from "@chakra-ui/react";
/***************************************************************/

import { Text } from "../../style_components/text";
import { Select } from "../../style_components/select";
import { frames } from "../../ressources/frames";
import { useCardContext } from "../../contexts/card_context";
import { CardActionName } from "../../contexts/card_actions";

/***************************************************************/

export function CardFrameSelection()
{
   const { state, dispatch } = useCardContext();
   const frameColors = Object.keys(frames);

   const setCardFrame = (value: string) => dispatch({ name: CardActionName.setCardFrame, data: value });

   return (
      <HStack spacing={2}>
         <Text color="brand.textSecondary" minW="90px">Card frame:</Text>
         <Select
            flex="1"
            options={frameColors}
            value={state.cardFrame}
            setValue={setCardFrame}
            placeholder="Select the frame of your card."
         />
      </HStack>
   );
}
