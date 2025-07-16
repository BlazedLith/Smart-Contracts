// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.7;

import "./SimpleStorage.sol";

contract StorageExtra is SimpleStorage {
    function store(uint256 _favNum) public override{
        favNumber = _favNum + 5;
    }
}