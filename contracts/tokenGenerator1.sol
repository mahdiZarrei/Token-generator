// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {DefaultERC20} from "./StandardToken.sol";
import {SuperERC20Capped} from "./SuperCapped.sol";

/// @title Token Generator Contract
/// @notice This contract allows the creation of different types of ERC20 tokens.
contract TokenGenerator {
    event TokenDeployed(address indexed owner, address token, string kind);

    /// @notice Generates a standard ERC20 token.
    /// @param _name The name of the token.
    /// @param _symbol The symbol of the token.
    /// @param _premint The initial supply of the token.
    /// @param _salt A unique salt for creating the token.
    /// @return Address of generated token and its name and symbol.
    function generateStandardERC20(
        string memory _name,
        string memory _symbol,
        uint256 _premint,
        bytes32 _salt
    ) external returns (address, string memory, string memory) {
        DefaultERC20 generatedToken = (new DefaultERC20){salt: _salt}(
            _name,
            _symbol,
            _premint,
            msg.sender
        );
        emit TokenDeployed(
            msg.sender,
            address(generatedToken),
            "StandardERC20"
        );
        return (address(generatedToken), _name, _symbol);
    }

    /// @notice Generates a Super Capped ERC20 token.
    /// @param _name The name of the token.
    /// @param _symbol The symbol of the token.
    /// @param _premint The initial supply of the token.
    /// @param _mintable Checks the mintability of the token.
    /// @param _burnable Checks the burnability of the token.
    /// @param _pausable Checks the pausablility of the token.
    /// @param _cap Specifies the token supply cap.
    /// @param _salt A unique salt for creating the token.
    /// @return Address of generated token and its name and symbol.
    function generateSuperERC20Capped(
        string memory _name,
        string memory _symbol,
        uint256 _premint,
        bool _mintable,
        bool _burnable,
        bool _pausable,
        uint256 _cap,
        bytes32 _salt
    ) external returns (address, string memory, string memory) {
        SuperERC20Capped generatedToken = (new SuperERC20Capped){salt: _salt}(
            _name,
            _symbol,
            _premint,
            msg.sender,
            _mintable,
            _burnable,
            _pausable,
            _cap
        );
        emit TokenDeployed(
            msg.sender,
            address(generatedToken),
            "SuperCappedERC20"
        );
        return (address(generatedToken), _name, _symbol);
    }
}
