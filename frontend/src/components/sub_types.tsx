import { HStack } from "@chakra-ui/react";
/***************************************************************/

import { Textbox } from "../style_components/textbox";
import { Text } from "../style_components/text";
import { FontSizeControler } from "./font_size_controler";
import { CardTypeObj } from "../classes/card_type";
/***************************************************************/

interface SubTypesProps
{
   cardType: CardTypeObj;
   typesFontSize: number;
   setCardType: (cardType: CardTypeObj) => void;
   setTypesFontSize: (value: number) => void;
}

export function SubTypes(props: SubTypesProps)
{
   const handleSubTypesChange = (subTypes: string) =>
   {
      const newCardType = props.cardType.setSubTypes(subTypes);
      props.setCardType(newCardType);
   };

   return (
      <HStack w="100%" justify="space-between">
         <Text color="brand.textSecondary" minW="70px">Subtypes:</Text>
         <Textbox
            width="72%"
            value={props.cardType.subTypes}
            setValue={handleSubTypesChange}
            placeholder="Enter the sub types of your card here."
         />
         <FontSizeControler setValue={props.setTypesFontSize} value={props.typesFontSize} />
      </HStack>
   );
}
