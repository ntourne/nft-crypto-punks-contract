// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CryptoPunkNFT is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    uint256 public maxSupply;

    string public baseURI;

    event NFTMinted(address sender, uint256 tokenId);

    constructor(uint256 _maxSupply, string memory _newBaseURI)
        ERC721("Crypto Punk", "PUNK")
    {
        // It increments tokenIds counter so first NFT minted starts with 1 instead of 0
        _tokenIdCounter.increment();

        baseURI = _newBaseURI;
        maxSupply = _maxSupply;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function mint(address to) public {
        // Get current tokenId and increment one
        // It allows that first token id minted is 1
        uint256 tokenId = _tokenIdCounter.current();

        require(
            tokenId <= maxSupply,
            "Total supply of tokens have been minted"
        );

        _safeMint(to, tokenId);

        _tokenIdCounter.increment();

        emit NFTMinted(to, tokenId);
    }

    function totalMinted() public view returns (uint256) {
        return _tokenIdCounter.current() - 1;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return string(abi.encodePacked(super.tokenURI(tokenId), ".json"));
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
