import { HStack } from "@chakra-ui/react";
/***************************************************************/

import { Checkbox } from "../../style_components/checkbox";
import { CheckboxGroup } from "../../style_components/checkbox_group";
import { Text } from "../../style_components/text";
import { CREATURE, ARTIFACT, ENCHANTMENT, PLANESWALKER, BATTLE, INSTANT, SORCERY, LAND, KINDRED } from "../../classes/card_type";
import { useCardContext } from "../../contexts/card_context";
import { CardActionName } from "../../contexts/card_actions";
/***************************************************************/

export function TypesSelection()
{
   const { state, dispatch } = useCardContext();

   const handleTypesChange = (selectedTypes: (string | number)[]) =>
   {
      const newCardType = state.cardType.setTypes(selectedTypes as string[]);
      dispatch({ name: CardActionName.setCardType, data: newCardType });
   };

   return (
      <HStack spacing={4} flexWrap="wrap">
         <Text color="brand.textSecondary" minW="70px">Types:</Text>
         <CheckboxGroup
            name="types"
            setValue={handleTypesChange}
            value={state.cardType.types}
         >
            <HStack spacing={3} flexWrap="wrap" rowGap={2}>
               <Checkbox value={CREATURE} displayLabel={CREATURE} />
               <Checkbox value={ARTIFACT} displayLabel={ARTIFACT} />
               <Checkbox value={ENCHANTMENT} displayLabel={ENCHANTMENT} />
               <Checkbox value={PLANESWALKER} displayLabel={PLANESWALKER} />
               <Checkbox value={BATTLE} displayLabel={BATTLE} />
               <Checkbox value={INSTANT} displayLabel={INSTANT} />
               <Checkbox value={SORCERY} displayLabel={SORCERY} />
               <Checkbox value={LAND} displayLabel={LAND} />
               <Checkbox value={KINDRED} displayLabel={KINDRED} />
            </HStack>
         </CheckboxGroup>
      </HStack>
   );
}
