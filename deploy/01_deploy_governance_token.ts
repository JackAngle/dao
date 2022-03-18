import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
// @ts-ignore
import { ethers } from "hardhat"

const deployGovernanceToken: DeployFunction = async function  (hre: HardhatRuntimeEnvironment){
    // @ts-ignore
    const { getNamedAccounts, deployments, network } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts(); 
    console.log("Deploying Governance Token");
    const governanceToken = await deploy('GovernanceToken', {
        from: deployer,
        args: [],
        log: true,
        // waitConfirmations
    });
    log(`Deployed Governance Token to address ${governanceToken.address} `);
    log(`Delegating to ${deployer}`)
    await delegate(governanceToken.address, deployer)
    log("Delegated!")
}
const delegate = async (governanceTokenAddress: string, delegatedAccount: string) => {
    // Get contract GovernanceToken at governanceTokenAddress
    const governanceToken = await ethers.getContractAt("GovernanceToken", governanceTokenAddress);
    // Call GovernanceToken(ERC20Votes)'s delegate() method
    const tx = await governanceToken.delegate(delegatedAccount);
    await tx.wait(1);
    // Call GovernanceToken(ERC20Votes)'s numCheckpoints() method
    console.log(`Checkpoints: ${await governanceToken.numCheckpoints(delegatedAccount)}`);
  }

export default deployGovernanceToken;