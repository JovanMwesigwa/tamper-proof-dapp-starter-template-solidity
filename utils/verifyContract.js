const { run } = require('hardhat')

const verifyContract = async () => {
  console.log('Verifying contract...')
  try {
    await run('verify:verify', {})

    console.log('Contract verified!')
  } catch (err) {
    console.log(err)
  }
}

module.exports = { verifyContract }
