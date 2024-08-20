const express = require('express');
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-adapter-http'));

const app = express();
const port = 3333;

// Middleware to allow CORS requests (necessary for syncing with the browser)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Example route to interact with your database
app.get('/sync', async (req, res) => {
  const db = new PouchDB('http://localhost:5984/mydatabase');
  // Example database operation (e.g., fetch documents)
  const result = await db.allDocs({ include_docs: true });
  res.json(result);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
