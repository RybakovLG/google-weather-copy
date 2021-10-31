import {fetchWeather} from "../store/dataSlice";
import {useDispatch} from "react-redux";
import {setAutoLocation} from "../store/currWeatherSlice";

const useFindLocation = () => {

	const dispatch = useDispatch()

	function getUrPosition() {
		navigator.geolocation.getCurrentPosition(
				pos => {
					dispatch(fetchWeather([pos.coords.latitude, pos.coords.longitude]))
					dispatch(setAutoLocation(true))
				},
				err =>
						dispatch(fetchWeather([34.052235, -118.243683])), //Los angeles
				{
					enableHighAccuracy: true,
					timeout: 5000,
					maximumAge: 0
				});
	}

	async function fetchLocation(word, SetStatus, SetList, SetError) {
		SetStatus('loading')

		const url = `https://api.weatherapi.com/v1/search.json?key=b8d348df879e486ca0f172620210610&q=${word}`

		try {
			const response = await fetch(url)
			if (!response.ok) {
				throw new Error('Server Error!')
			}
			SetList(await response.json())
			SetStatus('ok')
		} catch (e) {
			SetError(e.message)
			SetStatus('error')
		}
	}

	function fetchNewWeather(ev, lat, lon) {
		dispatch(fetchWeather([lat, lon]))
		ev.target.value = ''
		dispatch(setAutoLocation(false))
	}

	return {
		getUrPosition,
		fetchNewWeather,
		fetchLocation,
	}
}

export default useFindLocation;