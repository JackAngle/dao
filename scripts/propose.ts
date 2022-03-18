// @ts-ignore
import { ethers, network } from "hardhat"
import  moveBlock  from "../utils/move_block";
import {
    PROPOSAL_DESCRIPTION,
    DEVELOPMENT_CHAINS,
    VOTING_DELAY,
    NEW_STORE_VALUE,
    FUNC,
    PROPOSAL_FILE
} from "../hardhat_helper_config";
import * as fs from "fs";

export async function propose(args: any[], functionToCall: string, proposalDescription: string){
    const governor = await ethers.getContract("GovernorContract");
    const box = await ethers.getContract("Box");

    const boxEncodedFunctionCall = await box.interface.encodeFunctionData(
        functionToCall,
        args
    )

    console.log(`Proposing ${functionToCall} at addresss ${box.address} with ${args}`);
    console.log(`Proposal description: \n ${proposalDescription} \n`);
    const proposeTx = await governor.propose(
        [box.address],
        [0],
        [boxEncodedFunctionCall],
        proposalDescription,
    );
    console.log(`Encoded Function Call: ${boxEncodedFunctionCall}`);
    const proposeReceipt = await proposeTx.wait(1);

    if (DEVELOPMENT_CHAINS.includes(network.name)){
        await moveBlock(VOTING_DELAY + 1);
    }

    const proposalId = proposeReceipt.events[0].args.proposalId;
    let proposals = JSON.parse(fs.readFileSync(PROPOSAL_FILE, "utf8"));
    proposals[network.config.chainId!.toString()].push(proposalId.toString());
    fs.writeFileSync(PROPOSAL_FILE, JSON.stringify(proposals));
    console.log(`Proposed proposal ID: ${proposalId}`)
}

propose([NEW_STORE_VALUE], FUNC, PROPOSAL_DESCRIPTION)
.then(
    () => {
        console.log("propose: COMPLETED");
        process.exit(0)
    }
).catch(
    (error) => {
        console.log(`propose: ${error}`);
        process.exit(1);
    }
)