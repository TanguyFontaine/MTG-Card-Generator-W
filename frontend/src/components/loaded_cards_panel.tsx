import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, FormControl, ModalOverlay } from "@chakra-ui/react";
/***************************************************************/

import { Button } from "../style_components/button";
import { Input } from "../style_components/input";
import { Text } from "../style_components/text";
import { LoadedCardItem } from "./loaded_card_item";
import type { Card } from "../classes/card";
import type { CardSettersProps } from "./card_setters_props_interface";
/***************************************************************/

function handleSearchUpdate(event: React.ChangeEvent<HTMLInputElement>, setSearchInput: (value: string) => void)
{
   setSearchInput(event.target.value);
}

interface LoadedCardsPanelProps
{
   isOpen: boolean;
   cards: Card[];
   error: string;
   cardSettersProps: CardSettersProps;
   onClose: () => void;
   setError: (error: string) => void;
   setIsLoading: (loading: boolean) => void;
}

export function LoadedCardsPanel({ isOpen, onClose, cards, error, cardSettersProps, setError, setIsLoading }: LoadedCardsPanelProps)
{
   const [searchInput, setSearchInput] = useState("");

   // Filter cards based on search input.
   // Matching is case-insensitive and checks if the card name starts with the search input.
   const filteredCards = cards.filter(card =>
      card.name?.toLowerCase().startsWith(searchInput.toLowerCase())
   );

   return (
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>
               <FormControl>
                  <Input
                     placeholder="Search by name"
                     value={searchInput}
                     onChange={(event) => handleSearchUpdate(event, setSearchInput)}
                     bg="blue.800"
                     _hover={{ borderColor: "blue.300", bg: "blue.900" }}
                  />
               </FormControl>
            </ModalHeader>
            <ModalBody>
               {
                  error ?
                     (<Text color="red.500">Failed to load cards: {error}</Text>) :
                     (
                        <>
                           {
                              filteredCards.map(card => (
                                 <LoadedCardItem
                                    key={card.id}
                                    card={card}
                                    cardSettersProps={cardSettersProps}
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
            <ModalFooter>
               <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   );
}
