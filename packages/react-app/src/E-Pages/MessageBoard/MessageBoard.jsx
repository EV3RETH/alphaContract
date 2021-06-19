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
const targetNetwork = NETWORKS.mainnet; // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)

const localProviderUrl = targetNetwork.rpcUrl;
const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : localProviderUrl;
const localProvider = new JsonRpcProvider(localProviderUrlFromEnv);

const verifiedContract = "https://etherscan.io/address/0x573ff139392d92858581549317664e5322647769#code"

export default function MessageBoard() {
	const [open, setOpen] = useState(false)

	const readContracts = useContractLoader(localProvider)
	const _winner = useContractReader(readContracts, "AlphaTokens", "XWinner")
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
					<h1>Alpha Tokens</h1>
					<p>
						EV3RETH's genesis set of Smart NFTs (Non-Fungible Tokens).
						Owning these 1/1 collectable tokens proves cryptographically you are an original supporter of my work.
						For that you have my deepest thanks in advance.
					</p>
					<p>
						The tokens will live forever on the Ethereum Mainnet and the image assets themselves are hosted on the distributed web via <a href="https://ipfs.io/" target="_blank" rel="noopener noreferrer">IPFS</a> so unlike many NFTs your Alpha Token will be truly and completely decentralized.
						Alpha Token's smart contract extends the ERC721 token contract to include additional perks for Alpha Token collectors.
					</p>
					<p>
						If you are among the first 10 collectors your address will be automatically added to the AlphaToken Smart Contract's address pool in the blockchain.
						After the tenth token is sold one lucky hodler will be chosen at random by the contract and automatically gifted the coveted golden "X" token.
						This contract behavior can be verified on <a href={verifiedContract} target="_blank" rel="noopener noreferrer">Etherscan</a>
					</p>
					<p>
						AlphaTokens are divided between common Bronze, uncommon Silver and rare Gold.
						Each token was also assigned a random "Hype" level upon minting.
						The hype range for Bronze tokens is 50-79, Silver is 80-96, and Gold is 97-100.
						The Gold tokens will not be for sale initially, although they may be sold after being given away.
					</p>
					<i>
						I have implemented a 7.5% royalty so even if you decide to sell your token down the line you will still be supporting me and my future projects.
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
				<i className="disclaimer full-row">* if you do not want your public address displayed please contact me and I will remove it from the website.</i>

				<h1 className="main-header full-row">What's up Next</h1>

				<div className="full-row">
					<p>
						The main piece of my next Smart NFT project will be a 1/1 original musical composition integrated with generative visuals.
						In addition there will be altered versions with print purchase and burn return prices calculated via bonding curve.
						The owner of the original 1/1 piece will receive royalties from these prints.
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