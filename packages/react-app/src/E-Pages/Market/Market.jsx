import React, { useState } from 'react'
import './Market.css'

const YOURWALLETADDRESS = "0x49274c39B710d812ef3bE00350CF7fB96424416B"
const embeddedUrl = `https://opensea.io/collection/alphatokens?embed=true&ref=${ YOURWALLETADDRESS }`
export const openSeaURL = `https://opensea.io/collection/alphatokens?ref=${ YOURWALLETADDRESS }`

export default function() {
	const [iframeLoading, setIframeLoading] = useState(true)

	function timeDisplay() {
		setTimeout(() => setIframeLoading(false), 400)
	}
	return (
		<div className="market-container">
			{iframeLoading ? <h1 className="loading-title">...Loading</h1> : null}
			<iframe
				onLoad={timeDisplay}
				id="opensea-iframe"
				className={iframeLoading ? "loading" : "loaded"}
				title="Embedded OpenSea Marketplace"
				src={embeddedUrl}
				width='100%'
				height='100%'
				frameBorder='0'
				allowFullScreen
			></iframe>
		</div>
	)
}