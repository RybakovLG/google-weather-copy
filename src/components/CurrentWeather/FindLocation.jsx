import React, {useLayoutEffect, useRef, useState} from 'react';
import classes from "./CurrentWeather.module.css";
import useFindLocation from "../../hooks/useFindLocation";

const FindLocation = ({isVisible}) => {

	const {fetchNewWeather, fetchLocation} = useFindLocation()

	const inputElement = useRef()

	const [listFindLocations, SetListFindLocations] = useState([])
	const [errorFindLocations, SetErrorFindLocations] = useState(null)
	const [statusFetchLocation, SetStatusFetchLocation] = useState(null)

	useLayoutEffect(() => {
		if (isVisible) inputElement.current.focus()
	}, [])

	function itemKeyHandler(ev, location) {
		if (ev.code === 'Enter' || ev.type === "click") fetchNewWeather(ev, location.lat, location.lon)
	}

	function onChangeInputFindLocation(word) {
		if (word.length > 2) {
			fetchLocation(word, SetStatusFetchLocation, SetListFindLocations, SetErrorFindLocations)
		}
	}

	return (
			<div className={`${classes.findWrapper} js-findWrapper`}>
				<h3>Введите название населенного пункта</h3>
				<input className={classes.findInput}
							 ref={inputElement}
							 onChange={ev => onChangeInputFindLocation(ev.target.value)}
							 placeholder={'Поиск от 3 символов'}
							 type="text"
							 name="country-name"
				/>
				<ul tabIndex={0} className={classes.findList}>
					{statusFetchLocation === 'loading' && <li className={classes.findItem}>loading...</li>}
					{
						listFindLocations.length > 0
						&& statusFetchLocation === 'ok'
						&& listFindLocations.map(location => {
							return (
									<li className={classes.findItem}
											tabIndex={0}
											onClick={ev => itemKeyHandler(ev, location)}
											onKeyUp={ev => itemKeyHandler(ev, location)}
											key={location.id}>
										{location.name}
									</li>
							)
						})}
					{
						listFindLocations.length === 0
						&& statusFetchLocation === 'ok'
						&& <li className={classes.findItem}>Не найдено</li>
					}
					{statusFetchLocation === 'error' && <li className={classes.findItem}>{errorFindLocations}</li>}
				</ul>
			</div>
	);
};

export default FindLocation;