const Client = require('bitcoin-core');

// Initialize the Bitcoin client
const client = new Client({
    network: process.env.NETWORK,
    username: process.env.RPC_USER,
    password: process.env.RPC_PASSWORD
});

async function getBlockchainInfo() {
    try {
        const response = await client.getBlockchainInformation();
        console.log('Blockchain Info:', response);
    } catch (error) {
        console.error('Error fetching blockchain info:', error.message);
    }
}

//console.log("nodejs started up...")

getBlockchainInfo();