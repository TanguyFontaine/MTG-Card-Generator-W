import { useDisclosure } from "@chakra-ui/react"
import { useState } from "react"

/***************************************************************/

import { Button } from "../style_components/button"
import CardService from "../backend_connection/services"
import { LoadedCardsPanel } from "./loaded_cards_panel"
/***************************************************************/

export function LoadCardButton(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState('');

  const handleLoadCards = async () => {
    setIsLoading(true);
    setError('');
    setCards([]);
    
    try 
    {
      const allCards = await CardService.getAllCards();
      setCards(allCards);
      onOpen(); // Open the loaded cards panel to show cards
    } 
    catch (error)
    {
      console.error('Failed to load cards:', error);
      setError(error.message);
      onOpen(); // Open the loaded cards panel to show error
    }
    finally
    {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button w={134} colorScheme="blue" isLoading={isLoading} loadingText="Loading..." onClick={handleLoadCards}>
        Load Card
      </Button>
      
      <LoadedCardsPanel
        isOpen={isOpen}
        onClose={onClose}
        cards={cards}
        error={error}
        parentProps={props}
        setError={setError}
        setIsLoading={setIsLoading}
      />
    </>
  );
}