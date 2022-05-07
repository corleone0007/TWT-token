// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TWToken is ERC20Capped, Ownable {
 constructor(uint256 cap) ERC20("TWToken", "TWT") ERC20Capped(cap){
     ERC20._mint(msg.sender, 10000*10**18); //10,000 eth
 }

 function issueAirDrop(address payable[] memory _addresses) public onlyOwner {
     for(uint i = 0; i < _addresses.length; i++){
         _mint(_addresses[i], 90000*10**18); //90,000 eth
     }
 }
}