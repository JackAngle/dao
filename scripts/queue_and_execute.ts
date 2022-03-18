import { DEVELOPMENT_CHAINS, VOTING_PERIOD, MIN_DELAY, NEW_STORE_VALUE, FUNC, PROPOSAL_DESCRIPTION, ADDRESS_ZERO  } from "../hardhat_helper_config";
import * as fs from "fs";
// @ts-ignore
import { network, ethers } from "hardhat";
import moveBlock from "../utils/move_block";
import forwardTime from "../utils/forward_time";


async function queueAndExecute() {
    const args = [NEW_STORE_VALUE]
    const box = await ethers.getContract("Box");
    const boxEncodedFunctionCall = box.interface.encodeFunctionData(FUNC, args);
    const proposal_description_utf8_bytes = ethers.utils.toUtf8Bytes(PROPOSAL_DESCRIPTION);
    console.log(`Proposal Description utf8 bytes: ${proposal_description_utf8_bytes}`);
    const descriptionHash = ethers.utils.keccak256(
        proposal_description_utf8_bytes
        // PROPOSAL_DESCRIPTION
    );
    console.log(`Encoded Function Call: ${boxEncodedFunctionCall}`);
    const governor = await ethers.getContract("GovernorContract");
    console.log("Queueing...");
    const queueTx = await governor.queue(
        [box.address],
        [0],
        [boxEncodedFunctionCall],
        descriptionHash
    )
    await queueTx.wait(1);

    if (DEVELOPMENT_CHAINS.includes(network.name)) {
        await forwardTime(MIN_DELAY);
        await moveBlock(1);
    }

    console.log("Executing...");

    const executeTx = await governor.execute(
        [box.address],
        [0],
        [boxEncodedFunctionCall],
        descriptionHash
    )

    await executeTx.wait(1);
    console.log("Done Executing!!!");

    const newBoxValue = await box.retrieve();
    console.log(`New box value: ${newBoxValue.toString()}`);
}

queueAndExecute().then(
        () => {
            console.log("queueAndExecute: COMPLETED");
            process.exit(0)
        }
    ).catch(
        (error) => {
            console.log(`queueAndExecute: ${error}`);
            process.exit(1);
        }
)