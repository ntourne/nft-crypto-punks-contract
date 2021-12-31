# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

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

## Steps to release contract

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
