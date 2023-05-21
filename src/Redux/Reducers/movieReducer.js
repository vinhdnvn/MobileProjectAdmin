export const GET_MOVIES_LENGTH = "GET_MOVIES_LENGTH";

const initialState = {
	moviesLength: 0,
};

export default function actionForMovieReducer(state = initialState, payload) {
	switch (payload.type) {
		case GET_MOVIES_LENGTH:
			return {
				...state,
				moviesLength: payload.moviesLength,
			};
		default:
			return state;
	}
}
