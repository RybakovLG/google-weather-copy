import {createSlice} from "@reduxjs/toolkit";

const currWeatherSlice = createSlice({
			name: 'currWeather',
			initialState: {
				currData: {},
				currLocation: {},
				isMetric: true,
				isAutoLocation: false,
			},

			reducers: {
				setCurrData(state, action) {
					const {data} = action.payload
					const curr = data.current;

					state.currLocation = {
						country: data.location.country,
						name: data.location.name,
					}
					state.currData = getCurrWeatherObject(curr, curr.last_updated)
				},

				setForecastData(state, action) {
					const [time, data] = action.payload

					if (state.currData.updTimeStamp === time) return

					let fCast

					main: for (const day of data.forecast.forecastday) {
						for (const hour of day.hour) {
							if (new Date(hour.time).getTime() === time) {
								fCast = hour;
								break main
							}
						}
					}
					state.currData = getCurrWeatherObject(fCast, fCast.time)
				},

				setCurrDayData(state, action) {
					const [time, currDay] = action.payload
					if (state.currData.updTimeStamp === time) return
					state.currData = getCurrWeatherObject(currDay, time, true)
				},

				setMetric(state, action) {
					state.isMetric = action.payload
				},

				setAutoLocation(state, action) {
					state.isAutoLocation = action.payload
				},
			},
		}
)

function getCurrWeatherObject(curr, last_updated, isDay = false) {

	const formatOptions = {
		weekday: 'long',
	}

	if (!isDay) {
		formatOptions.hour = 'numeric'
		formatOptions.minute = 'numeric'
	}

	return {
		temp_c: Math.round(isDay ? curr.avgtemp_c : curr.temp_c),
		temp_f: Math.round(isDay ? curr.avgtemp_f : curr.temp_f),
		icon: curr.condition.icon,
		precip_mm: isDay ? curr.totalprecip_mm : curr.precip_mm,
		humidity: isDay ? curr.avghumidity : curr.humidity,
		wind_kph: Math.round(isDay ? curr.maxwind_kph : curr.wind_kph),
		wind_mph: Math.round(isDay ? curr.maxwind_mph : curr.wind_mph),
		text: curr.condition.text,
		updTime: new Intl.DateTimeFormat('ru-RU', formatOptions)
				.format(new Date(last_updated)),
		updTimeStamp: new Date(last_updated).getTime()
	}
}

export const {
	setCurrData,
	setForecastData,
	setMetric,
	setCurrDayData,
	setAutoLocation,
} = currWeatherSlice.actions

export default currWeatherSlice.reducer