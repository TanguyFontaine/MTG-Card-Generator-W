import { useDisclosure , Modal, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import { useState } from "react"

/***************************************************************/

import { Button } from "../style_components/button"
import { Text } from "../style_components/text"
import CardService from "../backend_connection/services"
/***************************************************************/

export function LoadCardButton(props) {

  return (
    <>
      <Button 
        w={134} 
        colorScheme="blue" 
        loadingText="Loading..."
      >
        Load Card
      </Button>
    </>
  );
}