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

	address[] public lotteryPool;
	uint8 public prizesRemaining = 2;
	address public XWinner;
	address public YWinner;

  constructor(address _proxyRegistryAddress) public ERC721("AlphaTokens", "α") {
    _setBaseURI("https://ipfs.io/ipfs/");
		proxyRegistryAddress = _proxyRegistryAddress;
  }

	//OVERRIDES
	// function safeTransferFrom(address from, address to, uint256 tokenId) public override(ERC721) {
	// 	super.safeTransferFrom(from, to, tokenId);
	// 	if(lottoOpen) {
	// 		if(lotteryPool.length == 23) {
	// 			chooseLottoWinner();
	// 		} else {
	// 			lotteryPool.push(to);
	// 		}
	// 	}
	// }

	function transferFrom(address from, address to, uint256 tokenId) public override(ERC721) {
		super.transferFrom(from, to, tokenId);
		if(prizesRemaining != 0) {
			lotteryPool.push(to);
			if(getUnsold() == 1) {
				chooseLotteryWinner();
			} 
		}
	}

	//Open Sea required functions
	// function isApprovedForAll(address owner, address operator) public view override returns(bool) {
	// 	// Whitelist OpenSea proxy contract for easy trading.
  //       ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
  //       if (address(proxyRegistry.proxies(owner)) == operator) {
  //           return true;
  //       }

  //       return super.isApprovedForAll(owner, operator);
	// }
	// function approve(address to, uint256 tokenId) public virtual override {
  //       address owner = ERC721.ownerOf(tokenId);
  //       require(to != owner, "ERC721: approval to current owner");

  //       require(_msgSender() == owner || isApprovedForAll(owner, _msgSender()),
  //           "ERC721: approve caller is not owner nor approved for all"
  //       );

  //       _approve(to, tokenId);
  //   }

  //   /**
  //    * Override _isApprovedOrOwner as the OZ version does not respect an overriden isApprovedForAll method.
  //    */
  //   function _isApprovedOrOwner(address spender, uint256 tokenId) internal view virtual override returns (bool) {
  //       return isApprovedForAll(ownerOf(tokenId), spender)
  //           || super._isApprovedOrOwner(spender, tokenId);
  //   }

//TODO: do I need this?
		// //for OpenSea minting, use _setTokenURI later to assign metadata
	// function mintTo(address _to) public onlyOwner {
	// 	_tokenIds.increment();
	// 	uint256 id = _tokenIds.current();
	// 	_mint(_to, id);
	// }

	//CUSTOM

	function getUnsold() public returns(uint256) {
		return balanceOf(owner());
	}

	function random() private returns(uint8) {
		return uint8(uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, blockhash(block.number - 1))))%251);
	}

	function chooseLotteryWinner() public {
		require(prizesRemaining != 0, "Lottery closed");
		uint randomIndex = random() % lotteryPool.length;

		if(prizesRemaining == 2) {
			XWinner = lotteryPool[randomIndex];
		_transfer(address(this), lotteryPool[randomIndex], 1);
		} else if (prizesRemaining ==1) {
			YWinner = lotteryPool[randomIndex];	
			_transfer(address(this), lotteryPool[randomIndex], 6);
		}
		prizesRemaining--;
	}

	function getLotteryPool() public view returns (address[] memory) {
		return lotteryPool;
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
	function addToLotteryPool(address to) public {
		lotteryPool.push(to);
	}
}
