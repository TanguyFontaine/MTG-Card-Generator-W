import { useDisclosure , Modal, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import { useState } from "react"

import { Button } from "../style_components/button"
import { Text } from "../style_components/text"
import CardService from "../backend_connection/services"
/***************************************************************/

export function SaveCardButton(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'success', 'error', or null
  const [errorMessage, setErrorMessage] = useState('');

  const handleSaveCard = async () => {
    setIsLoading(true);
    setSaveStatus(null);
    setErrorMessage('');

    try 
    {
      // Debug: Log all props to see what we're receiving
      /*
      console.log('All props:', props);
      console.log('cardName:', props.cardName);
      console.log('cardDescription:', props.cardDescription);
      */

      // Create comprehensive card data object
      // TODO : Include all relevant fields
      const cardData = {
        name: props.cardName || "",
        spellDescription: props.cardDescription || "",
        manaCost: props.manaCost.toString(),
        type: props.cardType.toString(),
        flavorText: props.flavorText || "",
        frame: props.cardFrameColor || "",
        imageUrl: props.imageFile?.name || ""
      };

      let savedCard;
      if (props.cardId)
      {
        // Update existing card
        console.log('Updating existing card with ID:', props.cardId);
        savedCard = await CardService.updateCard(props.cardId, cardData);
      }
      else
      {
        // Create new card
        console.log('Creating new card');
        savedCard = await CardService.saveCard(cardData);
        // Set the card ID so future saves will update instead of create
        props.setCardId(savedCard.id);
      }

      setSaveStatus('success');
      onOpen(); // Open the modal to show success
    } 
    catch (error)
    {
      setSaveStatus('error');
      setErrorMessage(error.message);
      onOpen(); // Open the modal to show error
    }
    finally
    {
      setIsLoading(false);
    }
  };

    const getModalMessage = () => {
      return saveStatus === 'success' ? 'Card Saved Successfully!' : `Save failed: ${errorMessage}`;
    };

  return (
    <>
      <Button 
        w={134} 
        colorScheme="blue" 
        onClick={handleSaveCard}
        isLoading={isLoading}
        loadingText="Saving..."
      >
        Save
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Save Status</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{getModalMessage()}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}