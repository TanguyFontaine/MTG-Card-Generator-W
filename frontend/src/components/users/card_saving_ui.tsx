import { HStack } from "@chakra-ui/react";
/***************************************************************/

import { SaveCardButton } from "./save_card_button";
import { LoadCardButton } from "./load_card_button";
import { NewCardButton } from "./new_card_button";
import { DeleteCardButton } from "./delete_card_button";
import { useCardContext } from "../../contexts/card_context";

/***************************************************************/

export function CardSavingUI()
{
   const { state } = useCardContext();

   return (
      <HStack w="100%" justify="space-between" spacing={5} flexWrap="wrap" rowGap={4}>
         <HStack spacing={3} flexWrap="wrap" rowGap={2}>
            <SaveCardButton />
            <NewCardButton />
            <LoadCardButton />
         </HStack>
         {state.cardId && (
            <DeleteCardButton
               cardId={state.cardId}
               cardName={state.cardName}
            />
         )}
      </HStack>
   );
}
