const { ethers, network } = require('hardhat')
const { verifyContract } = require('../utils/verifyContract')

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts()

  const chainId = network.config.chainId

  const { deploy, log } = deployments

  const args = []
  const waitConfirmations = 1

  // Only verify the contract when we are deploying on celo test net
  const tx = await deploy('TamperProof', {
    from: deployer,
    args: args,
    waitConfirmations: waitConfirmations,
    log: true,
  })
  log('TamperProof contract deployed --------------')

  if (chainId != 31337) {
    log('Verifying the contract on celoscan...')
    await verifyContract()
  }
}

module.exports.tags = ['all', 'deploy']
