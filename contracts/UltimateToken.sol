// SPDX-License-Identifier: MIT 
pragma solidity 0.8.24; 

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol"; 
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol"; 
import {ERC20Pausable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol"; 
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol"; 
import {ERC20Capped} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract UltimateToken is ERC20, ERC20Burnable, ERC20Pausable, Ownable,ERC20Capped,ERC20Permit { 
    bool public mintable; 
    bool public burnable; 
    bool public pausable; 
 
    error notMintable();
    error notBurnable();
    error notPausable();
    error isMintableNow();
    error isBurnableNow();
    error isPausableNow();
 
    modifier isMintable() { 
        if (!mintable) { 
            revert notMintable(); 
        } 
        _; 
    } 
 
    modifier isBurnable() { 
        if (!burnable) { 
            revert notBurnable(); 
        } 
        _; 
    } 
 
    modifier isPausable() { 
        if (!pausable) { 
            revert notPausable(); 
        } 
        _; 
    } 
 
    constructor( 
        string memory _name, 
        string memory _symbol, 
        uint256 _premint, 
        address _initialOwner, 
        bool _mintable, 
        bool _burnable, 
        bool _pausable,
        uint256 _cap
    ) payable ERC20(_name, _symbol) Ownable(_initialOwner) ERC20Capped(_cap) ERC20Permit(_name) { 
        mintable = _mintable; 
        burnable = _burnable; 
        pausable = _pausable; 
        _mint(_initialOwner, _premint * 10**decimals()); 
    } 


    function setMintable() external onlyOwner {
        if(mintable){
            revert isMintableNow();
        }        
        mintable = true;
    }

    function setUnmintable() external onlyOwner {
        if(!mintable){
            revert notMintable();
        }
        mintable = false;
    }

    function setBurnable() external onlyOwner {
        if(burnable){
            revert isBurnableNow();
        }        
        burnable = true;
    }

    function setUnburnable() external onlyOwner {
        if(!burnable){
            revert notBurnable();
        }
        burnable = false;
    }

    function setPausable() external onlyOwner {
        if(pausable){
            revert isPausableNow();
        }
        pausable = true;
    }

    function setUnpausable() external onlyOwner {
        if(!pausable){
            revert notPausable();
        }        
        pausable = false;
    }
 
    /// @notice Pauses all token transfers. 
    function pause() external onlyOwner isPausable { 
        _pause(); 
    } 
 
    /// @notice Unpauses token transfers. 
    function unpause() external onlyOwner isPausable { 
        _unpause(); 
    } 
 
    /// @notice Mints additional tokens and assigns them to the specified address. 
    /// @param to The address to receive the minted tokens. 
    /// @param amount The amount of tokens to mint. 
    function mint(address to, uint256 amount) external onlyOwner isMintable { 
        _mint(to, amount); 
    } 
 
    function burn(uint256 value) public override isBurnable { 
        _burn(_msgSender(), value); 
    } 
 
    function burnFrom(address account, uint256 value) 
        public 
        override 
        isBurnable 
    { 
        _spendAllowance(account, _msgSender(), value); 
        _burn(account, value); 
    } 
 
    /// @dev Overrides the internal _update function to include pausable behavior. 
    function _update( 
        address from, 
        address to, 
        uint256 value 
    ) internal override(ERC20, ERC20Pausable,ERC20Capped) { 
        super._update(from, to, value); 
    } 
}
