# On-chain Decentralized Autonomous Organization (DAO)


<div id="top"></div>

- [About](#about)
    - [What is it?](#what-is-it)
    - [Credits](#credit)
    - [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Requirements](#requirements)
    - [Attention](#attention)
    - [Installation](#installation)
  - [Usage](#usage)
    


<!-- ABOUT THE PROJECT -->
## About

### What is it

This repo is source code for 100% On-Chain Governance DAO. It used many OpenZeppelin's smart contract implementations & libraries. The on-chain governance is really gas-costing so consider carefully when choosing this approach.


### Credit

This project is done thanks to the tutorial of Patrick Collins. You can find his info here:
- [Tutorial Video](https://www.youtube.com/watch?v=AhJtmUqhAqg)
- [Patrick Collins's Github](https://github.com/PatrickAlphaC)
It is my recommend to follow him so you will learn a lot of thing in Blockchain.



### Architecture
- Box.sol: Smart contract that will be executed after dao voted to execute.
- GovernanceToken.sol: Smart contract for voting token.
- GovernorContract.sol: Smart contract that implements DAO governance mechanism.
- Timelock.sol: Smart contract that delay execution of every voted proposal ==> user has time to "bail out" if needed



<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
# Getting Started 

It's recommended that you've gone through the [hardhat getting started documentation](https://hardhat.org/getting-started/) before proceeding here. 

## ATTENTION
This source code is developed to use in local testing environment. IF you want to use it in production, refer to Patrick Collins's [source code](https://github.com/PatrickAlphaC/dao-template) where you can have more detailed instructions & production-ready deploy codes (Yeah! Smart contracts are fine to use in production though!).

## Requirements

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  
- [Nodejs](https://nodejs.org/en/)
  
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) instead of `npm`


## Installation
```
yarn 
```


<!-- USAGE EXAMPLES -->
## Usage
### On-Chain Governance Example (This one re-uses Patrick's explaination)

Here is the rundown of what the test suite does. 

1. We will deploy an ERC20 token that we will use to govern our DAO.
2. We will deploy a Timelock contract that we will use to give a buffer between executing proposals.
   1. Note: **The timelock is the contract that will handle all the money, ownerships, etc**
3. We will deploy our Governence contract 
   1. Note: **The Governance contract is in charge of proposals and such, but the Timelock executes!**
4. We will deploy a simple Box contract, which will be owned by our governance process! (aka, our timelock contract).
5. We will propose a new value to be added to our Box contract.
6. We will then vote on that proposal.
7. We will then queue the proposal to be executed.
8. Then, we will execute it!


Additionally, you can do it all manually on your own local network like so:

1. Setup local blockchain 
```
yarn hardhat node
```

2. Propose a new value to be added to our Box contract

In a second terminal (leave your blockchain running)
```
yarn hardhat run scripts/propose.ts --network localhost
```

3. Vote on that proposal

```
yarn hardhat run scripts/vote.ts --network localhost
```

4. Queue & Execute proposal!

```
yarn hardhat run scripts/queue-and-execute.ts --network localhost
```


You can also use the [Openzeppelin contract wizard](https://wizard.openzeppelin.com/#governor) to get other contracts to work with variations of this governance contract. 


<p align="right">(<a href="#top">back to top</a>)</p>







