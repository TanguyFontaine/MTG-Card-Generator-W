import { HStack } from "@chakra-ui/react";
/***************************************************************/

import { Textarea } from "../style_components/textarea";
import { Text } from "../style_components/text";
import { FontSizeControler } from "./font_size_controler";
/***************************************************************/

interface FlavorTextProps
{
   flavorText: string;
   flavorTextFontSize: number;

   setFlavorText: (value: string) => void;
   setFlavorTextFontSize: (value: number) => void;
}

export function FlavorText(props: FlavorTextProps)
{
   // The flavor text is a string, it can contain any character
   return (
      <HStack w="100%" justify="space-between">
         <Text color="brand.textSecondary" minW="70px">Flavor text:</Text>
         <Textarea width="73%"
            inputValue={props.flavorText} setInputValue={props.setFlavorText}
            setValue={(value) => props.setFlavorText(value)}
            placeholder="Enter the flavor text :" />
         <FontSizeControler setValue={props.setFlavorTextFontSize} value={props.flavorTextFontSize} />
      </HStack>
   );
}
