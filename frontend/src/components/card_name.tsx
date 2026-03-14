import { HStack } from "@chakra-ui/react";
/***************************************************************/

import { Text } from "../style_components/text";
import { Textbox } from "../style_components/textbox";
import { FontSizeControler } from "./font_size_controler";
/***************************************************************/

interface CardNameProps
{
   cardName: string;
   nameFontSize: number;
   setCardName: (value: string) => void;
   setNameFontSize: (value: number) => void;
}

export function CardName(props: CardNameProps)
{
   return (
      <HStack w="100%" justify="space-between">
         <Text>Name:</Text>
         <Textbox
            w="75%"
            value={props.cardName}
            setValue={(value) => props.setCardName(value)}
            placeholder="Enter the name of your card here."
         />
         <FontSizeControler setValue={props.setNameFontSize} value={props.nameFontSize} />
      </HStack>
   );
}
