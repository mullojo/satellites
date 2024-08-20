const express = require('express');
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-adapter-leveldb'));

const app = express();
const port = 3333;

// Create a local PouchDB instance with LevelDB
const db = new PouchDB('Order', { adapter: 'leveldb' });

// Serve static files (if needed)
app.use(express.static('public'));

// Route to handle PouchDB database interactions
app.get('/db/Order', async (req, res) => {
  // Handle requests to interact with PouchDB
  // Example: Fetch all documents
  try {
    const result = await db.allDocs({ include_docs: true });
    res.json(result);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// Route to handle PouchDB database interactions
app.get('/db/all-docs', async (req, res) => {
    try {
      const result = await db.allDocs({ include_docs: true });
      res.json(result);
    } catch (error) {
      res.status(500).send(error.toString());
    }
  });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
