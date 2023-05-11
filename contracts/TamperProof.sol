// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// @title A contract for Trustworthy product delivery service powered by a Escrow Smart Contract
// @author Jovan Mwesigwa Balambirwa
// @github https://github.com/JovanMwesigwa

error TamperProof__NotAuthorized();

contract TamperProof {
    mapping(uint256 => Document) private s_document;

    address private i_admin;

    uint256 private s_count;

    constructor() {
        i_admin = msg.sender;
        s_count = 0;
    }

    struct Document {
        uint256 id;
        string title;
        string author;
        string creator;
        string producer;
        string dateCreated;
        uint256 docLength;
    }

    function addDocument(
        string memory _title,
        string memory _author,
        string memory _creator,
        string memory _producer,
        string memory _dateCreated,
        uint256 _docLength
    ) public {
        // Verify that only the admin is adding a document
        if (i_admin != msg.sender) {
            revert TamperProof__NotAuthorized();
        }

        Document memory newDoc = Document(
            s_count,
            _title,
            _author,
            _creator,
            _producer,
            _dateCreated,
            _docLength
        );

        s_document[s_count] = newDoc;

        s_count += 1;
    }

    function approveDocument(
        uint256 _id,
        string memory _title,
        string memory _author,
        string memory _creator,
        string memory _producer,
        string memory _dateCreated,
        uint256 _docLength
    ) public view returns (bool) {
        Document storage document = s_document[_id];

        bool trueTitle = keccak256(abi.encodePacked(_title)) ==
            keccak256(abi.encodePacked(document.title));
        bool trueAuthor = keccak256(abi.encodePacked(_author)) ==
            keccak256(abi.encodePacked(document.author));
        bool trueCreator = keccak256(abi.encodePacked(_creator)) ==
            keccak256(abi.encodePacked(document.creator));
        bool trueProducer = keccak256(abi.encodePacked(_producer)) ==
            keccak256(abi.encodePacked(document.producer));
        bool trueDateCreated = keccak256(abi.encodePacked(_dateCreated)) ==
            keccak256(abi.encodePacked(document.dateCreated));
        bool trueDocLength = _docLength == document.docLength;

        bool isValid = (trueTitle &&
            trueAuthor &&
            trueCreator &&
            trueAuthor &&
            trueProducer &&
            trueDateCreated &&
            trueDocLength);

        return isValid;
    }

    // View functions
    function getDocument(uint256 docId) public view returns (Document memory) {
        return s_document[docId];
    }

    function getAdmin() public view returns (address) {
        return i_admin;
    }

    function getCount() public view returns (uint256) {
        return s_count;
    }
}
