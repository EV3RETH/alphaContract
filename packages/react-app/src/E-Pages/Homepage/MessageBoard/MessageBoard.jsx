import React from 'react'
import { JsonRpcProvider } from "@ethersproject/providers";
import './MessageBoard.css'
import { useContractLoader, useContractReader } from '../../../hooks'
import { NETWORKS } from '../../../constants';
import logo from '../../../Images/E.png'
import B from '../../../Images/B-transparent.png'


const targetNetwork = NETWORKS['rinkeby']; // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)
const localProviderUrl = targetNetwork.rpcUrl;
const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : localProviderUrl;
const localProvider = new JsonRpcProvider(localProviderUrlFromEnv);

export default function MessageBoard() {

	const readContracts = useContractLoader(localProvider)
	const winner = useContractReader(readContracts, "AlphaTokens", "lottoWinner")

	return (
		<div className="message-board">
			<div className="message-container">
				<div>
					<img src={B} alt="" />
				</div>

				<div>
					<i>Highlighted NFT set</i>
					<h1>Alpha Tokens</h1>
					<p>
						My genisis set of Non-Fungible Tokens (NFTs).
						While most of my future works will be audio based, owning one of these tokens proves cryptocraphically that you are indisputedly an original supporter of mine.
						For that let me give you my deepest thanks in advance ❤️
					</p>
					<h2>What else makes them special?</h2>
					<p>
						Every single one of these tokens are unique and will never be minted again.
						The tokens will live forever on the Ethereum Mainnet and the image assets themselves are hosted on the disributed web via <a href="https://ipfs.io/" target="_blank">IPFS</a> so unlike most tokens yours will be be truly and completely decentralized.
						Alpha Token's smart contract also extends the ERC721 token contract to include additional perks for Alpha Token holders.
					</p>
					<h2>More perks you say? Tell me more!</h2>
					<p>
						Every time an Alpha Token is traded the new holder's wallet address is stored on chain in the contract's "lottery pool".
						After the 11th trade a function within the contract will automatically send the "Y" token to a random winner chosen from the pool.
						To accomidate memory concerns (which is very expensive on-chain) the pool will be cleared after this.
						After the 22nd trade the "Z" token will be released.
					</p>
					<i>It is the 11th trade and not the 11th token sold, so if the "A" token trades hands 11 times the lottery winner will be chosen. There is however a maximum of 1 entry per wallet address</i>
					<h2>What varieties are there?</h2>
					<p>
						There are three tiers of token: bronze, silver, and gold.
						Bronze and Silver starting bids will be priced accordingly.
						The gold status is considered the most rare and not for sale initially, although they may be sold after they are given away.
						These are reserved as for lottery winnings, social media incentives, and the "E" token which I will be holding onto myself for the forseable future 🤷
						</p>
					<i>
						Note: in addition to OpenSea's 2.5% seller fee, I have implimented a 7.5% royalty sellers fee that will go to me if you were to sell your token.
						So when you make your millions selling these tokens down the line you will still be supporting me. Thank you!
					</i>
				</div>
				<div className="winner">
					<h1>Lottery</h1>
					<button>Click here to see whos in the lottery so far</button>
					<p><i>The winner of the lottery is</i></p>
					<strong>{winner ? winner : "Not been selected yet"}</strong>
				</div>
			</div>
		</div>
	)
}