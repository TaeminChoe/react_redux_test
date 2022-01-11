import React from "react";
import { connect } from "react-redux";
import { selectSong } from "../actions";

const SongList = props => {
	return (
		<div className="ui divided list">
			{props.songs.map(song => (
				<div className="item" key={song.title}>
					<div
						className="right floated content"
						onClick={() => props.selectSong(song)}
					>
						<button className="ui button primary">Select</button>
					</div>
					<div className="content">{song.title}</div>
				</div>
			))}
		</div>
	);
};

const mapStateToProps = state => {
	console.log(state);
	return { songs: state.songs };
};

export default connect(mapStateToProps, {
	selectSong,
})(SongList);
