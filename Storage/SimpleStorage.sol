// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SimpleStorage{

    uint256 public favNumber;

    struct Person{
        uint256 favNumber;
        string name;
    }

    mapping(string => uint256) public nameToFavNum;

    Person[] public people;

    function store(uint256 _favNumber) public virtual {
        favNumber = _favNumber;
    }

    function retrieve() public view returns (uint256){
        return favNumber;
    }

    function addPerson (string memory _name, uint256 _favNum) public{
        people.push(Person(_favNum, _name));
        nameToFavNum[_name] = _favNum;
    }
}
