import { PROPOSAL_FILE, DEVELOPMENT_CHAINS, VOTING_PERIOD  } from "../hardhat_helper_config";
import * as fs from "fs";
// @ts-ignore
import { network, ethers } from "hardhat";
import moveBlock from "../utils/move_block";

let index = 0;

async function vote(proposalIndex: number) {
    const proposals = JSON.parse(fs.readFileSync(PROPOSAL_FILE, "utf8"));
    const proposalId = proposals[network.config.chainId!][proposalIndex];
    console.log(`proposalId: ${proposalId}`);
    // 0 = Against, 1 = For, 2 = Abstain for this example
    const decision = 1;
    const governor = await ethers.getContract("GovernorContract");
    const reason = "I want to thank Pattrick Collins";
    const voteTxResponse = await governor.castVoteWithReason(
        proposalId,
        decision,
        reason
    )
    await voteTxResponse.wait(1);

    if (DEVELOPMENT_CHAINS.includes(network.name)) {
        await moveBlock(VOTING_PERIOD + 1);
    }

    console.log("Ready to go!");
}

vote(index).then(
        () => {
            console.log(`vote: ${index} COMPLETED`);
            process.exit(0)
        }
    ).catch(
        (error) => {
            console.log(`vote: ${error}`);
            process.exit(1);
        }
)