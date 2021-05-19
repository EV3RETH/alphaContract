import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Homepage from "./E-Pages/Homepage/Homepage";

import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import Scaffold from './E-Pages/Scaffold'

import './App.css'

const prevTheme = window.localStorage.getItem("theme");
const themes = {
	dark: `${ process.env.PUBLIC_URL }/dark-theme.css`,
	light: `${ process.env.PUBLIC_URL }/light-theme.css`,
};


export default function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/scaffold">
					<ThemeSwitcherProvider themeMap={themes} defaultTheme={prevTheme ? prevTheme : "dark"}>
						<Scaffold />
					</ThemeSwitcherProvider>
				</Route>
				<Route path="/">
					<Homepage />
				</Route>
			</Switch>
		</Router>
	)
}