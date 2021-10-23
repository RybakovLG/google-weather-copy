import 'normalize.css'
import './App.css';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchWeather} from "./store/dataSlice";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import TypeBtns from "./components/TypeBtns/TypeBtns";
import WeatherGraphic from "./components/WeatherGraphic/WeatherGraphic";
import DaysBtns from "./components/DaysBtns/DaysBtns";
import {setAutoGeolocation} from "./store/currWeatherSlice";

function App() {
	const {error, statusFetchWeather} = useSelector(state => state.data)
	const dispatch = useDispatch()

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
				(pos) => {
					dispatch(fetchWeather([pos.coords.latitude, pos.coords.longitude]))
					dispatch(setAutoGeolocation(true))
				},
				(err) =>
						dispatch(fetchWeather([34.052235, -118.243683])), //Los angeles
				{
						enableHighAccuracy: true,
						timeout: 5000,
						maximumAge: 0
					});
	}, []);

	return (
			<div className="App">
				{statusFetchWeather === 'loading' && <h2>Loading..</h2>}
				{error && <h2 style={{color: 'red'}}>Ошибка: {error}</h2>}
				{statusFetchWeather === 'ok' && !error &&
				<div className={'container'}>
					<CurrentWeather/>
					<TypeBtns/>
					<div className={'charts'}>
						<WeatherGraphic/>
					</div>
					<DaysBtns/>
				</div>
				}
			</div>
	);
}


export default App;
