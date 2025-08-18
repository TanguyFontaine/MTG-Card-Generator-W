import { API_CONFIG, ROUTES } from '../../../shared/routes';

function assertResponseOK(response)
{
  if (!response.ok)
  {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}

// Card Service - handles all card-related API calls
const CardService = {

  // Get all cards
  async getAllCards()
  {
    try
    {
      const response = await fetch(`${API_CONFIG.BASE_URL}${ROUTES.CARDS_TABLE_URL}`);
      // No need to define options: GET is the default method for 'fetch'
      // no body is needed for GET requests

      assertResponseOK(response);

      return await response.json();
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
      assertResponseOK(response);
    
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
      
      assertResponseOK(response);
      return await response.json();
    }
    catch (error)
    {
      console.error('Error saving card:', error);
      throw error;
    }
  },

  
  // TODO: check if update and delete methods are needed + implement on backend side if so.

  // Update an existing card
  /*async updateCard(cardId, cardData)
  {
    try
    {
      const response = await fetch(`${API_CONFIG.BASE_URL}${ROUTES.CARD_BY_ID_URL(cardId)}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(cardData)
      });
      
      assertResponseOK(response);
      
      return await response.json();
    }
    catch (error)
    {
      console.error('Error updating card:', error);
      throw error;
    }
  },

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