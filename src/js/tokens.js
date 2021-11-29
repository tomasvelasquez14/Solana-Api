const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');

( async() =>{
    //Create a connection 
    const connection = new web3.Connection(
        web3.clusterApiUrl('devnet'),
        'confirmed'
    );

    //Create an Address
    const key = web3.Keypair.generate();
    const pubKey = key.publicKey.toBase58();
    const secret = JSON.stringify(Array.from(key.secretKey));
    //const secret = key?.secretKey.toString();
    
    console.log('My address: ' + pubKey);

    //Airdrop the recent created account
    await connection.requestAirdrop(key.publicKey, 1000000000);

    //Set a timeout to account airdrop finalization

    let mint;
    var myToken;
    setTimeout(async () => {
        
        //Create a mint
        mint = await splToken.Token.createMint(
            connection,
            key,
            key.publicKey,
            null,
            9,
            splToken.TOKEN_PROGRAM_ID,
        );

        console.log('Mint public address ' + mint.publicKey.toBase58());

        //Get token account of this Solana address, if it dosent exist, create it
        myToken = await mint.getOrCreateAssociatedAccountInfo(
            key.publicKey
        );

        console.log('token public address: ' + myToken.address.toBase58());

        //minting 1000 new tokens to the token address we just created
        await mint.mintTo(myToken.address, key.publicKey, [], 100000000000)

            console.log('Done!');

    }, 2000);

})();