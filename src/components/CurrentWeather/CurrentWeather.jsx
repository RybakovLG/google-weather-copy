import React, {useEffect, useState} from 'react';
import {batch, useDispatch, useSelector} from "react-redux";
import classes from './CurrentWeather.module.css'

import AutoLocationIcon from "./AutoLocationIcon";
import FindLocation from "./FindLocation";
import PortalModal from "../PortalModal/PortalModal";

import {setCurrData, setMetric} from "../../store/currWeatherSlice";
import {setType} from "../../store/graphSlice";

const CurrentWeather = () => {

	const {isMetric, currData, isAutoLocation, currLocation}
			= useSelector(state => state.currWeather)

	const {data} = useSelector(state => state.data)

	const [isVisibleFindLocationInput, setVisibleFindLocationInput] = useState(false)

	const {
		temp_c, temp_f, icon, precip_mm, humidity,
		wind_kph, wind_mph, text, updTime
	} = currData

	const {country, name} = currLocation

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setCurrData({data}))
	}, [data, dispatch])

	function handlerClick(bool) {
		batch(() => {
			dispatch(setMetric(bool))
			dispatch(setType(bool))
		})
	}

	return (
			<div className={classes.current}>

				<div className={classes.leftCol}>
					<img width={64} height={64} src={icon} alt="weather icon"/>
					<span className={classes.temp}>{isMetric ? temp_c : temp_f}</span>

					<div className={classes.btns}>
						<button
								disabled={isMetric}
								onClick={() => handlerClick(true)}
								className={classes.btn + `${isMetric ? classes.active : ''}`}>
							&deg;C
						</button>
						<span className={classes.vertLine}>|</span>
						<button
								disabled={!isMetric}
								onClick={() => handlerClick(false)}
								className={classes.btn + `${!isMetric ? classes.active : ''}`}>
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
					<button
							onClick={() => setVisibleFindLocationInput(true)}
							className={classes.btnFindLoc}>
						{isAutoLocation && <AutoLocationIcon size={20}/>}
						<h1 className={classes.location}>{country}, {name}</h1>
					</button>
					<span>{updTime}</span>
					<span>{text}</span>

					<PortalModal
							childrenClassName={'js-findWrapper'}
							isOpen={isVisibleFindLocationInput}
							onClose={() => setVisibleFindLocationInput(false)}
					>
						<FindLocation
								isVisible={isVisibleFindLocationInput}
						/>
					</PortalModal>
				</div>
			</div>
	);
};


export default CurrentWeather;