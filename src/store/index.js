import {configureStore} from "@reduxjs/toolkit";
import graphSlice from "./graphSlice";
import dataSlice from './dataSlice'
import currWeatherSlice from "./currWeatherSlice";

export default configureStore({
	reducer: {
		data: dataSlice,
		graphics: graphSlice,
		currWeather: currWeatherSlice,
	}
})