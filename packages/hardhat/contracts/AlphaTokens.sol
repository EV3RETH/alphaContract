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
	bool public lottoOpen = true;
	address public lottoWinner;

  constructor(address _proxyRegistryAddress) public ERC721("AlphaTokens", "α") {
    _setBaseURI("https://ipfs.io/ipfs/");
		proxyRegistryAddress = _proxyRegistryAddress;
  }

	//OVERRIDES
	function safeTransferFrom(address from, address to, uint256 tokenId) public override(ERC721) {
		super.safeTransferFrom(from, to, tokenId);
		if(lottoOpen) {
			if(lotteryPool.length == 23) {
				chooseLottoWinner();
			} else {
				lotteryPool.push(to);
			}
		}
	}

	function transferFrom(address from, address to, uint256 tokenId) public override(ERC721) {
		super.transferFrom(from, to, tokenId);
		if(lottoOpen) {
			if(lotteryPool.length % 3 == 2) {
				chooseLottoWinner();
			} else {
				lotteryPool.push(to);
			}
		}
	}
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

	//CUSTOM

	function random() private returns(uint8) {
		return uint8(uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, blockhash(block.number - 1))))%251);
	}

	function chooseLottoWinner() public {
		require(lottoOpen, "Lottery closed");
		lottoOpen = false;
		uint randomIndex = random() % lotteryPool.length;
		_transfer(address(this), lotteryPool[randomIndex], 1);
		lottoWinner = lotteryPool[randomIndex];
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

	//for OpenSea minting, use _setTokenURI later to assign metadata
	function mintTo(address _to) public onlyOwner {
		_tokenIds.increment();
		uint256 id = _tokenIds.current();
		_mint(_to, id);
	}

	//DEV ONLY. !!!!!!DELETE THIS BEFORE MAINNET!!!!!
	function addToLotteryPool(address to) public {
		lotteryPool.push(to);
	}

	function resetLotto(address from) public {
		_transfer(from, address(this)	, 1);
		delete lottoWinner;
		lottoOpen = true;
	}

		function getLotteryPool() public view returns (address[] memory) {
		return lotteryPool;
	}
}
