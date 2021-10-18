import React, {useEffect} from 'react';
import cl from './CurrentWeather.module.css'
import {useDispatch, useSelector} from "react-redux";
import {setCurrData, setGeo, setMetric, toggVisFindLoc} from "../../store/currWeatherSlice";
import {fetchLocation, fetchWeather} from "../../store/dataSlice";
import LocIcon from "./LocIcon";

const CurrentWeather = () => {

	const {isGeo ,isVisFindLoc, isMetric, currData}
			= useSelector(state => state.currWeather)
	const {data, listFindLocations, error, statusFetchLocation}
			= useSelector(state => state.data)

	const dispatch = useDispatch()
	const {
		temp_c, temp_f, icon, precip_mm, humidity, wind_kph,
		wind_mph, country, name, text, updTime
	} = currData

	useEffect(() => {
		dispatch(setCurrData({data}))
	}, [data])

	useEffect(() => {
		document.addEventListener('click', hideFindLoc)
	}, [])

	function onChangeHandler(word) {
		if (word.length > 2) {
			dispatch(fetchLocation(word))
		}
	}

	function hideFindLoc(e) {
		const findWrap = document.querySelector('.js-findWrapper')

		if (findWrap) {
			if (!e.path.find(el => el.classList ? el.classList.contains('js-findWrapper') : null)) {
				dispatch(toggVisFindLoc(false))
			}
		}
	}

	function onClickHandler(ev, lat, lon) {
		dispatch(fetchWeather([lat, lon]))
		ev.target.value = ''
		dispatch(toggVisFindLoc(false))
		dispatch(setGeo(false))
	}

	return (
			<div className={cl.current}>
				<div className={cl.leftCol}>
					<img width={64} height={64} src={icon} alt="weather icon"/>
					<span className={cl.temp}>{isMetric ? temp_c : temp_f}</span>
					<div className={cl.btns}>
						<button
								disabled={isMetric}
								onClick={() => dispatch(setMetric(true))}
								className={`${cl.btn} ${isMetric ? cl.active : ''}`}>
							&deg;C
						</button>
						<span className={cl.vertLine}>|</span>
						<button
								disabled={!isMetric}
								onClick={() => dispatch(setMetric(false))}
								className={`${cl.btn} ${!isMetric ? cl.active : ''}`}>
							&deg;F
						</button>
					</div>
					<ul className={cl.other}>
						<li>Осадки: {precip_mm} мм</li>
						<li>Влажность: {humidity}%</li>
						<li>Ветер: {isMetric ? `${wind_kph} км/ч` : `${wind_mph} ми/ч`}</li>
					</ul>
				</div>
				<div className={cl.rightCol}>
					{isVisFindLoc && !error
							? <div className={`${cl.findWrapper} js-findWrapper`}>
								<input className={cl.findInput}
											 onChange={e => onChangeHandler(e.target.value)}
											 placeholder={'Город (от 3 символов) ...'}
											 type="text"
											 name="country-name"
								/>
								<ul className={cl.findList}>
									{listFindLocations.length > 0 && statusFetchLocation === 'ok' &&
									listFindLocations.map(loc => {
										return (
												<li className={cl.findItem}
														onClick={(ev) => onClickHandler(ev, loc.lat, loc.lon)}
														key={loc.id}>
													{loc.name}
												</li>
										)
									})}
									{listFindLocations.length === 0 && statusFetchLocation === 'ok' &&
									<li className={cl.findItem}>Не найдено</li>}
								</ul>
							</div>
							: <button
									onMouseUp={() => dispatch(toggVisFindLoc(true))}
									className={cl.btnFindLoc}>
								{isGeo && <LocIcon size={20}/>}
								<h1 className={cl.location}>{country}, {name}</h1>
							</button>
					}
					<span>{updTime}</span>
					<span>{text}</span>
				</div>
			</div>
	);
};

export default CurrentWeather;