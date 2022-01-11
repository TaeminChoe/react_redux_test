import React from "react";
import SongDetail from "./SongDetail";
import SongList from "./SongList";

export default function App() {
	return (
		<div className="app">
			<SongList />
			<SongDetail />
		</div>
	);
}
