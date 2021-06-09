import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css'
import Waves from './E-Pages/Waves'
import Hero from './E-Pages/Hero/Hero';
import MessageBoard from './E-Pages/MessageBoard/MessageBoard';
import Market from './E-Pages/Market/Market';
import Header from './E-Pages/Header/Header';
import starz from "./assets/new-stars.png";
import Footer from './E-Pages/Footer/Footer';

// import { ThemeSwitcherProvider } from "react-css-theme-switcher";
// import Scaffold from './E-Pages/Scaffold'

// const prevTheme = window.localStorage.getItem("theme");
// const themes = {
// 	dark: `${ process.env.PUBLIC_URL }/dark-theme.css`,
// 	light: `${ process.env.PUBLIC_URL }/light-theme.css`,
// };

export const PATHS = {
	MessageBoard: "/about",
	Market: "/market",
	Hero: "/"
}


export default function App(props) {
	const [wavesOn, setWavesOn] = useState(false)
	const toggleWaves = () => setWavesOn(prev => !prev)

	return (
		<main>
			<Router>
				<Header toggleWaves={toggleWaves} wavesOn={wavesOn} />
				<Switch>
					{/* <Route exact path="/scaffold">
						<ThemeSwitcherProvider themeMap={themes} defaultTheme={prevTheme ? prevTheme : "dark"}>
							<Scaffold ...props/>
						</ThemeSwitcherProvider>
					</Route> */}
					<Route path={PATHS.MessageBoard}>
						<MessageBoard />
					</Route>
					<Route path={PATHS.Market}>
						<Market />
					</Route>
					<Route path={PATHS.Hero}>
						<Hero toggleWaves={toggleWaves} wavesOn={wavesOn} />
					</Route>
				</Switch>
				<Footer />
			</Router>
			{wavesOn ? <Waves color="rgba(0, 0, 0, 0)" /> : null}
			<img src={starz} alt="" className="starz" />
		</main>
	)
}