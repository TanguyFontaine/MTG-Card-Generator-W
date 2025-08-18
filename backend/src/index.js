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
    const query = 'SELECT * FROM' + cardsTableName + ';';
    const result = await dbConnectionPool.query(query);
    response.json(result.rows);
  } 
  catch (err)
  {
    response.status(500).json({ error: err.message });
  }
});

// TODO: Put this in a separate file in a write folder, or a db folder with read and write queries
// Route to insert a card
app.post(ROUTES.CARDS_TABLE_URL, async (req, res) => {
  const { name, spellDescription } = req.body;
  console.log('Received POST request with data:', { name, spellDescription });

  try
  {
    const result = await dbConnectionPool.query(
      'INSERT INTO Cards (name, spelldescription) VALUES ($1, $2) RETURNING *',
      [name, spellDescription]
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

/*************************************************************************
app.post(ROUTES.CARDS_TABLE_URL, async (req, res) => {
  const { card } = req.body; // Assuming card is an object of type Card, what am i doing ?
  try
  {

    console.log('Saving card data 2'); // For debugging

    // Just insert name and description for now, but can be extended to other fields
    const result = await dbConnectionPool.query(
      'INSERT INTO Cards (name, description) VALUES ($1, $2) RETURNING *',
      [card.name, card.spellDescription] 
    );
    res.status(201).json(result.rows[0]);
  }
  catch (err)
  {
    res.status(500).json({ error: err.message });
  }
});
/*************************************************************************/

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});