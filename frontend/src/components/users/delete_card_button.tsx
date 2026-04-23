import { useState } from "react";
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@chakra-ui/react";
/***************************************************************/

import { Button } from "../../style_components/button";
import { Text } from "../../style_components/text";
import CardService from "../../backend_connection/services";
import { useUserContext } from "../../contexts/user_context";
import { useCardContext } from "../../contexts/card_context";
import { CardActionName } from "../../contexts/card_actions";
/***************************************************************/

interface DeleteCardButtonProps
{
   cardId: number;
   cardName?: string;
   onDeleted?: () => void;
}

export function DeleteCardButton({ cardId, cardName, onDeleted }: DeleteCardButtonProps)
{
   const { user } = useUserContext();
   const { dispatch } = useCardContext();
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [isLoading, setIsLoading] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");

   const handleConfirmDelete = async () =>
   {
      setIsLoading(true);
      setErrorMessage("");

      try
      {
         await CardService.deleteCard(cardId, user?.id);
         dispatch({ name: CardActionName.resetCard });
         onClose();
         onDeleted?.();
      }
      catch (error)
      {
         setErrorMessage((error as Error).message);
      }
      finally
      {
         setIsLoading(false);
      }
   };

   return (
      <>
         <Button w={112} variant="dangerGhost" onClick={onOpen}>
            Delete Card
         </Button>

         <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Delete Card</ModalHeader>
               <ModalBody>
                  <Text>
                     Are you sure you want to permanently delete <Text as="span" color="brand.gold" fontWeight={600}>{cardName || "this card"}</Text>?
                  </Text>
                  {errorMessage && (
                     <Text mt={3} color="brand.error">{errorMessage}</Text>
                  )}
               </ModalBody>
               <ModalFooter gap={3}>
                  <Button variant="ghost" onClick={onClose} isDisabled={isLoading}>
                     Cancel
                  </Button>
                  <Button variant="danger" onClick={handleConfirmDelete} isLoading={isLoading} loadingText="Deleting...">
                     Delete
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
}
