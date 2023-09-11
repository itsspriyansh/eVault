// const hre = require("hardhat");

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const unlockTime = currentTimestampInSeconds + 60;

//   const lockedAmount = hre.ethers.parseEther("0.001");

//   const gov = await hre.ethers.deployContract("Gov", [unlockTime], {
//     value: lockedAmount,
//   });

//   await gov.waitForDeployment();

//   console.log(
//     `Gov with ${ethers.formatEther(
//       lockedAmount
//     )}ETH and unlock timestamp ${unlockTime} deployed to ${gov.target}`
//   );
// }


// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with account:", deployer.address);

  const GovToken = await ethers.getContractFactory("GovToken");
  const token = await GovToken.deploy("MyToken", "MTK");

  console.log("FungibleToken address:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
