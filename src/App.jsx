import 'normalize.css'
import './App.css';

import {useEffect} from "react";
import {useSelector} from "react-redux";

import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import TypeBtns from "./components/TypeBtns/TypeBtns";
import WeatherGraphic from "./components/WeatherGraphic/WeatherGraphic";
import DaysBtns from "./components/DaysBtns/DaysBtns";
import useFindLocation from "./hooks/useFindLocation";

function App() {
	const {data ,errorFetchWeather, statusFetchWeather} = useSelector(state => state.data)

	const { getUrPosition } = useFindLocation()

	useEffect(() => {
		getUrPosition()
	}, []);

	return (
			<div className="App">
				{statusFetchWeather === 'loading' && <h2>loading...</h2>}
				{errorFetchWeather && <h2 style={{color: 'red'}}>Ошибка: {errorFetchWeather}</h2>}
				{statusFetchWeather === 'ok'
				&& !errorFetchWeather
				&& <div className={'container'}>
					<CurrentWeather/>
					<TypeBtns/>
					<div className={'charts'}>
						<WeatherGraphic data={data}/>
					</div>
					<DaysBtns />
				</div>
				}
			</div>
	);
}

export default App;
