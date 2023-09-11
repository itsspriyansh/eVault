// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract GovToken is ERC721Enumerable, Ownable {
    using SafeMath for uint256;

    uint256 public tokenCounter;

    struct CertificateMetadata {
        string name;
        string department;
        string description;
        string imageURL; 
    }

    mapping(uint256 => CertificateMetadata) public tokenMetadata;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        tokenCounter = 0;
    }

    function mintCertificate(
        address recipient,
        string memory name,
        string memory department,
        string memory description,
        string memory imageURL
    ) public onlyOwner {
        uint256 tokenId = tokenCounter;
        _mint(recipient, tokenId);
        tokenMetadata[tokenId] = CertificateMetadata(name,department, description, imageURL);
        tokenCounter = tokenCounter.add(1);
    }

    function fetchCertificateOf(address owner) public view returns (CertificateMetadata[] memory) {
        uint256 tokenCount = balanceOf(owner);
       CertificateMetadata[] memory certificateDetails = new CertificateMetadata[](tokenCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            uint256 tokenId = tokenOfOwnerByIndex(owner, i);
           certificateDetails[i] = tokenMetadata[tokenId];
        }
        return certificateDetails;
    }
}