import movieReducer from "./movieData";
import loginReducer from "./isLogged";
import { combineReducers } from "redux";

export const allReducer = combineReducers({
	movies: movieReducer,
	loginStatus: loginReducer,
});
