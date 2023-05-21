import { GET_MOVIES_LENGTH } from "../Reducers/movieReducer";

export const setMovieLength = (moviesLength) => async (dispatch) => {
	try {
		await new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve();
			}, 200);
		});
		dispatch({
			type: GET_MOVIES_LENGTH,
			moviesLength: moviesLength,
		});
		console.log("Đã lấy data movie length thành công");
	} catch (error) {
		console.log(error);
	}
};
