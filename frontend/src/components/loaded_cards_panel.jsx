import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react"
/***************************************************************/

import { Text } from "../style_components/text"
import { LoadedCardItem } from "./loaded_card_item"
/***************************************************************/

export function LoadedCardsPanel({ 
  isOpen, 
  onClose, 
  cards, 
  error, 
  parentProps, 
  setError, 
  setIsLoading 
}) {
  return (
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
                      parentProps={parentProps}
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
  );
}