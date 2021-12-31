const main = async () => {
    const cryptoPunkNFTContractFactory = await hre.ethers.getContractFactory('CryptoPunkNFT');
    const cryptoPunkNFTContract = await cryptoPunkNFTContractFactory.deploy(99, 'https://ipfs.io/ipfs/QmS48kamssvUUioYqkqKa5iNEXAn9qj76XnaNSwaePEXkt/');
    await cryptoPunkNFTContract.deployed();
    console.log("Contract deployed to:", cryptoPunkNFTContract.address);
    console.log();
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();