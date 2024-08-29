const express = require('express');
const axios = require('axios');

const app = express();

// RPC credentials
const rpcUser = 'bobby'; // Replace with your actual RPC username 
const rpcAuth = '0207fa532832367468c64e747c95e0b2$e9246affabe158e177c0ebc11a74b37fc14b9700664d7fe76f8ceeccd8692938'; // Replace with your actual rpcauth token


// Bitcoin Core RPC config
const config = {
  protocol: 'http',
  host: 'localhost',
  port: 18443,  // Adjust to your RPC port
  auth: {
    username: rpcUser,
    password: rpcAuth,
  },
};

// Make an RPC call to the Bitcoin node
async function callRpc(method, params = []) {
  try {
    const response = await axios.post(
      `${config.protocol}://${config.host}:${config.port}`,
      {
        jsonrpc: '1.0',
        id: 'curltest',
        method: method,
        params: params,
      },
      {
        auth: {
          username: config.auth.username,
          password: config.auth.password,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
}

// Simple endpoint to fetch node information
app.get('/getinfo', async (req, res) => {
  try {
    const data = await callRpc('getblockchaininfo');
    res.json(data.result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});