pragma solidity >=0.6.0 <0.7.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// GET LISTED ON OPENSEA: https://testnets.opensea.io/get-listed/step-two

contract OwnableDelegateProxy {}

contract ProxyRegistry {
    mapping(address => OwnableDelegateProxy) public proxies;
}

contract AlphaTokens is ERC721, Ownable {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
	address proxyRegistryAddress;

	address[] public addressPool;
	address public whoGetsTheX = address(0);
	uint public remaining = 23;


  constructor(address _proxyRegistryAddress) public ERC721("AlphaTokens", "α") {
    _setBaseURI("https://ipfs.io/ipfs/");
		proxyRegistryAddress = _proxyRegistryAddress;
  }

	//OVERRIDES
	// function safeTransferFrom(address from, address to, uint256 tokenId) public override(ERC721) {
	// 	super.safeTransferFrom(from, to, tokenId);
	// 	if(lottoOpen) {
	// 		if(addressPool.length == 23) {
	// 			chooseLottoWinner();
	// 		} else {
	// 			addressPool.push(to);
	// 		}
	// 	}
	// }

	function transferFrom(address from, address to, uint256 tokenId) public override(ERC721) {
		super.transferFrom(from, to, tokenId);
		if(whoGetsTheX == address(0)) {
			addressPool.push(to);
			remaining = getUnsold();
			if(remaining == 13) { 
				chooseLotteryWinner();
			} 
		}
	}

	function getUnsold() public returns(uint) {
		uint unsold = balanceOf(owner());
		if(ownerOf(25) == owner()) unsold--;
		if(ownerOf(26) == owner()) unsold--;
		return unsold;
	}

	function random() private returns(uint8) {
		return uint8(uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, blockhash(block.number - 1))))%251);
	}

	function chooseLotteryWinner() public {
		require(whoGetsTheX == address(0), "The X is not here anymore");
		uint randomIndex = random() % addressPool.length;
		_transfer(address(this), addressPool[randomIndex], 24);
		whoGetsTheX = addressPool[randomIndex];
	}

	function getAddressPool() public view returns (address[] memory) {
		return addressPool;
	}
	
	function mintItem(address to, string memory tokenURI)
      public
      onlyOwner
      returns (uint256)
  {
      _tokenIds.increment();

      uint256 id = _tokenIds.current();
      _mint(to, id);
      _setTokenURI(id, tokenURI);

      return id;
  }


	//TODO: DEV ONLY. !!!!!!DELETE THIS BEFORE MAINNET!!!!!
	function addToAddressPool(address to) public onlyOwner {
		addressPool.push(to);
	}

	function resetLottery(address from) public onlyOwner {
		_transfer(from, address(this), 24);
		delete whoGetsTheX;
	}

	// //Open Sea required functions
	function isApprovedForAll(address owner, address operator) public view override returns(bool) {
		// Whitelist OpenSea proxy contract for easy trading.
        ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        if (address(proxyRegistry.proxies(owner)) == operator) {
            return true;
        }

        return super.isApprovedForAll(owner, operator);
	}
	function approve(address to, uint256 tokenId) public virtual override {
        address owner = ERC721.ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");

        require(_msgSender() == owner || isApprovedForAll(owner, _msgSender()),
            "ERC721: approve caller is not owner nor approved for all"
        );

        _approve(to, tokenId);
    }

	/**
		* Override _isApprovedOrOwner as the OZ version does not respect an overriden isApprovedForAll method.
		*/
	function _isApprovedOrOwner(address spender, uint256 tokenId) internal view virtual override returns (bool) {
			return isApprovedForAll(ownerOf(tokenId), spender)
					|| super._isApprovedOrOwner(spender, tokenId);
	}

//TODO: do I need this?
		// //for OpenSea minting, use _setTokenURI later to assign metadata
	// function mintTo(address _to) public onlyOwner {
	// 	_tokenIds.increment();
	// 	uint256 id = _tokenIds.current();
	// 	_mint(_to, id);
	// }
}
