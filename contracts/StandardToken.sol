// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";


/// @title DefaultERC20 Contract
/// @notice This contract represents a default ERC20 token.
contract DefaultERC20 is ERC20 {
    constructor (
        string memory _name,
        string memory _symbol,
        uint256 _premint,
        address _initialOwner
    )payable ERC20(_name, _symbol) {
        _mint(_initialOwner, _premint * 10**decimals());
    }
}

