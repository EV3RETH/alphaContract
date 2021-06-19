import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import { PATHS } from "../../App";
// import menu from '../../assets/menu.png'
import menu from '../../assets/menu-slice.png'

import './header.css'

export default function Header({ wavesOn, toggleWaves }) {
	const [isVisible, setIsVisible] = useState(false)
	const [hasScrolled, setHasScrolled] = useState(false)
	const { pathname } = useLocation()

	const isVisibleClass = isVisible ? " nav-active" : ""

	function toggleNav() {
		setIsVisible(prev => !prev)
	}

	useEffect(() => {
		if (pathname !== PATHS.Hero) {
			setIsVisible(true)
		}

		if (window.screen?.width <= 530) {
			setIsVisible(false)
		}
	}, [pathname])

	useEffect(() => {
		// if scrolling and not at the top of the window remove menu
		const handleMove = () => setIsVisible(window.pageYOffset === 0)
		window.addEventListener("touchmove", handleMove)

		return () => {
			window.removeEventListener("touchmove", handleMove)
		}
	}, [])

	return (
		<nav>
			<button className={`nav-toggle`} onClick={toggleNav}>
				<img src={menu} alt="" />
			</button>
			<div className={`nav-container${ isVisibleClass }`}>
				<button onClick={toggleWaves}>
					<h1 className={`nav-title${ wavesOn ? " on" : "" }`}>EV3RETH</h1>
				</button>
				<div className="links-container">
					<Link to={PATHS.Hero} className={pathname === PATHS.Hero ? "selected" : ""}>
						Home
					</Link>
					<Link to={PATHS.MessageBoard} className={pathname === PATHS.MessageBoard ? "selected" : ""}>
						About
					</Link>
					<Link to={PATHS.Market} className={pathname === PATHS.Market ? "selected" : ""}>
						Market Place
					</Link>
					{/* <Link to={PATHS.Hero}>
						<img src={process.env.PUBLIC_URL + "/E-300.png"} alt="" className="nav-icon" />
					</Link> */}
				</div>
			</div>
		</nav>
	)
}