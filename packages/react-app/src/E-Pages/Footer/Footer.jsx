import React from 'react'
import twitter from '../../assets/twitter_icon_64px.png'
import { openSeaURL } from '../Market/Market'
import './footer.css'

export default function Footer() {
	return (
		<footer>
			<p>&#169; {new Date().getFullYear()} EV3RETH</p>
			<a href={openSeaURL} target="_blank" rel="noopener noreferrer">Shop on OpenSea</a>

			<div className="socials">
				<a href="https://twitter.com/EV3RETH_NFT" target="_blank" rel="noopener noreferrer">
					<img src={twitter} alt="Twitter Link" />
				</a>
				<a href="https://tryshowtime.com/ev3reth" target="_blank" rel="noopener noreferrer">
					<img src="https://tryshowtime.com/logo_sm.jpg" alt="Showtime Link" />
				</a>
			</div>
		</footer>
	)
}