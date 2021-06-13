import React, { useState } from 'react'
import { JsonRpcProvider } from "@ethersproject/providers";
import './MessageBoard.css'
import { useContractLoader, useContractReader } from '../../hooks'
import { NETWORKS } from '../../constants';
import A from "../../assets/A-transparent.png"
import B from "../../assets/B-transparent.png"
import X from "../../assets/X-transparent.png"
const E = process.env.PUBLIC_URL + "/Etoken.png"

//CHANGE NETWORK HERE
const targetNetwork = NETWORKS.rinkeby; // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)
// const targetNetwork = NETWORKS.localhost

const localProviderUrl = targetNetwork.rpcUrl;
const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : localProviderUrl;
const localProvider = new JsonRpcProvider(localProviderUrlFromEnv);

const verifiedContract = "https://rinkeby.etherscan.io/address/0x9b85f888BcF0C950d8FaB77Ea80c3C52048557Da#code"

export default function MessageBoard() {
	const [open, setOpen] = useState(false)

	const readContracts = useContractLoader(localProvider)
	const _winner = useContractReader(readContracts, "AlphaTokens", "whoGetsTheX")
	const winner = _winner === "0x0000000000000000000000000000000000000000" ? null : _winner
	const remaining = parseInt(useContractReader(readContracts, "AlphaTokens", "remaining")) - 13 || 10
	const _pool = useContractReader(readContracts, "AlphaTokens", "getAddressPool")
	const pool = _pool?.length ? _pool.map(address => <li>{address}</li>) : <li>You could be the first!</li>

	function togglePool() {
		setOpen(prev => !prev)
	}
	return (
		<div className="message-board">
			<div className="message-container">
				<h1 className="main-header full-row">What's out Now</h1>

				<div className="img-container">
					<img src={A} alt="" />
					<img src={B} alt="" />
					<img src={E} alt="" />
					<img src={X} alt="" />
				</div>

				<div>
					<script src="https://unpkg.com/embeddable-nfts/dist/nft-card.min.js"></script>
					<h1>Alpha Tokens</h1>
					<p>
						My genesis set of Smart Non-Fungible Tokens (Smart NFTs).
						Owning one of these tokens proves cryptographically that you are indisputably an original supporter of mine.
						For that let me give you my deepest thanks in advance.
					</p>
					{/* <h2>What else makes them special?</h2> */}
					<p>
						Every single one of these tokens are unique and will never be minted again.
						The tokens will live forever on the Ethereum Mainnet and the image assets themselves are hosted on the disributed web via <a href="https://ipfs.io/" target="_blank" rel="noopener noreferrer">IPFS</a> so unlike most NFTs yours will be be truly and completely decentralized.
						Alpha Token's smart contract also extends the ERC721 token contract to include additional perks for Alpha Token holders.
					</p>
					{/* <h2>More perks you say? Tell me more!</h2> */}
					<p>
						Every time an Alpha Token is sold or traded the new holder's wallet address is stored on chain in the contract's "address pool".
						After 10 tokens have been sold AlphaToken's smart contract (which can be verified <a href={verifiedContract} target="_blank" rel="noopener noreferrer">here</a>) will automatically choose a winner from this pool and send them the "X" token. After this happens the pool will close.
					</p>
					{/* <h2>What varieties are there?</h2> */}
					<p>
						There are three tiers of AlphaTokens: Bronze, Silver, and Gold.
						Bronze and Silver starting bids will be priced accordingly.
						The Gold status is considered the most rare and not for sale initially, although they may be sold after they are given away.
						The "X" will go to a winner chosen randomly by the contract, "Y" and "Z" will be given away by me randomly as incentives for spreading the word on social media, and I will be holding onto the "E" token myself for the foreseeable future.
					</p>
					<i>
						Note: in addition to OpenSea's 2.5% seller fee, I have implimented a 7.5% royalty sellers fee that will go to me if you were to sell your token.
						So when you make your millions selling these tokens down the line you will still be supporting me. Thank you!
					</i>
				</div>
				<div className="winner full-row">
					<h1>X Token Winner</h1>
					{!winner ? <i>Be one of the first ten AlphaToken buyers and it could be you!</i> : null}
					<button onClick={togglePool}>
						Click here to see the current address pool
					</button>
					<div className={`pool${ open ? " open" : "" }`}>
						<button onClick={togglePool}>X</button>
						<ul className="pool-body">{pool}</ul>
					</div>

					{winner
						? <strong><i>{winner}</i> is the winning address, they get the X. <br />Congratulations!</strong>
						: <p><strong>After <i>~ {remaining} ~</i> more Alpha Tokens are sold the address pool closes forever!</strong>The winner will automatically be sent the X token and their address will be displayed here *</p>
					}
				</div>
				<i className="disclaimer full-row">* if you do not want your public address displayed please contect me and I will remove it from the website.</i>

				<h1 className="main-header full-row">What's up Next</h1>

				<div className="full-row">
					<p>
						The main piece of my next Smart NFT project will be a 1/1 original musical composition plus accompanying generative visuals.
					</p>
					<p>
						Make sure to follow me on Twitter <a href="https://twitter.com/EV3RETH_NFT" target="_blank" rel="noopener noreferrer">@EV3RETH_NFT</a> to stay up to date with all the latest details!
					</p>
				</div>
				<h2 className="full-row">
					NFT in E minor + SUNflower (Teaser)
				</h2>
				<iframe className="full-row video-player" width="1000" height="562" src="https://www.youtube.com/embed/9jQZ6JlLNAk" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
			</div>
		</div>
	)
}