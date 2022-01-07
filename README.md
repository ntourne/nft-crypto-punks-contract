# NFT Crypto Punks Smart Contract

This project was created to research about smart contracts on Solidity to be deployed and executed in EVM.

It uses Hardhat, OpenZeppelin, chai, etc.

## Getting Started

### 1. Install dependencies

After clone the repository just install all dependencies.

```shell
npm install
```

### 2. Set up .env file

Copy the `.env.example` file in this directory to `.env` (which will be ignored by Git)

```shell
cp .env.example .env
```

Then set each variable on `.env`:

- `ALCHEMY_RINKEBY_URL`: The Alchemy URL got from your account.
- `PRIVATE_KEY`: Private key of the account being used to deploy contract in Rinkeby testnet (Ethereum).
- `ETHERSCAN_API_KEY`: Etherscan API Key got from Etherscan website.
- `MNEMONIC`: Mnemonic of the account being used to deploy contract in Binance Smart Chain Testnet.

### 3. Run test & coverage

To execute test script just run:

```shell
npm run test
```

It wlll deploy contract to local network, execute all test and finalize destroy everything.

To execute coverage test script just run:

```shell
npm run coverage
```

### 4. Deploy to testnet

To deploy smart contract to Rinkeby (Ethereum testnet):

```shell
npm run deploy:rinkeby
```

To deploy smart contract to BSC testnet:

```shell
npm run deploy:bsc-testnet
```

### Other hardhat commands.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

### Steps to release contract (outdated)

1. contracts > Run test on smart contract
2. generate > Generate X number of NFT images
3. ipfs > Upload these images to ipfs using Pinata. Get CID (i.e. QmTiEQ4LLmaMFpsUTbDJthgnCoPygXmiaXRFU8DvsZvUD2)
4. generate > Update `constants.js` and set ipfs://<CID> on `ipfsImagePath` (i.e. https://ipfs.io/ipfs/QmTiEQ4LLmaMFpsUTbDJthgnCoPygXmiaXRFU8DvsZvUD2)
5. generate > Run script `update-image-metadata.js` to change `image` path in all json metadata files.
6. ipfs > Upload json metadata to Pinata. Get CID
7. contracts > Update `deploy.js` to set X as max supply and `https://ipfs.io/ipfs/<CID>` as baseURL
8. contracts > Deploy smart contract
9. contracts > Verify and validate contracts in Etherscan. Generate flatten using `npx hardhat flatten > contract-flatten.sol`. Remove all licenses and set only one on top (`SPDX-License-Identifier: MIT`)
10. etherscan > Complete form
