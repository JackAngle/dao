import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
// @ts-ignore
import { ethers } from "hardhat"


const deployBox: DeployFunction = async function  (hre: HardhatRuntimeEnvironment){
    // @ts-ignore
    const { getNamedAccounts, deployments, network } = hre;
    const { deploy, log, get } = deployments;
    const { deployer } = await getNamedAccounts();

    log("Deploying Box...");

    const boxDeployment = await deploy("Box",{
        from: deployer,
        args: [],
        log: true
    })

    const timeLock = await ethers.getContract("TimeLock");

    // @dev It seems these 2 commands is interchangable in this case
    // const box = await ethers.getContractAt("Box", boxDeployment.address);
    const box = await ethers.getContract("Box");
    
    const transferOwnerTx = await box.transferOwnership(timeLock.address);
    await transferOwnerTx.wait(1);

    log(`Box contract at ${box.address} has transfered ownership to ${await box.owner() } `);
}

export default deployBox;