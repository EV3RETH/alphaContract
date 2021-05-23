import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './hero.css'
import Waves from '../Waves'
const grid = "https://gateway.pinata.cloud/ipfs/QmSud48CL14Mk5XgTSRQS2YKTTsqcpc83kjzwRCxJ3gpA7/swirly-grid-haze.png";
const starz = "https://gateway.pinata.cloud/ipfs/QmSud48CL14Mk5XgTSRQS2YKTTsqcpc83kjzwRCxJ3gpA7/new-stars.png"
const titlePlain = "https://gateway.pinata.cloud/ipfs/QmSud48CL14Mk5XgTSRQS2YKTTsqcpc83kjzwRCxJ3gpA7/Evereth-plain.png"
const titleHaze = "https://gateway.pinata.cloud/ipfs/QmSud48CL14Mk5XgTSRQS2YKTTsqcpc83kjzwRCxJ3gpA7/evereth%20color%20haze.png"

export default function Hero() {
	const [wavesOn, setWavesOn] = useState(false)
	const [marketId, setMarketId] = useState()

	useEffect(() => {
		if (marketId) return
		const _marketId = document.getElementById("opensea-iframe")
		setMarketId(_marketId)
	}, [])

	function handleClick() {
		if (marketId) marketId.scrollIntoView()
	}

	return (
		<div className="hero-container">

			<img src={titlePlain} alt="" className={`title-main${ wavesOn ? " on" : "" }`} onClick={() => setWavesOn(prev => !prev)} />
			<img src={titleHaze} alt="" className="title-haze" />
			<button className="button" onClick={handleClick}>BUY MY STUFF</button>

			<img src={grid} alt="" className="grid-bg" />
			{wavesOn ? <Waves color="rgba(0, 0, 0, 0)" /> : null}
			<img src={starz} alt="" className="starz" />
		</div>
	)
}