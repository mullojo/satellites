const express = require('express');
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-adapter-leveldb'));
const cors = require('cors');

const app = express();
const port = 3333;

// CORS configuration
const corsOptions = {
  origin: 'https://cdpn.io',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Body parser for handling POST and PUT requests
app.use(express.json());

// Create a PouchDB instance with LevelDB
const db = new PouchDB('Order', { adapter: 'leveldb' });

// Route to get a document by ID
app.get('/db/:id', async (req, res) => {
  try {
    const doc = await db.get(req.params.id);
    res.json(doc);
  } catch (error) {
    res.status(404).json({ error: 'Document not found' });
  }
});

// Route to create a new document
app.post('/db', async (req, res) => {
  try {
    const response = await db.post(req.body);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error creating document' });
  }
});

// Route to update a document
app.put('/db/:id', async (req, res) => {
  try {
    const doc = await db.get(req.params.id);
    const updatedDoc = { ...doc, ...req.body };
    const response = await db.put(updatedDoc);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error updating document' });
  }
});

// Route to delete a document
app.delete('/db/:id', async (req, res) => {
  try {
    const doc = await db.get(req.params.id);
    const response = await db.remove(doc);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting document' });
  }
});

// Route to handle replication (sync)
app.post('/db/_bulk_docs', async (req, res) => {
  try {
    const response = await db.bulkDocs(req.body.docs);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error syncing documents' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`PouchDB server is running on port ${port}`);
});
