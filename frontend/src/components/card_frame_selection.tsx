import { HStack } from "@chakra-ui/react";
/***************************************************************/

import { Text } from "../style_components/text";
import { Select } from "../style_components/select";
import { frames } from "../ressources/frames";

/***************************************************************/

interface CardFrameSelectionProps
{
   cardFrame: string;
   setCardFrame: (value: string) => void;
}

export function CardFrameSelection(props: CardFrameSelectionProps)
{
   const frameColors = Object.keys(frames);

   return (
      <HStack spacing={2}>
         <Text>Card frame:</Text>
         <Select
            width="88.5%"
            options={frameColors}
            value={props.cardFrame || ""}
            setValue={(value) => props.setCardFrame(value)}
            placeholder="Select the frame of your card."
         />
      </HStack>
   );
}
