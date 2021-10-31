import {createSlice} from "@reduxjs/toolkit";

const currWeatherSlice = createSlice({
			name: 'currWeather',
			initialState: {
				currData: {},
				isMetric: true,
				isAutoLocation: false,
			},

			reducers: {
				setCurrData(state, action) {
					const {data} = action.payload
					const curr = data.current;
					state.currData = getCurrWeatherObject(data, curr, curr.last_updated)
				},

				setForecastData(state, action) {
					const [time, data] = action.payload
					if (state.currData.updTimeStamp === time) return

					let fCast
					data.forecast.forecastday.forEach((ar) => ar.hour.forEach((ar1) => {
						if (new Date(ar1.time).getTime() === time) {
							fCast = ar1;
						}
					}));
					state.currData = getCurrWeatherObject(data, fCast, fCast.time)
				},

				setCurrDayData(state, action) {
					const [time, currDay, data] = action.payload
					if (state.currData.updTimeStamp === time) return
					state.currData = getCurrWeatherObject(data, currDay, time, true)
				},

				setMetric(state, action) {
					state.isMetric = action.payload
				},

				setAutoLocation(state, action) {
					state.isAutoLocation = action.payload
				},
			}
		}
)

function getCurrWeatherObject(data, curr, last_updated, isDay = false) {

	const formatOptions = {
		weekday: 'long',
		hour: isDay ? undefined : 'numeric',
		minute: isDay ? undefined : 'numeric'
	}

	return {
		temp_c: Math.round(isDay ? curr.avgtemp_c : curr.temp_c),
		temp_f: Math.round(isDay ? curr.avgtemp_f : curr.temp_f),
		icon: curr.condition.icon,
		precip_mm: isDay ? curr.totalprecip_mm : curr.precip_mm,
		humidity: isDay ? curr.avghumidity : curr.humidity,
		wind_kph: Math.round(isDay ? curr.maxwind_kph : curr.wind_kph),
		wind_mph: Math.round(isDay ? curr.maxwind_mph : curr.wind_mph),
		country: data.location.country,
		name: data.location.name,
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