// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/governance/TimelockController.sol";

// @dev Timelock delay execution of governance command
// so user will have time to "get out" if they "don't like" this command
contract TimeLock is TimelockController {
    // @param _minDelay is how long you have to wait before executing
    // @param _proposers is the list of addresses that can propose
    // @param _executors is the list of addresses that can execute
    constructor(
        uint256 _minDelay,
        address[] memory _proposers,
        address[] memory _executors
    ) TimelockController(_minDelay, _proposers, _executors) {}
}