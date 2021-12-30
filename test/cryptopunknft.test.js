const { expect } = require('chai');
const hardhat = require('hardhat');

const { ethers } = hardhat;

const BASE_URI = 'https://domain.com/';

async function deploy(maxSupply = 10000, baseURI = BASE_URI) {
    const [owner, alice, bob, mark] = await ethers.getSigners();

    let factory = await ethers.getContractFactory("CryptoPunkNFT", owner);
    const contract = await factory.deploy(maxSupply, baseURI);

    const minterFactory = factory.connect(alice)
    const minterContract = minterFactory.attach(contract.address)

    return {
        contract,
        minterContract,
        owner,
        alice,
        bob,
        mark
    }
}


describe('CryptoPunkNFT', () => {

    it('Should deploy', async () => {
        const [owner] = await ethers.getSigners();

        const CryptoPunkNFTFactory = await ethers.getContractFactory('CryptoPunkNFT', owner);
        const cryptoPunkNFT = await CryptoPunkNFTFactory.deploy(5000, BASE_URI);
        const contract = await cryptoPunkNFT.deployed();

        await expect(await contract.owner()).to.equals(owner.address, 'Owner is not correct');
        await expect((await contract.maxSupply()).toNumber()).to.equals(5000, 'Incorrect number of maxSupply of tokens');
    });

    it('Should mint a token', async () => {
        const { contract, alice } = await deploy();

        await contract.mint(alice.address);
        await expect((await contract.totalMinted()).toNumber()).to.equals(1, 'Incorrect number of tokens minted');
    });


    it('Should fail to mint a token if max supply is reached', async () => {
        const { minterContract, alice } = await deploy(3);

        await minterContract.mint(alice.address);
        await minterContract.mint(alice.address);
        await minterContract.mint(alice.address);

        await expect((await minterContract.totalMinted()).toNumber()).to.equals(3, 'Incorrect number of tokens minted');

        await expect(minterContract.mint(alice.address))
            .to.be.revertedWith('Total supply of tokens have been minted');

        await expect((await minterContract.totalMinted()).toNumber()).to.equals(3, 'Incorrect number of tokens minted');
    });

    it('Should return baseUri', async () => {
        const { minterContract, alice } = await deploy();
        await minterContract.mint(alice.address);
        await expect(await minterContract.tokenURI(1)).to.equals(BASE_URI + 1, 'Incorrect token URI');
    });

    it('Should change baseURI', async () => {
        const { contract } = await deploy();
        await expect(await contract.baseURI()).to.equals(BASE_URI, 'Incorrect base URI before change');

        const newBaseURI = 'https://newbaseuri.com/';
        await contract.setBaseURI(newBaseURI);
        await expect(await contract.baseURI()).to.equals(newBaseURI, 'Incorrect base URI after change');
    });

    it('Should not allow change baseURI if not owner', async () => {
        const { minterContract } = await deploy();

        await expect(await minterContract.baseURI()).to.equals(BASE_URI, 'Incorrect base URI before change');
        await expect(minterContract.setBaseURI('https://fakeurl.com/')).to.be.revertedWith('Ownable: caller is not the owner');
        await expect(await minterContract.baseURI()).to.equals(BASE_URI, 'Incorrect base URI after failed change');
    });

    /*
    it('Should burn a token', async () => {
        const { minterContract, alice } = await deploy();

        await minterContract.mint(alice.address);

        await minterContract._burn(1);
    });
    */

    it("Should support interface", async function () {

        const { contract } = await deploy();
        await expect(await contract.supportsInterface(0x01ffc9a7))
            .to.be.equals(true);
    });
})