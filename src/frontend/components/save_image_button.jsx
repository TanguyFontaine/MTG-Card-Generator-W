import { useDisclosure , Modal, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react"
//import { exportComponentAsPNG } from 'react-component-export-image';
/***************************************************************/

import { Button } from "../style_components/button"
import { Text } from "../style_components/text"
/***************************************************************/

export function SaveImageButton(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button w={134} colorScheme="blue" onClick={onOpen}>Save</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Card saved!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>OR NOT...</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}