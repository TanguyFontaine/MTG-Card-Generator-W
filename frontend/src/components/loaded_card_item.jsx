// To represent an item loaded from the DB
// It is a button that shows the card name and when clicked loads the card data into the parent component

import { Button } from "../style_components/button"
import CardService from "../backend_connection/services"
import { ManaCostObj } from "../classes/mana_cost"

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
      if (parentProps.setManaCost) parentProps.setManaCost(ManaCostObj.fromString(selectedCard.manacost));

      // Parse type back to arrays if needed
      if (selectedCard.type) {
        const fullTypeString = selectedCard.type.trim();
        const typeWords = fullTypeString.split(' ').filter(Boolean);
        
        // Define known super types and regular types
        const knownSuperTypes = ['Legendary', 'Snow', 'Basic', 'Token'];
        const knownTypes = ['Creature', 'Artifact', 'Enchantment', 'Planeswalker', 'Instant', 'Sorcery', 'Land', 'Tribal'];
        
        // Separate super types, regular types, and subtypes
        const superTypes = typeWords.filter(type => knownSuperTypes.includes(type));
        const regularTypes = typeWords.filter(type => knownTypes.includes(type));
        const remainingWords = typeWords.filter(type => 
          !knownSuperTypes.includes(type) && !knownTypes.includes(type)
        );
        const subTypes = remainingWords.join(' ');
        
        // Set the separated types
        if (parentProps.setSuperTypes) parentProps.setSuperTypes(superTypes);
        if (parentProps.setTypes) parentProps.setTypes(regularTypes);
        if (parentProps.setSubTypes) parentProps.setSubTypes(subTypes);
      } else {
        // Reset all type fields if no type data
        if (parentProps.setSuperTypes) parentProps.setSuperTypes([]);
        if (parentProps.setTypes) parentProps.setTypes([]);
        if (parentProps.setSubTypes) parentProps.setSubTypes("");
      }
      
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