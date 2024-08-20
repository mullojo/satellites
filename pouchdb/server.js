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

// Create a PouchDB instance with LevelDB
const db = new PouchDB('Order', { adapter: 'leveldb' });

// Sync endpoint for replication and sync
app.use('/db', require('express-pouchdb')(db));

// Start the server
app.listen(port, () => {
  console.log(`PouchDB server is running on port ${port}`);
});
