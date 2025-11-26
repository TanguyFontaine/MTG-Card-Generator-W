// To represent an item loaded from the DB
// It is a button that shows the card name and when clicked loads the card data into the parent component

import { Button } from "../style_components/button"
import CardService from "../backend_connection/services"
import { ManaCostObj } from "../classes/mana_cost"
import { CardTypeObj } from "../classes/card_type"

export function LoadedCardItem({ card, parentProps, onError, setIsLoading, onClose }) {

  const handleSelectCard = async () => {
    setIsLoading(true);
    
    try 
    {
      const selectedCard = await CardService.getCardById(card.id);
      console.log('Card loaded:', selectedCard);
      
      // Update the parent component's state with the loaded card data
      if (parentProps.setCardId) parentProps.setCardId(selectedCard.id);
      if (parentProps.setCardName) parentProps.setCardName(selectedCard.name || "");
      if (parentProps.setSpellDescription) parentProps.setSpellDescription(selectedCard.spelldescription || "");
      if (parentProps.setFlavorText) parentProps.setFlavorText(selectedCard.flavortext || "");
      if (parentProps.setPower) parentProps.setPower(selectedCard.power || "");
      if (parentProps.setToughness) parentProps.setToughness(selectedCard.toughness || "");
      if (parentProps.setLoyalty) parentProps.setLoyalty(selectedCard.loyalty || "");
      if (parentProps.setCardFrame) parentProps.setCardFrame(selectedCard.cardframe || "");
      if (parentProps.setPower) parentProps.setPower(selectedCard.power || "");
      if (parentProps.setToughness) parentProps.setToughness(selectedCard.toughness || "");
      if (parentProps.setManaCost) parentProps.setManaCost(ManaCostObj.fromString(selectedCard.manacost));
      if (parentProps.setCardType) parentProps.setCardType(CardTypeObj.fromString(selectedCard.type));
      
      onClose(); // Close the modal after loading
      
    } 
    catch (error)
    {
      onError(`Failed to load card: ${error.message}`);
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
      ID: {card.id} - {card.name || 'Unnamed Card'}
    </Button>
  );
}