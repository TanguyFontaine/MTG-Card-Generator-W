const express = require('express');
const app = express();
const port = 3001; // Can choose any available port, this one was the one by default.

app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});