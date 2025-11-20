import { useDisclosure , Modal, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react"

/***************************************************************/

import { Button } from "../style_components/button"
import { ManaCostObj } from "../classes/mana_cost";
/***************************************************************/

export function NewCardButton(props) {

  const handleNewCard = () => {
    console.log('Creating new card - resetting all data');
    
    // Reset card data
    
    props.setCardId(null);
    
    props.setCardName("");
    props.setSpellDescription("");
    props.setTypes([]);
    props.setSuperTypes([]);
    props.setSubTypes([]);
    props.setSuperTypes([]);
    props.setSubTypes([]);
    props.setManaCost(new ManaCostObj());
    props.setFlavorText("");
    props.setPower("");
    props.setToughness("");
    props.setCardFrame("");
    props.setImageFile({
      name: "",
      content: ""
    });

    console.log('Card data reset complete');
  };

  return (
    <>
      <Button w={134} colorScheme="blue" onClick={handleNewCard}>
        New Card
      </Button>
    </>
  );
}