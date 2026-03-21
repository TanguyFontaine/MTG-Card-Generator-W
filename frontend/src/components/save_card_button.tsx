import { useState } from "react";
import { useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";

import { Button } from "../style_components/button";
import { Text } from "../style_components/text";
import CardService from "../backend_connection/services";
import ImageUploader from "../classes/image_uploader";
import { ManaCostObj } from "../classes/mana_cost";
import { CardTypeObj } from "../classes/card_type";
import type { ImageFile } from "../classes/image_file_interface";
/***************************************************************/

// async to wait for the image upload to complete before saving the card
async function getImageUrl(imageFile: ImageFile | undefined): Promise<string>
{
   let result = "";

   if (imageFile.localFile && !imageFile.url)
   {
      result = await ImageUploader.uploadImage(imageFile.localFileName, imageFile.localFile);
   }
   else if (imageFile.url)
   {
      result = imageFile.url;
   }

   return result;
}

interface SaveCardButtonProps
{
   cardId: number | null;
   cardName: string;
   spellDescription: string;
   cardType: CardTypeObj;
   manaCost: ManaCostObj;
   flavorText: string;
   power: string;
   toughness: string;
   cardFrame: string;
   imageFile: ImageFile;
   setCardId: (id: number | null) => void;
}

export function SaveCardButton(props: SaveCardButtonProps)
{
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [isLoading, setIsLoading] = useState(false);
   const [saveStatus, setSaveStatus] = useState<"success" | "error" | null>(null);
   const [errorMessage, setErrorMessage] = useState("");

   const handleSaveCard = async () =>
   {
      setIsLoading(true);
      setSaveStatus(null);
      setErrorMessage("");

      try
      {
         // Debug: Log all props to see what we're receiving
         console.log("All props:", props);

         // Use extracted function
         const imageUrl = await getImageUrl(props.imageFile);

         // Create comprehensive card data object
         const cardToSend = {
            name: props.cardName || "",
            spellDescription: props.spellDescription || "",
            manaCost: props.manaCost.toString(),
            type: props.cardType.toString(),
            flavorText: props.flavorText || "",
            frame: props.cardFrame || "",
            imageUrl: imageUrl,
            power: props.power || "",
            toughness: props.toughness || "",
         };

         let savedCard;
         if (props.cardId)
         {
            // Update existing card
            console.log("Updating existing card with ID:", props.cardId);
            savedCard = await CardService.updateCard(props.cardId, cardToSend);
         }
         else
         {
            // Create new card
            console.log("Creating new card");
            savedCard = await CardService.saveCard(cardToSend);
            // Set the card ID so future saves will update instead of create
            props.setCardId(savedCard.id);
         }

         setSaveStatus("success");
         onOpen(); // Open the modal to show success
      }
      catch (error)
      {
         setSaveStatus("error");
         setErrorMessage((error as Error).message);
         onOpen(); // Open the modal to show error
      }
      finally
      {
         setIsLoading(false);
      }
   };

   const getModalMessage = () =>
   {
      return saveStatus === "success" ? "Card Saved Successfully!" : `Save failed: ${errorMessage}`;
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
