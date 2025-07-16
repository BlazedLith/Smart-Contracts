// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.7;

import "./SimpleStorage.sol";

contract StorageFactory {
    
    SimpleStorage[] public SSArray;
    
    function createSimpleStorageContract() public {
        SimpleStorage SS = new SimpleStorage();
        SSArray.push(SS);
    }
    
    function sfStore(uint256 SSIndex, uint256 SSNumber) public {
        SSArray[SSIndex].store(SSNumber);
    }
    
    function sfGet(uint256 _simpleStorageIndex) public view returns (uint256) {
        return SSArray[_simpleStorageIndex].retrieve();
    }
}