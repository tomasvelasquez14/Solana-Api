const web3 = require('@solana/web3.js');
const spl = require('@solana/spl-token');

const solanaUrl = 'https://api.devnet.solana.com';

(async () => {

    const connection = await new web3.Connection(solanaUrl);
    const address = 'HbF6GfXfBbaASRW8qtmzjvAeJkUd1H68jfQG1cPa5jtE';
    const commit = connection.commitment;


    const getAccountInfo = async (pubKey, commitment) => {

        const res = json
    };
    
    getAccountInfo(address, commit)
    .then

})()

