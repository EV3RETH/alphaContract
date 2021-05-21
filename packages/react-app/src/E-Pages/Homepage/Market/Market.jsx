import React from 'react'
import './Market.css'

const YOURWALLETADDRESS = "0x49274c39B710d812ef3bE00350CF7fB96424416B"
const embeddedUrl = `https://testnets.opensea.io/collection/alphatokens-v3-2?embed=true&ref=${ YOURWALLETADDRESS }`
const fullUrl = `https://testnets.opensea.io/collection/alphatokens-v3-2?ref=${ YOURWALLETADDRESS }`

export default function() {

	return (
		<div className="market-container">
			<i>
				~ You can buy Alpha Tokens using this imbeded Open Sea storefront or shop directly on their website <a href={fullUrl} target="_blank">here</a> ~
			</i>
			<iframe id="opensea-iframe" title="Embedded OpenSea Marketplace" src={embeddedUrl} width='100%' height='100%' frameBorder='0' allowFullScreen></iframe>
		</div>
	)
}