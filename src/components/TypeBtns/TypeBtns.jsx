import React from 'react';
import {setType} from "../../store/graphSlice";
import {useDispatch, useSelector} from "react-redux";

const TypeBtns = () => {

	const {isMetric} = useSelector(state => state.currWeather)
	const {typeY} = useSelector(state => state.graphics)

	const dispatch = useDispatch()

	function handleClick(type) {
		if (typeY.includes(type)) return

		if (type === 'temp') {
			dispatch(setType(`${isMetric ? 'temp_c' : 'temp_f'}`))
			return
		}
		if (type === 'wind') {
			dispatch(setType(`${isMetric ? 'wind_kph' : 'wind_mph'}`))
			return
		}
		dispatch(setType(type))
	}
	
	function isActive(type) {
		return typeY.includes(type) ? 'active' : undefined
	}

	return (
			<div className={'type-btns'}>
				<button
						className={isActive('temp')}
						onClick={() => handleClick('temp')}>
					Температура
				</button>
				<span className={'vert-line'}>|</span>
				<button
						className={isActive('humidity')}
						onClick={() => handleClick('humidity')}>
					Влажность
				</button>
				<span className={'vert-line'}>|</span>
				<button
						className={isActive('wind')}
						onClick={() => handleClick('wind')}>
					Ветер
				</button>
			</div>
	);
};

export default TypeBtns;