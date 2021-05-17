import React from 'react'
import './Market.css'

const embeddedUrl = `https://testnets.opensea.io/collection/alphatokens-v2?embed=true`

export default function() {

	return (
		<div className="market-container">
			<i>
				~ You can buy Alpha Tokens using this imbeded Open Sea storefront or shop directly on their website <a href="https://testnets.opensea.io/collection/alphatokens-v2" target="_blank">here</a> ~
			</i>
			<iframe id="opensea-iframe" title="Embedded OpenSea Marketplace" src={embeddedUrl} width='100%' height='100%' frameBorder='0' allowFullScreen></iframe>
		</div>
	)
}