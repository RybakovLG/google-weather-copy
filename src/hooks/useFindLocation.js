import {fetchLocation, fetchWeather} from "../store/dataSlice";
import {setAutoGeolocation, setVisionFindLocationInput} from "../store/currWeatherSlice";
import {useDispatch} from "react-redux";

const UseFindLocation = () => {

	const dispatch = useDispatch()

	function onChangeInputFindLocation(word) {
		if (word.length > 2) dispatch(fetchLocation(word))
	}

	function hideFindLocationEvent(ev) {
		if (ev.target.closest('.js-findWrapper')) return
		hideFindLocationInput()
	}

	function hideFindLocationInput() {
		dispatch(setVisionFindLocationInput(false))
		document.removeEventListener('click', hideFindLocationEvent)
	}

	function fetchNewWeather(ev, lat, lon) {
		dispatch(fetchWeather([lat, lon]))
		ev.target.value = ''
		hideFindLocationInput()
		dispatch(setAutoGeolocation(false))
	}

	function showFindLocationsInput() {
		dispatch(setVisionFindLocationInput(true))
		setTimeout(() => {
			document.addEventListener('click', hideFindLocationEvent)
		})
	}

	return	{
		fetchNewWeather,
		hideFindLocationEvent,
		onChangeInputFindLocation,
		showFindLocationsInput,
		hideFindLocationInput
		}
}

export default UseFindLocation;