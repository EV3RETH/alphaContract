import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './hero.css'
import Waves from '../Waves'
import grid from "../../../assets/swirly-grid-haze.png";
import starz from "../../../assets/new-stars.png";
import titlePlain from "../../../assets/Evereth-plain.png"
import titleHaze from "../../../assets/evereth-color-haze.png"

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