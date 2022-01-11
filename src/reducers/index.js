import { combineReducers } from "redux";

// 노래 목록을 알려주는 reducer
const songsReducer = () => {
	return [
		{ title: "소주 한잔", duration: "4:51" },
		{ title: "Memories", duration: "3:10" },
		{ title: "널 좋아하나봐", duration: "3:44" },
		{ title: "거짓말이라도 해서 널 보고싶어", duration: "3:48" },
	];
};

// 선택된 노래를 알려주는 reducer
const selectedSongReducer = (selectedSong = null, action) => {
	if (action.type === "SONG_SELECTED") {
		return action.payload;
	}
	return selectedSong;
};

export default combineReducers({
	songs: songsReducer,
	selectedSong: selectedSongReducer,
});
