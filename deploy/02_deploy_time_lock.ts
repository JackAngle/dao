import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { MIN_DELAY } from "../hardhat_helper_config";

const deployTimeLock: DeployFunction = async function  (hre: HardhatRuntimeEnvironment){
    // @ts-ignore
    const { getNamedAccounts, deployments, network } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    log("Deploying TimeLock...");

    const timeLock = await deploy("TimeLock",{
        from: deployer,
        args: [MIN_DELAY, [], []],
        log: true,
    })
}

export default deployTimeLock;