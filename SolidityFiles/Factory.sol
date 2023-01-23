//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './CloneFactory.sol';
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Factory is CloneFactory {
     Child[] public children;
     address parent;

    constructor(address _parent) {
        parent = _parent;
     }

     event ChildCreated(uint date, string message, address childAddress);

     function createChild(string memory message) public {
        Child child = Child(createClone(parent));
        child.initialize(message);
        children.push(child);
        emit ChildCreated(block.timestamp, message, address(child));
     }

     function getChildren() external view returns(Child[] memory){
         return children;
     }
}

contract Child is Initializable {
    string public message = 'Default message';
    uint256 updatedMessageTally = 0;

    event MessageUpdated(string message, uint256 updatedMessageTally);

    function initialize(string memory _message) public initializer {
        message = _message;
    }

    function updateMessage(string memory _message) public {
        message = _message;
        updatedMessageTally++;
        emit MessageUpdated(_message, updatedMessageTally);
    } 
    
  }