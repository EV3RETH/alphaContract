import React from 'react'
import { Link } from 'react-router-dom'
import Hero from './Hero/Hero'
import Market from './Market/Market'
import MessageBoard from './MessageBoard/MessageBoard'

export default function Homepage() {
	return (
		<main className="homepage" style={{ height: '100vh' }}>
			<Hero />
			<MessageBoard />
			<Market />
		</main>
	)
}