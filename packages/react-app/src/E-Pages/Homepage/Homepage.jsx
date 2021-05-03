import React from 'react'
import { Link } from 'react-router-dom'
import Hero from './Hero/Hero'
import Market from './Market/Market'

export default function Homepage() {
	return (
		<main className="homepage">
			<Hero />

			<Market />
			<Link to="/scaffold">SCAFFOLD STUFF</Link>
		</main>
	)
}