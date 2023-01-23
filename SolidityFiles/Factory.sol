// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./CloneFactory.sol";


// Child, please remember a message upon initializing X
// Child, please remember any message updates
// Child, please go ahead and keep a tally of how many times you've updated the message
// Child, please be indexable!



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

contract Factory is CloneFactory {

// Factory, please keep an array of all children you've ever made
// Factory, can get get that array of those children
// Factory, can you import the address of the implementation contract you'd like to clone
// Factory, can you clone a child, can you emit an event when you've created a child?

    Child[] public children;
    address implementation;

    event ChildCreated(uint date, string, address childAddress);

    constructor(address _implementation) {
        implementation = _implementation;
    }

    function getChildren() external view returns(Child[] memory) {
        return children;
    } 

    function createChild(string memory message) public {
        Child child = Child(createClone(implementation));
        child.initialize(message);
        children.push(child);
        emit ChildCreated(block.timestamp, message, address(child));
    }
}