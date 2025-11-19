// To represent an item loaded from the DB
// It is a button that shows the card name and when clicked loads the card data into the parent component

import { Button } from "../style_components/button"
import CardService from "../backend_connection/services"

function removeBrackets(stringSymbol)
{
    return stringSymbol.slice(1, -1);
}

function setManaCostFromString(manaCostString, setManaCost, setColorlessManaAmount)
{
    if (manaCostString == null || manaCostString === "")
    {
        setManaCost([]);
        setColorlessManaAmount(-1);
        return;
    }
    const bracketMatch = manaCostString.match(/\[([^\]]*)\]/g); // regex to find all [symbol] occurrences
    console.assert(bracketMatch, 'Invalid mana cost string format, got:', manaCostString, 'expected format like [3][w][u]');

    let colorlessMana = -1;
    const manaCostArray = [];
    
    bracketMatch.forEach(bracketedSymbol => {
        const manaSymbol = removeBrackets(bracketedSymbol);
        
        // Check if it's a number (colorless mana)
        if (/^\d+$/.test(manaSymbol) && colorlessMana === -1) 
        {
            colorlessMana = parseInt(manaSymbol);
        } 
        else
        {
            manaCostArray.push(manaSymbol);
        }
    });
    
    setColorlessManaAmount(colorlessMana);
    setManaCost(manaCostArray);
}

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
      if (parentProps.setManaCost && parentProps.setColorlessManaAmount)
      {
        setManaCostFromString(selectedCard.manacost, parentProps.setManaCost, parentProps.setColorlessManaAmount);
      }
      
      // Parse type back to arrays if needed
      if (parentProps.setTypes)
      {
        if (selectedCard.type == null)
            parentProps.setTypes([]);
        else
        {
            const fullType = selectedCard.type.split(' ').filter(Boolean);
            parentProps.setTypes(fullType);
        }
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