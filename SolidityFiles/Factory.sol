// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./CloneFactory.sol";

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
        emit MessageUpdated(message, updatedMessageTally);
    }
}

contract Factory is CloneFactory {

    Child[] private children;
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
