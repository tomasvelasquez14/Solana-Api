const web3 = require('@solana/web3.js');

(async() => {

    //Conect to cluster
    const connection = new web3.Connection(
        web3.clusterApiUrl('devnet'),
        'confirmed'
    );

    //Create a "from" Keypair
    const from = web3.Keypair.generate();
    await connection.requestAirdrop(from.publicKey, 1000000000);

    //Create a "to" Keypair
    const to = web3.Keypair.generate();
    await connection.requestAirdrop(to.publicKey, 1000000000);

    setTimeout(async() => {
        
        // Add transfer instructions to the transaction
        let transaction = new web3.Transaction().add(
            web3.SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to.publicKey,
                lamports: web3.LAMPORTS_PER_SOL,
            })
        );


        //Sign transaction, brodcast and confirm
        let signature = await web3.sendAndConfirmRawTransaction(
            connection,
            transaction,
            [from],
            {commitment: "confirmed"}
        );


        console.log("Signature :" + signature);
        console.log("Succes");

    }, 10000);


})();