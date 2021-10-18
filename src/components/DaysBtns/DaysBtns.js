import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setCurrDayData} from "../../store/currWeatherSlice";
import {setSlideGraphics} from "../../store/graphSlice";

const DaysBtns = () => {

	const {data} = useSelector(state => state.data)
	const {currData, isMetric} = useSelector(state => state.currWeather)

	const dispatch = useDispatch()

	function handlerClick(e, currDay) {
		const btn = e.target.closest('button')

		if (!btn.classList.contains('active')) {
			btn.parentElement.querySelectorAll('button')
					.forEach(b => b.classList.remove('active'))
			btn.classList.add('active')
		}
		dispatch(setSlideGraphics(currDay.date))
		dispatch(setCurrDayData([currDay.date, currDay.day, data]))
	}

	function roundNums(...nums) {
		return (nums.map(num => Math.round(num)))
	}

	function addBtns(btn) {
		let {maxtemp_c, maxtemp_f, mintemp_c, mintemp_f} = btn.day
		const {icon, text} = btn.day.condition
		const currDay = new Date(currData.updTimeStamp).getDate()
		const btnDay = new Date(btn.date).getDate();

		[maxtemp_c, maxtemp_f, mintemp_c, mintemp_f] = roundNums(maxtemp_c, maxtemp_f, mintemp_c, mintemp_f)

		return (
				<button
						onClick={e => handlerClick(e, btn)}
						className={`day-btn ${currDay === btnDay ? 'active' : ''}`}
						key={btn.date}
				>
					<div> {
						new Intl.DateTimeFormat('ru-RU',
								{weekday: 'short'})
								.format(new Date(btn.date))
					}
					</div>
					<img width={64} height={64} src={icon} alt={text}/>
					<br/>
					<span>  {`${isMetric ? maxtemp_c : maxtemp_f}`}&deg; </span>
					<span className={'day-btn__f'}>{`${isMetric ? mintemp_c : mintemp_f}`}&deg;</span>
				</button>
		)
	}

	return (
			<div className="day-btns">
				{data.forecast.forecastday
						.map(btn => addBtns(btn))
				}
			</div>
	);
};

export default DaysBtns;