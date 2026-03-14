import { API_CONFIG, ROUTES } from "../../../shared/routes";

import type { Card } from "../classes/card";

async function handleResponse(response: Response): Promise<Response>
{
   if (!response.ok)
   {
      let errorMessage = `HTTP error! status: ${response.status}`;

      try
      {
         const errorData = await response.json();
         if (errorData.error)
         {
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
   async getAllCards(): Promise<Card[]>
   {
      try
      {
         // No need to define options for the fetch method: GET is the default method for 'fetch'
         // no body is needed for GET requests
         const response = await fetch(`${API_CONFIG.BASE_URL}${ROUTES.CARDS_TABLE_URL}`);
         await handleResponse(response);
         
         const receivedCards: Card[] = await response.json();
         receivedCards.sort((a, b) => (a.id ?? 0) - (b.id ?? 0)); 
         return receivedCards;
      }
      catch (error)
      {
         console.error("Error fetching cards:", error);
         throw error;
      }
   },

   async getCardById(cardId: number): Promise<Card>
   {
      try
      {
         const response = await fetch(`${API_CONFIG.BASE_URL}${ROUTES.CARD_BY_ID_URL(cardId)}`);
         await handleResponse(response);
         return await response.json();
      }
      catch (error)
      {
         console.error("Error fetching card:", error);
         throw error;
      }
   },

   async saveCard(cardToSend: Card): Promise<Card>
   {
      try
      {
         const response = await fetch(`${API_CONFIG.BASE_URL}${ROUTES.CARDS_TABLE_URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cardToSend),
         });

         await handleResponse(response);
         return await response.json();
      }
      catch (error)
      {
         console.error("Error saving card:", error);
         throw error;
      }
   },

   async updateCard(cardId: number, cardToSend: Card): Promise<Card>
   {
      try
      {
         const response = await fetch(`${API_CONFIG.BASE_URL}${ROUTES.CARD_BY_ID_URL(cardId)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cardToSend),
         });

         await handleResponse(response);
         return await response.json();
      }
      catch (error)
      {
         console.error("Error updating card:", error);
         throw error;
      }
   },

   /*
   // Delete a card
   async deleteCard(cardId: number): Promise<Card>
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
