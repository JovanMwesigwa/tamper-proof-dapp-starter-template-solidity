const { expect } = require('chai')
const { ethers } = require('hardhat')
const { DOCUMENT_INFO, INVALID_DOCUMENT_INFO } = require('../hardhat-config')

describe('TamperProof', function () {
  async function deployTamperProof() {
    const signers = await ethers.getSigners()

    const account1 = await signers[0].getAddress()
    const account2 = await signers[1].getAddress()

    const Contract = await ethers.getContractFactory('TamperProof', signers[0])
    const tamperProofContract = await Contract.deploy()

    await tamperProofContract.deployed()

    contract = tamperProofContract
    contractAddress = tamperProofContract.address

    return { contract, contractAddress, account1, account2 }
  }

  describe('Constructor', function () {
    it('Should add the admin to the contract', async function () {
      const { contract, contractAddress, account1, account2 } =
        await deployTamperProof()

      const owner = await contract.getAdmin()

      expect(owner.toString()).to.equal(account1)
    })

    it('Should increase count to the contract', async function () {
      const { contract, contractAddress, account1, account2 } =
        await deployTamperProof()

      const count = await contract.getCount()

      expect(count.toString()).to.equal('0')
    })
  })

  describe('AddDocument', function () {
    it('Should successfully add a new document', async function () {
      const { contract, contractAddress, account1, account2 } =
        await deployTamperProof()

      await contract.addDocument(
        DOCUMENT_INFO.title,
        DOCUMENT_INFO.author,
        DOCUMENT_INFO.creator,
        DOCUMENT_INFO.producer,
        DOCUMENT_INFO.creationDate,
        DOCUMENT_INFO.docLength
      )

      const count = await contract.getCount()

      expect(count.toString()).to.equal('1')
    })
  })

  describe('ApproveDocument', function () {
    it('Should successfully approve the document', async function () {
      const { contract, contractAddress, account1, account2 } =
        await deployTamperProof()

      await contract.addDocument(
        DOCUMENT_INFO.title,
        DOCUMENT_INFO.author,
        DOCUMENT_INFO.creator,
        DOCUMENT_INFO.producer,
        DOCUMENT_INFO.creationDate,
        DOCUMENT_INFO.docLength
      )

      const document = await contract.getDocument(0)

      const validate = await contract.approveDocument(
        document.id.toString(),
        DOCUMENT_INFO.title,
        DOCUMENT_INFO.author,
        DOCUMENT_INFO.creator,
        DOCUMENT_INFO.producer,
        DOCUMENT_INFO.creationDate,
        DOCUMENT_INFO.docLength
      )

      expect(validate).to.be.true
    })

    it('Should fail to approve the document', async function () {
      const { contract, contractAddress, account1, account2 } =
        await deployTamperProof()

      await contract.addDocument(
        DOCUMENT_INFO.title,
        DOCUMENT_INFO.author,
        DOCUMENT_INFO.creator,
        DOCUMENT_INFO.producer,
        DOCUMENT_INFO.creationDate,
        DOCUMENT_INFO.docLength
      )

      const document = await contract.getDocument(0)

      const validate = await contract.approveDocument(
        document.id.toString(),
        INVALID_DOCUMENT_INFO.title,
        INVALID_DOCUMENT_INFO.author,
        INVALID_DOCUMENT_INFO.creator,
        INVALID_DOCUMENT_INFO.producer,
        INVALID_DOCUMENT_INFO.creationDate,
        INVALID_DOCUMENT_INFO.docLength
      )

      expect(validate).to.be.false
    })
  })
})
