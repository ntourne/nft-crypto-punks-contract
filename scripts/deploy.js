const main = async () => {
    const cryptoPunkNFTContractFactory = await hre.ethers.getContractFactory('CryptoPunkNFT');
    const cryptoPunkNFTContract = await cryptoPunkNFTContractFactory.deploy(10000, 'https://www.domain.com/');
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