import React from "react";
import { connect } from "react-redux";

const SongDetail = ({ selectedSong }) => {
	return (
		<>
			{!selectedSong ? (
				<div>Please select a song!</div>
			) : (
				<div>
					<h3>노래 상세</h3>
					<p>제목: {selectedSong.title}</p>
					<p>시간: {selectedSong.duration}</p>
				</div>
			)}
		</>
	);
};

const mapStateToProps = state => {
	return { selectedSong: state.selectedSong };
};

export default connect(mapStateToProps)(SongDetail);
