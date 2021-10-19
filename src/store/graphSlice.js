import {createSlice} from "@reduxjs/toolkit";

const defStates = {
	dataXY: [],
	typeY: 'temp_c',
	tickValues: [],
	last_updated: null,
	slideGraphicsPx: null,
	minY: -1,
}

const graphSlice = createSlice({
	name: 'graph',
	initialState: defStates,
	reducers: {

		getXY(state, action) {
			state.dataXY.length = 0
			for (const day of action.payload.data.forecast.forecastday) {
				day.hour.forEach((hour) => {
					state.dataXY.push({
						time: new Date(hour.time).getTime(),
						temp_c: Math.round(hour.temp_c),
						temp_f: Math.round(hour.temp_f),
						humidity: Math.round(hour.humidity),
						wind_kph: Math.round(hour.wind_kph),
						wind_mph: Math.round(hour.wind_mph),
						wind_degree: hour.wind_degree,
					})
				})
			}
		},

		getArrHours(state, action) {
			state.tickValues.length = 0
			let currHour = new Date(state.last_updated).getHours()
			++currHour

			state.dataXY.forEach((ar, ind) => {
				for (let i = currHour; i < 75; i += 3) {
					if (ind === i) state.tickValues.push(ar.time)
					for (let j = currHour; j >= 0; j -= 3) {
						if (ind === j) state.tickValues.push(ar.time)
					}
				}
			})
		},

		setCurrUpdTime(state, action) {
			state.last_updated = action.payload.data.current.last_updated
		},

		setType(state, action) {
			state.typeY = action.payload
		},

		setSlideGraphics(state, action) {

			if (state.dataXY.length) {
				const time = action.payload
				let currTime = new Date(time).getTime()
				let lastUpdTime = new Date(state.last_updated).getTime()
				if (currTime < lastUpdTime) currTime = lastUpdTime
				const firstTime = state.dataXY[0].time
				let res = (((currTime - firstTime) / 3600000) - 2.9) * 650 / 24
				if (res > 1275) res = 1275
				if (res < 0) res = 0

				state.slideGraphicsPx = res
			}
		},
		getMinY(state, action) {
			state.minY = state.dataXY.reduce((min, cur) => {
				if (min >= cur[state.typeY]) min = (cur[state.typeY] - 1)
				return min
			}, -1)
		},
	}
})

export const {
	resetGraphicsStates,
	getXY,
	setSlideGraphics,
	getArrHours,
	getVisualY,
	setCurrUpdTime,
	setType,
	getMinY
} = graphSlice.actions

export default graphSlice.reducer