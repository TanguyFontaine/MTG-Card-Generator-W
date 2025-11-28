import { cardsTableName, Card } from '../datamodel/card.js';
import dbConnectionPool from '../connection/database_connection.js';

export class CardReadController {
  
  static async getAllCards(req, res)
  {
    try
    {
      const query = 'SELECT * FROM ' + cardsTableName + ';';
      const result = await dbConnectionPool.query(query);
      res.json(result.rows);
    } 
    catch (err)
    {
      console.error('Error fetching all cards:', err);
      res.status(500).json({ error: err.message });
    }
  }

  static async getCardById(req, res)
  {
    try
    {
      const cardId = req.params.id;
      
      const query = 'SELECT * FROM ' + cardsTableName + ' WHERE id = $1;';
      const result = await dbConnectionPool.query(query, [cardId]);
      
      if (result.rows.length === 0)
      {
        return res.status(404).json({ error: 'Card not found' });
      }
      
      res.json(result.rows[0]);
    } 
    catch (err)
    {
      console.error('Error fetching card by ID:', err);
      res.status(500).json({ error: err.message });
    }
  }
}