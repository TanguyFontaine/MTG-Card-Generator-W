import { HStack } from "@chakra-ui/react";
/***************************************************************/

import { Checkbox } from "../style_components/checkbox";
import { CheckboxGroup } from "../style_components/checkbox_group";
import { Text } from "../style_components/text";
import { LEGENDARY, SNOW, BASIC, TOKEN } from "../classes/card_type";
import { CardTypeObj } from "../classes/card_type";
/***************************************************************/

interface SuperTypesSelectionProps
{
   cardType: CardTypeObj;
   setCardType: (cardType: CardTypeObj) => void;
}

export function SuperTypesSelection(props: SuperTypesSelectionProps)
{
   const handleSuperTypesChange = (selectedSuperTypes: (string | number)[]) =>
   {
      const newCardType = props.cardType.setSuperTypes(selectedSuperTypes as string[]);
      props.setCardType(newCardType);
   };

   return (
      <HStack spacing={4}>
         <Text color="brand.textSecondary" minW="70px">Supertypes:</Text>
         <CheckboxGroup
            name="superTypes"
            setValue={handleSuperTypesChange}
            value={props.cardType.superTypes}
         >
            <HStack spacing={3}>
               <Checkbox value={LEGENDARY} displayLabel={LEGENDARY} />
               <Checkbox value={SNOW} displayLabel={SNOW} />
               <Checkbox value={BASIC} displayLabel={BASIC} />
               <Checkbox value={TOKEN} displayLabel={TOKEN} />
            </HStack>
         </CheckboxGroup>
      </HStack>
   );
}
