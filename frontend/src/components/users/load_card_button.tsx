import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

/***************************************************************/

import { Button } from "../../style_components/button";
import CardService from "../../backend_connection/services";
import { LoadedCardsPanel } from "./loaded_cards_panel";
import { useUserContext } from "../../contexts/user_context";
import type { Card } from "../../classes/card";
/***************************************************************/

export function LoadCardButton()
{
   const { isOpen, onOpen, onClose } = useDisclosure();
   const { user } = useUserContext();
   const [isLoading, setIsLoading] = useState(false);
   const [cards, setCards] = useState<Card[]>([]);
   const [error, setError] = useState("");

   const handleLoadCards = async () =>
   {
      setIsLoading(true);
      setError("");
      setCards([]);

      try
      {
         const allCards = await CardService.getAllCards(user?.id);
         setCards(allCards);
         onOpen(); // Open the loaded cards panel to show cards
      }
      catch (error)
      {
         console.error("Failed to load cards:", error);
         setError((error as Error).message);
         onOpen(); // Open the loaded cards panel to show error
      }
      finally
      {
         setIsLoading(false);
      }
   };

   return (
      <>
         <Button w={112} variant="outline" isLoading={isLoading} loadingText="Loading..." onClick={handleLoadCards}>
            Load Card
         </Button>

         <LoadedCardsPanel
            isOpen={isOpen}
            onClose={onClose}
            cards={cards}
            error={error}
            setError={setError}
            setIsLoading={setIsLoading}
         />
      </>
   );
}
