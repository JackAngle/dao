import {network} from "hardhat";

export default async function forwardTime (timeAmount: number){
    // Forward 3600 seconds to the future
    console.log(`Forward ${timeAmount} second(s) to the future...`);
    await network.provider.send("evm_increaseTime", [timeAmount]);
    console.log("Done!");
}