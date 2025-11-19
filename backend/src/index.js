import { ROUTES } from '../../shared/routes.js';
import { cardsTableName, Card } from './datamodel/card.js';
import express from 'express';
import cors from 'cors';
import dbConnectionPool from './connection/database_connection.js'; // Import the database connection pool

const app = express();
const port = 3001; // Can choose any available port, this one was the one by default.

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your React frontend
  credentials: true
}));

app.use(express.json());


// TODO: Put this in a separate file in a loader folder
// Route to get all cards
app.get(ROUTES.CARDS_TABLE_URL, async (req, response) => {
  try
  {
    const query = 'SELECT * FROM ' + cardsTableName + ';';
    const result = await dbConnectionPool.query(query);
    response.json(result.rows);
  } 
  catch (err)
  {
    response.status(500).json({ error: err.message });
  }
});

// Route to get a specific card by ID
app.get(ROUTES.CARD_BY_ID_URL(':id'), async (req, response) => {
  try 
  {
    const cardId = req.params.id;
    
    const query = 'SELECT * FROM ' + cardsTableName + ' WHERE id = $1;';
    const result = await dbConnectionPool.query(query, [cardId]);
    
    if (result.rows.length === 0) 
    {
      return response.status(404).json({ error: 'Card not found' });
    }
    
    response.json(result.rows[0]);
  } 
  catch (err)
  {
    console.error('Error fetching card by ID:', err);
    response.status(500).json({ error: err.message });
  }
});

// TODO: Put this in a separate file in a write folder, or a db folder with read and write queries
// Route to insert a card
app.post(ROUTES.CARDS_TABLE_URL, async (req, res) => {
  console.log('Received POST request with data:', req.body);

  try {
    // Create Card instance from request data
    const cardData = req.body;
    const card = new Card(
      0, // id will be auto-generated
      cardData.name || "",
      cardData.manaCost || "",
      cardData.type || "",
      cardData.spellDescription || "",
      cardData.flavorText || "",
      cardData.frame || "",
      cardData.imageUrl || ""
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

    // Insert into database with all fields
    const result = await dbConnectionPool.query(
      `INSERT INTO Cards (name, manacost, type, spelldescription, flavortext, cardframe, imageurl)
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *`,
      [
        card.name,
        card.manaCost,
        card.type,
        card.spellDescription,
        card.flavorText,
        card.frame,
        card.imageUrl
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
});

// Route to update an existing card
app.put(ROUTES.CARD_BY_ID_URL(':id'), async (req, res) => {
  const cardId = req.params.id;
  console.log('Received PUT request for card ID:', cardId, 'with data:', req.body);

  try {
    // Create Card instance for validation (with existing id)
    const cardData = req.body;
    const card = new Card(
      cardId,
      cardData.name || "",
      cardData.manaCost || "",
      cardData.type || "",
      cardData.spellDescription || "",
      cardData.flavorText || "",
      cardData.frame || "",
      cardData.imageUrl || ""
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
        flavortext = $6, cardframe = $7, imageurl = $8
      WHERE id = $1 RETURNING *`,
      [
        cardId,
        card.name,
        card.manaCost,
        card.type,
        card.spellDescription,
        card.flavorText,
        card.frame,
        card.imageUrl
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
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});