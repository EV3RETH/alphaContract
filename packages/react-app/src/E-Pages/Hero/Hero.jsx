import React from 'react'
import { Link } from 'react-router-dom'
import './hero.css'
import grid from "../../assets/swirly-grid-haze.png";
import titlePlain from "../../assets/Evereth-plain.png"
import titleHaze from "../../assets/evereth-color-haze.png"
import { PATHS } from '../../App';

export default function Hero({ wavesOn, toggleWaves }) {

	const isFirefox = typeof InstallTrigger !== 'undefined';

	return (
		<div className="hero-container">

			<img src={titlePlain} alt="" className={`title-main${ wavesOn ? " on" : "" }`} onClick={toggleWaves} />
			<img src={titleHaze} alt="" className={`title-haze${ isFirefox ? " firefox" : "" }`} />
			<Link to={PATHS.Market} className="button">
				BUY MY STUFF
			</Link>
			<Link to={PATHS.MessageBoard} className="button small">
				Learn More
			</Link>

			<img src={grid} alt="" className="grid-bg" />
		</div>
	)
}