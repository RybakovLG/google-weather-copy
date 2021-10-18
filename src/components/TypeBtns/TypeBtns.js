import React from 'react';
import {setType} from "../../store/graphSlice";
import {useDispatch, useSelector} from "react-redux";

const TypeBtns = () => {

	const {isMetric} = useSelector(state => state.currWeather)
	const {typeY} = useSelector(state => state.graphics)

	const dispatch = useDispatch()

	function handleClick(type, e) {
		e.target.parentElement.querySelectorAll('button')
				.forEach(b => b.className = '')
		e.target.classList.add('active')
		if (typeY === type) return
		if ((typeY.includes('temp')) && type === 'temp') return
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

	return (
			<div className={'type-btns'}>
				<button
						className={'active'}
						onClick={(e) => handleClick('temp', e)}>
					Температура
				</button>
				<span className={'vert-line'}>|</span>
				<button
						onClick={(e) => handleClick('humidity', e)}>
					Влажность
				</button>
				<span className={'vert-line'}>|</span>
				<button
						onClick={(e) => handleClick('wind', e)}>
					Ветер
				</button>
			</div>
	);
};

export default TypeBtns;