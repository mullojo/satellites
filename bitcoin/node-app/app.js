import axios from 'axios';

const rpcURL = 'http://bitcoind:18332';  // Docker service name
const rpcUser = process.env.RPC_USER;
const rpcPassword = process.env.RPC_PASSWORD;

async function getBlockchainInfo() {
    try {
        const response = await axios.post(rpcURL, {
            jsonrpc: "1.0",
            id: "curltest",
            method: "getblockchaininfo",
            params: []
        }, {
            auth: {
                username: rpcUser,
                password: rpcPassword
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Blockchain Info:', response.data);
    } catch (error) {
        console.error('Error fetching blockchain info:', error.message);
        if (error.response) {
            console.error('Error response:', error.response.data);
        }
    }
}

getBlockchainInfo();
