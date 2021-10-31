import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const fetchWeather = createAsyncThunk(
		'data/fetchWeather',
		async function (pos, {rejectWithValue}) {
			const [lat, lon] = pos
			const url = `https://api.weatherapi.com/v1/forecast.json?key=b8d348df879e486ca0f172620210610&q=${lat},${lon}&days=8&lang=ru`
			try {
				const response = await fetch(url)
				if (!response.ok) {
					throw new Error('Server Error!')
				}
				return await response.json()
			} catch (e) {
				return rejectWithValue(e.message)
			}
		}
)

const dataSlice = createSlice({
	name: 'data',

	initialState: {
		data: {},
		statusFetchWeather: null,
		errorFetchWeather: null,
	},

	extraReducers: {
		[fetchWeather.pending]: (state) => {
			state.statusFetchWeather = 'loading'
		},
		[fetchWeather.fulfilled]: (state, action) => {
			state.data = action.payload
			state.statusFetchWeather = 'ok'
		},
		[fetchWeather.rejected]: (state, action) => {
			state.errorFetchWeather = action.payload
			state.statusFetchWeather = 'rejected'
		},
	}
})

export {fetchWeather}
export default dataSlice.reducer