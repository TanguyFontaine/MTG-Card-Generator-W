import { cardsTableName, Card } from '../datamodel/card.js';
import dbConnectionPool from '../connection/database_connection.js';

export class CardWriteController {
  
  static async createCard(req, res)
  {
    console.log('Received POST request with data:', req.body);

    try
    {
      const cardData = req.body;
      const card = new Card(
        0, // id will be auto-generated
        cardData.name || "",
        cardData.manaCost || "",
        cardData.type || "",
        cardData.spellDescription || "",
        cardData.flavorText || "",
        cardData.frame || "",
        cardData.imageUrl || "",
        cardData.power || "",
        cardData.toughness || ""
      );

      const validation = card.validate();
      if (!validation.isValid)
      {
        const errorMessage = `Validation failed: ${validation.errors.join(', ')}`;
        return res.status(400).json({ 
          error: errorMessage, 
          details: validation.errors 
        });
      }

      // Insert into database with all fields
      const result = await dbConnectionPool.query(
        `INSERT INTO Cards (name, manacost, type, spelldescription, flavortext, cardframe, imageurl, power, toughness)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING *`,
        [
          card.name,
          card.manaCost,
          card.type,
          card.spellDescription,
          card.flavorText,
          card.frame,
          card.imageUrl,
          card.power,
          card.toughness
        ]
      );
      
      console.log('Card saved successfully:', result.rows[0]);
      res.status(201).json(result.rows[0]);
    }
    catch (err)
    {
      console.error('Error saving card:', err);
      res.status(500).json({ error: err.message });
    }
  }


  static async updateCard(req, res)
  {
    const cardId = req.params.id;

    try
    {
      const cardData = req.body;
      const card = new Card(
        cardId,
        cardData.name || "",
        cardData.manaCost || "",
        cardData.type || "",
        cardData.spellDescription || "",
        cardData.flavorText || "",
        cardData.frame || "",
        cardData.imageUrl || "",
        cardData.power || "",
        cardData.toughness || ""
      );

      // Validate the card data
      const validation = card.validate();
      if (!validation.isValid)
      {
        const errorMessage = `Validation failed: ${validation.errors.join(', ')}`;
        return res.status(400).json({ 
          error: errorMessage, 
          details: validation.errors 
        });
      }

      // Update in database with all fields
      const result = await dbConnectionPool.query(
        `UPDATE Cards SET 
          name = $2, manacost = $3, type = $4, spellDescription = $5, 
          flavortext = $6, cardframe = $7, imageurl = $8, power = $9, toughness = $10
        WHERE id = $1 RETURNING *`,
        [
          cardId,
          card.name,
          card.manaCost,
          card.type,
          card.spellDescription,
          card.flavorText,
          card.frame,
          card.imageUrl,
          card.power,
          card.toughness
        ]
      );
      
      if (result.rows.length === 0)
      {
        return res.status(404).json({ error: 'Card not found' });
      }
      
      console.log('Card updated successfully:', result.rows[0]);
      res.json(result.rows[0]);
    }
    catch (err)
    {
      console.error('Error updating card:', err);
      res.status(500).json({ error: err.message });
    }
  }


  static async deleteCard(req, res)
  {
    // TODO: Implement delete functionality
    res.status(501).json({ error: 'Delete operation not yet implemented' });
  }
}