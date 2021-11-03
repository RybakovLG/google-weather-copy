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
			const newData = []

			for (const day of action.payload.data.forecast.forecastday) {
				day.hour.forEach((hour) => {

					newData.push({
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
			state.dataXY = newData
			state.last_updated = action.payload.data.current.last_updated
		},

		getArrHours(state) {
			let currHour = new Date(state.last_updated).getHours() + 1
			const newArr = []

			state.dataXY.forEach((ar, ind) => {
				for (let i = currHour; i < 75; i += 3) {
					if (ind === i) newArr.push(ar.time)
					for (let j = currHour; j >= 0; j -= 3) {
						if (ind === j) newArr.push(ar.time)
					}
				}
			})
			state.tickValues = newArr
		},

		setType(state, action) {
			const val = action.payload

			if (typeof val === "boolean") {
				if (state.typeY.includes('temp')) state.typeY = val ? 'temp_c' : 'temp_f'
				if (state.typeY.includes('wind')) state.typeY = val ? 'wind_kph' : 'wind_mph'
				return
			}
			state.typeY = val
		},

		setSlideGraphics(state, action) {
			const time = action.payload
			let currTime = new Date(time).getTime()
			let lastUpdTime = new Date(state.last_updated).getTime()

			if (currTime < lastUpdTime) currTime = lastUpdTime
			const firstTime = state.dataXY[0].time

			let res = (((currTime - firstTime) / 3600000) - 2.9) * 650 / 24
			if (res > 1275) res = 1275
			if (res < 0) res = 0

			state.slideGraphicsPx = res
		},

		getMinY(state) {
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
	setType,
	getMinY
} = graphSlice.actions

export default graphSlice.reducer