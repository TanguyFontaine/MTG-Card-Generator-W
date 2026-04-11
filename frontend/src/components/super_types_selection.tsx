import { HStack } from "@chakra-ui/react";
/***************************************************************/

import { Checkbox } from "../style_components/checkbox";
import { CheckboxGroup } from "../style_components/checkbox_group";
import { Text } from "../style_components/text";
import { LEGENDARY, SNOW, BASIC, TOKEN } from "../classes/card_type";
import { useCardContext } from "../contexts/card_context";
import { CardActionName } from "../contexts/card_actions";
/***************************************************************/

export function SuperTypesSelection()
{
   const { state, dispatch } = useCardContext();

   const handleSuperTypesChange = (selectedSuperTypes: (string | number)[]) =>
   {
      const newCardType = state.cardType.setSuperTypes(selectedSuperTypes as string[]);
      dispatch({ name: CardActionName.setCardType, data: newCardType });
   };

   return (
      <HStack spacing={4}>
         <Text color="brand.textSecondary" minW="70px">Supertypes:</Text>
         <CheckboxGroup
            name="superTypes"
            setValue={handleSuperTypesChange}
            value={state.cardType.superTypes}
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
