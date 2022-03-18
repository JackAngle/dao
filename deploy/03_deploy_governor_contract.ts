import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { VOTING_PERIOD, VOTING_DELAY, QUORUM_PERCENTAGES } from "../hardhat_helper_config";

const deployGovernorContract: DeployFunction = async function  (hre: HardhatRuntimeEnvironment){
    // @ts-ignore
    const { getNamedAccounts, deployments, network } = hre;
    const { deploy, log, get } = deployments;
    const { deployer } = await getNamedAccounts();

    const governanceToken = await get("GovernanceToken");
    const timeLock = await get("TimeLock");

    log("Deploying Governor Contract...");

    const governorContract = await deploy("GovernorContract",{
        from: deployer,
        args: [
            governanceToken.address,
            timeLock.address,
            VOTING_DELAY,
            VOTING_PERIOD,
            QUORUM_PERCENTAGES
        ],
        log: true
    })
}

export default deployGovernorContract;