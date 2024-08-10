// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {SuperERC20Permit} from "./SuperPermit.sol";

contract TokenGenerator2 {
    event TokenDeployed(address indexed owner, address token, string kind);

    /// @notice Generates a Super Permit ERC20 token.
    /// @param _name The name of the token.
    /// @param _symbol The symbol of the token.
    /// @param _premint The initial supply of the token.
    /// @param _mintable Checks the mintability of the token.
    /// @param _burnable Checks the burnability of the token.
    /// @param _pausable Checks the pausablility of the token.
    /// @param _salt A unique salt for creating the token.
    /// @return Address of generated token and its name and symbol.
    function generateSuperERC20Permit(
        string memory _name,
        string memory _symbol,
        uint256 _premint,
        bool _mintable,
        bool _burnable,
        bool _pausable,
        bytes32 _salt
    )
        external
        returns (
            address,
            string memory,
            string memory
        )
    {
        SuperERC20Permit generatedToken = (new SuperERC20Permit){salt: _salt}(
            _name,
            _symbol,
            _premint,
            msg.sender,
            _mintable,
            _burnable,
            _pausable
        );
        emit TokenDeployed(
            msg.sender,
            address(generatedToken),
            "SuperPermitERC20"
        );
        return (address(generatedToken), _name, _symbol);
    }
}
