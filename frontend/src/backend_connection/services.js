import { API_CONFIG, ROUTES } from '../../../shared/routes';

async function handleResponse(response)
{
  if (!response.ok)
  {
    let errorMessage = `HTTP error! status: ${response.status}`;
    
    try 
    {
      const errorData = await response.json();
      if (errorData.error) {
        errorMessage = errorData.error;
      }
    }
    catch (e) // If we can't parse the error response, use the default message
    {}
    
    throw new Error(errorMessage);
  }
  
  return response;
}

// Card Service - handles all card-related API calls
const CardService = {

  // Get all cards sorted by ID ascending
  async getAllCards()
  {
    try
    {
      const response = await fetch(`${API_CONFIG.BASE_URL}${ROUTES.CARDS_TABLE_URL}`);
      await handleResponse(response);
      // No need to define options: GET is the default method for 'fetch'
      // no body is needed for GET requests

      let cards = await response.json();
      cards.sort((a, b) => a.id - b.id);
      return cards;
    } 
    catch (error) 
    {
      console.error('Error fetching cards:', error);
      throw error;
    }
  },

  // Get a card by ID
  async getCardById(cardId) {
    try
    {
      const response = await fetch(`${API_CONFIG.BASE_URL}${ROUTES.CARD_BY_ID_URL(cardId)}`);
      await handleResponse(response);
      return await response.json();
    }
    catch (error)
    {
      console.error('Error fetching card:', error);
      throw error;
    }
  },

  // Save a new card
  async saveCard(cardData) 
  {
    try
    {
      const response = await fetch(`${API_CONFIG.BASE_URL}${ROUTES.CARDS_TABLE_URL}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(cardData)
      });

      await handleResponse(response);
      return await response.json();
    }
    catch (error)
    {
      console.error('Error saving card:', error);
      throw error;
    }
  },

  // Update an existing card
  async updateCard(cardId, cardData)
  {
    try
    {
      const response = await fetch(`${API_CONFIG.BASE_URL}${ROUTES.CARD_BY_ID_URL(cardId)}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(cardData)
      });
      
      await handleResponse(response);
      return await response.json();
    }
    catch (error)
    {
      console.error('Error updating card:', error);
      throw error;
    }
  },

  /*
  // Delete a card
  async deleteCard(cardId)
  {
    try
    {
      const response = await fetch(`${API_CONFIG.BASE_URL}${ROUTES.CARD_BY_ID_URL(cardId)}`, {
        method: 'DELETE'
      });
      
      assertResponseOK(response);
      
      return await response.json();
    }
    catch (error)
    {
      console.error('Error deleting card:', error);
      throw error;
    }
  }*/
};

export default CardService;