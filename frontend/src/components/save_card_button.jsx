import { useDisclosure , Modal, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import { useState } from "react"

/***************************************************************/

import { Button } from "../style_components/button"
import { Text } from "../style_components/text"
import CardService from "../backend_connection/services"
/***************************************************************/

export function SaveCardButton(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'success', 'error', or null

  const handleSaveCard = async () => {
    setIsLoading(true);
    setSaveStatus(null);
    
    try 
    {
      // Debug: Log all props to see what we're receiving
      console.log('All props:', props);
      console.log('cardName:', props.cardName);
      console.log('cardDescription:', props.cardDescription);
      
      // Extract card data from props or create card data object
      const cardData =
      {
        name: props.cardName || "Unnamed Card",
        spellDescription: props.cardDescription || "No description provided"
      };

      console.log('Prepared cardData:', cardData);
      console.log('About to call CardService.saveCard...');
      
      const savedCard = await CardService.saveCard(cardData);
      console.log('Card saved successfully:', savedCard);
      setSaveStatus('success');
      onOpen(); // Open the modal to show success
    } 
    catch (error)
    {
      console.error('Failed to save card:', error);
      setSaveStatus('error');
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
        onClick={handleSaveCard}
        isLoading={isLoading}
        loadingText="Saving..."
      >
        Save
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>
            {saveStatus === 'success' ? 'Card Saved Successfully!' : 'Save Failed'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              {saveStatus === 'success' 
                ? 'Your card has been saved !' 
                : 'There was an error saving your card. Please try again.'
              }
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}