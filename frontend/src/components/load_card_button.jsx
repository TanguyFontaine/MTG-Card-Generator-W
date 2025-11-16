import { useDisclosure , Modal, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import { useState } from "react"

/***************************************************************/

import { Button } from "../style_components/button"
import { Text } from "../style_components/text"
import CardService from "../backend_connection/services"
import { LoadedCardItem } from "./loaded_card_item"
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
      onOpen(); // Open the modal to show cards
    } 
    catch (error)
    {
      console.error('Failed to load cards:', error);
      setError(error.message);
      onOpen(); // Open the modal to show error
    }
    finally
    {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button 
        w={134} 
        colorScheme="blue"
        isLoading={isLoading}
        loadingText="Loading..."
        onClick={handleLoadCards}
      >
        Load Card
      </Button>
      
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalContent>
          <ModalHeader>Select a card</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {
              error ? 
              ( <Text color="red.500">Failed to load cards: {error}</Text> ) : 
              (
                <>
                  {
                    cards.map(card => (
                      <LoadedCardItem
                        key={card.id}
                        card={card}
                        parentProps={props}
                        onError={setError}
                        setIsLoading={setIsLoading}
                        onClose={onClose}
                      />
                    ))
                  }
                </>
              )
            }
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}