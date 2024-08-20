const express = require('express');
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-adapter-leveldb'));
const cors = require('cors');

const app = express();
const port = 3333;

// Configure CORS to allow requests from any origin
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Create a local PouchDB instance with LevelDB
const db = new PouchDB('Order', { adapter: 'leveldb' });

// Route to handle PouchDB database interactions
app.get('/db/Order', async (req, res) => {
  try {
    const result = await db.allDocs({ include_docs: true });
    res.json(result);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
