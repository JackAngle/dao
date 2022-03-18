import {network} from "hardhat";

export default async function moveBlock(blockAmount: number){
    console.log(`Moving forward ${blockAmount} block(s)...`);

    for (let i = 0; i < blockAmount; i++){
        await network.provider.request({
            method: "evm_mine",
            params: []
        })
    }
}