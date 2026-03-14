// To represent an item loaded from the DB
// It is a button that shows the card name and when clicked loads the card data into the parent component

import { Button } from "../style_components/button";
import CardService from "../backend_connection/services";
import { ManaCostObj } from "../classes/mana_cost";
import { CardTypeObj } from "../classes/card_type";
import type { Card } from "../classes/card";
import type { CardSettersProps } from "./card_setters_props_interface";

interface LoadedCardItemProps
{
   card: Card;
   cardSettersProps: CardSettersProps;
   onError: (message: string) => void;
   setIsLoading: (loading: boolean) => void;
   onClose: () => void;
}

export function LoadedCardItem({ card, cardSettersProps, onError, setIsLoading, onClose }: LoadedCardItemProps)
{
   const handleSelectCard = async () =>
   {
      setIsLoading(true);

      try
      {
         const selectedCard = await CardService.getCardById(card.id);
         console.log("Card loaded:", selectedCard);

         // Update the parent component's state with the loaded card data
         if (cardSettersProps.setCardId) cardSettersProps.setCardId(selectedCard.id);
         if (cardSettersProps.setCardName) cardSettersProps.setCardName(selectedCard.name || "");
         if (cardSettersProps.setSpellDescription) cardSettersProps.setSpellDescription(selectedCard.spellDescription || "");
         if (cardSettersProps.setFlavorText) cardSettersProps.setFlavorText(selectedCard.flavorText || "");
         if (cardSettersProps.setPower) cardSettersProps.setPower(selectedCard.power || "");
         if (cardSettersProps.setToughness) cardSettersProps.setToughness(selectedCard.toughness || "");
         if (cardSettersProps.setLoyalty) cardSettersProps.setLoyalty(selectedCard.loyalty || "");
         if (cardSettersProps.setCardFrame) cardSettersProps.setCardFrame(selectedCard.frame || "");
         if (cardSettersProps.setManaCost) cardSettersProps.setManaCost(ManaCostObj.fromString(selectedCard.manaCost));
         if (cardSettersProps.setCardType) cardSettersProps.setCardType(CardTypeObj.fromString(selectedCard.type));

         onClose(); // Close the modal after loading

      }
      catch (error)
      {
         onError(`Failed to load card: ${(error as Error).message}`);
      }
      finally
      {
         setIsLoading(false);
      }
   };

   return (
      <Button
         variant="outline"
         width="100%"
         p={3}
         mb={2}
         textAlign="left"
         justifyContent="flex-start"
         onClick={handleSelectCard}
         _hover={{ bg: "blue.50", color: "blue.800" }}
      >
         ID: {card.id} - {card.name || "Unnamed Card"}
      </Button>
   );
}
