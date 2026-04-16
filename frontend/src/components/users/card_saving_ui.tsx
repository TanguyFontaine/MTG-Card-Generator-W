import { HStack } from "@chakra-ui/react";
/***************************************************************/

import { SaveCardButton } from "./save_card_button";
import { LoadCardButton } from "./load_card_button";
import { NewCardButton } from "./new_card_button";

/***************************************************************/

export function CardSavingUI()
{
   return (
      <HStack w="100%" justify="center" spacing={4}>
         <SaveCardButton />
         <NewCardButton />
         <LoadCardButton />
      </HStack>
   );
}
