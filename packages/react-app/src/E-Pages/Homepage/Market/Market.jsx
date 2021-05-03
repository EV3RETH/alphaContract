import React from 'react'
import banner from '../../../Images/ALPHATOKENS.png'
import { iframeResizer } from 'iframe-resizer'
import { JsonRpcProvider } from "@ethersproject/providers";
import './Market.css'
import { useContractLoader, useContractReader } from '../../../hooks'
import { NETWORKS } from '../../../constants';


const targetNetwork = NETWORKS['rinkeby']; // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)
const localProviderUrl = targetNetwork.rpcUrl;
const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : localProviderUrl;
const localProvider = new JsonRpcProvider(localProviderUrlFromEnv);

const embeddedUrl = `https://testnets.opensea.io/collection/alphatokens-v2?embed=true`

export default function() {

	const readContracts = useContractLoader(localProvider)
	const winner = useContractReader(readContracts, "AlphaTokens", "lottoWinner")
	return (
		<div className="market-container">
			<div classname="winner">
				<p>The winner of the loto is</p>
				<i>{winner ? winner : "Not been selected yet"}</i>
			</div>
			<iframe id="opensea-iframe" title="Embedded OpenSea Marketplace" src={embeddedUrl} width='100%' height='100%' frameBorder='0' allowFullScreen></iframe>
		</div>
	)
}