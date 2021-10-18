import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const fetchWeather = createAsyncThunk(
		'data/fetchWeather',
		async function (pos, {rejectWithValue}) {
			const [lat, lon] = pos
			// const url = `http://api.weatherapi.com/v1/forecast.json?key=b8d348df879e486ca0f172620210610&q=48.86,2.35&days=8`
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

const fetchLocation = createAsyncThunk(
		'data/fetchLocation',
		async function (word, {rejectWithValue}) {
			const url = `https://api.weatherapi.com/v1/search.json?key=b8d348df879e486ca0f172620210610&q=${word}`
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
		listFindLocations: [],
		statusFetchLocation: null,
		error: null,
		statusFetchWeather: null,
	},
	reducers: {

	},
	extraReducers: {
		[fetchWeather.pending]: (state, action) => {
			state.statusFetchWeather = 'loading'
		},
		[fetchWeather.fulfilled]: (state, action) => {
			state.data = action.payload
			state.statusFetchWeather = 'ok'
		},
		[fetchWeather.rejected]: (state, action) => {
			state.error = action.payload
			state.statusFetchWeather = 'rejected'
		},
		[fetchLocation.pending]: (state, action) => {
			state.statusFetchLocation = 'loading'
		},
		[fetchLocation.fulfilled]: (state, action) => {
			state.listFindLocations = action.payload
			state.statusFetchLocation = 'ok'
		},
		[fetchLocation.rejected]: (state, action) => {
			state.error = action.payload
			state.statusFetchLocation = 'rejected'
		},
	}
})

export const {setStatusFind} = dataSlice.actions
export {fetchWeather, fetchLocation}
export default dataSlice.reducer