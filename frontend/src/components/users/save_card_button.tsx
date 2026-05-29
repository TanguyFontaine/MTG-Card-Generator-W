import { useState } from "react";
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";

import { Button } from "../../style_components/button";
import { Text } from "../../style_components/text";
import CardService from "../../api/services";
import ImageUploader from "../../classes/image_uploader";
import { useCardContext } from "../../contexts/card_context";
import { CardActionName } from "../../contexts/card_actions";
import { useUserContext } from "../../contexts/user_context";
import type { ImageFile } from "../../classes/image_file_interface";
import { colorsToWubrgString } from "../../classes/frame/frame_utilities";
import { FrameType } from "../../classes/frame/frame_type";
/***************************************************************/

// async to wait for the image upload to complete before saving the card
async function getImageUrl(imageFile: ImageFile | undefined): Promise<string>
{
   let result = "";

   if (imageFile.localFile && !imageFile.url)
   {
      result = await ImageUploader.uploadImage(imageFile.localFile, imageFile.localFileName);
   }
   else if (imageFile.url)
   {
      result = imageFile.url;
   }

   return result;
}

export function SaveCardButton()
{
   const { state, dispatch } = useCardContext();
   const { user } = useUserContext();
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
         // Use extracted function
         const imageUrl = await getImageUrl(state.imageFile);

         // Create comprehensive card data object
         const specialFrameData = state.frameType === FrameType.LevelUp
            ? { levelAbilities: [state.levelBaseAbility, state.levelAbility1, state.levelAbility2] }
            : null;

         const cardToSend = {
            name: state.cardName || "",
            spellDescription: state.spellDescription || "",
            manaCost: state.manaCost.toString(),
            type: state.cardType.toString(),
            flavorText: state.flavorText || "",
            imageUrl: imageUrl,
            power: state.power || "",
            toughness: state.toughness || "",
            frameCustomization: {
               frameColorOverride: colorsToWubrgString(state.frameColorOverride),
               withVehicleFrame: state.withVehicleFrame,
               withColorIndicator: state.withColorIndicator,
               frameType: state.frameType,
            },
            fontSizesMainFields: {
               name: state.nameFontSize,
               types: state.typesFontSize,
               spell: state.spellFontSize,
               flavorText: state.flavorTextFontSize,
               powerToughness: state.powerToughnessFontSize,
            },
            specialFrameData,
         };

         let savedCard;
         if (state.cardId)
         {
            // Update existing card
            console.log("Updating existing card with ID:", state.cardId);
            savedCard = await CardService.updateCard(state.cardId, cardToSend, user?.id);
         }
         else
         {
            // Create new card
            console.log("Creating new card");
            savedCard = await CardService.saveCard(cardToSend, user?.id);
            dispatch({ name: CardActionName.setCardId, data: savedCard.id });
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
            w={112}
            onClick={handleSaveCard}
            isLoading={isLoading}
            loadingText="Saving..."
         >
            Save
         </Button>
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>{saveStatus === "success" ? "Success" : "Error"}</ModalHeader>
               <ModalCloseButton />
               <ModalBody pb={6}>
                  <Text color={saveStatus === "success" ? "brand.success" : "brand.error"}>
                     {getModalMessage()}
                  </Text>
               </ModalBody>
            </ModalContent>
         </Modal>
      </>
   );
}
