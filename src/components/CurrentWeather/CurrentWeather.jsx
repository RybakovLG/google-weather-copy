import React, {useEffect} from 'react';
import classes from './CurrentWeather.module.css'
import {useDispatch, useSelector} from "react-redux";
import {setCurrData, setMetric} from "../../store/currWeatherSlice";
import AutoLocationIcon from "./AutoLocationIcon";
import UseFindLocation from "../../hooks/useFindLocation";

const CurrentWeather = () => {

	const {isAutoGeolocation, isVisibleFindLocationInput, isMetric, currData}
			= useSelector(state => state.currWeather)
	const {temp_c, temp_f, icon, precip_mm, humidity, wind_kph,
		wind_mph, country, name, text, updTime}
			= currData

	const {data, listFindLocations, error, statusFetchLocation}
			= useSelector(state => state.data)

	const {fetchNewWeather,	onChangeInputFindLocation,showFindLocationsInput,}
			= UseFindLocation()

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setCurrData({data}))
	}, [data])

	return (
			<div className={classes.current}>
				<div className={classes.leftCol}>
					<img width={64} height={64} src={icon} alt="weather icon"/>
					<span className={classes.temp}>{isMetric ? temp_c : temp_f}</span>
					<div className={classes.btns}>
						<button
								disabled={isMetric}
								onClick={() => dispatch(setMetric(true))}
								className={`${classes.btn} ${isMetric ? classes.active : ''}`}>
							&deg;C
						</button>
						<span className={classes.vertLine}>|</span>
						<button
								disabled={!isMetric}
								onClick={() => dispatch(setMetric(false))}
								className={`${classes.btn} ${!isMetric ? classes.active : ''}`}>
							&deg;F
						</button>
					</div>
					<ul className={classes.other}>
						<li>Осадки: {precip_mm} мм</li>
						<li>Влажность: {humidity}%</li>
						<li>Ветер: {isMetric ? `${wind_kph} км/ч` : `${wind_mph} ми/ч`}</li>
					</ul>
				</div>
				<div className={classes.rightCol}>
					{isVisibleFindLocationInput && !error
							? <div className={`${classes.findWrapper} js-findWrapper`}>
								<input className={classes.findInput}
											 onChange={ev => onChangeInputFindLocation(ev.target.value)}
											 placeholder={'Город (от 3 символов) ...'}
											 type="text"
											 name="country-name"
								/>
								<ul className={classes.findList}>
									{listFindLocations.length > 0 && statusFetchLocation === 'ok' &&
									listFindLocations.map(location => {
										return (
												<li className={classes.findItem}
														onClick={(ev) => fetchNewWeather(ev, location.lat, location.lon)}
														key={location.id}>
													{location.name}
												</li>
										)
									})}
									{listFindLocations.length === 0 && statusFetchLocation === 'ok' &&
									<li className={classes.findItem}>Не найдено</li>}
								</ul>
							</div>
							: <button
									onClick={showFindLocationsInput}
									className={classes.btnFindLoc}>
								{isAutoGeolocation && <AutoLocationIcon size={20}/>}
								<h1 className={classes.location}>{country}, {name}</h1>
							</button>
					}
					<span>{updTime}</span>
					<span>{text}</span>
				</div>
			</div>
	);
};

export default CurrentWeather;