import React, {memo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setCurrDayData} from "../../store/currWeatherSlice";
import {setSlideGraphics} from "../../store/graphSlice";

const DaysBtns = () => {

	const {data} = useSelector(state => state.data)
	const {currData, isMetric} = useSelector(state => state.currWeather)

	const dispatch = useDispatch()

	function handlerClick(e, btnDay, isSameDay) {
		if (isSameDay) return
		dispatch(setSlideGraphics(btnDay.date))
		dispatch(setCurrDayData([btnDay.date, btnDay.day]))
	}

	function addBtns(btn) {
		let {maxtemp_c, maxtemp_f, mintemp_c, mintemp_f} = btn.day
		const {icon, text} = btn.day.condition
		const currDay = new Date(currData.updTimeStamp).getDate()
		const btnDay = new Date(btn.date).getDate();
		const isSameDay = currDay === btnDay;

		function roundNums(...nums) {
			return nums.map(num => Math.round(num))
		}

		[maxtemp_c, maxtemp_f, mintemp_c, mintemp_f]
				= roundNums(maxtemp_c, maxtemp_f, mintemp_c, mintemp_f)

		const weekDay = new Intl.DateTimeFormat(
				'ru-RU',
				{weekday: 'short'})
				.format(new Date(btn.date))

		return (
				<button
						onClick={e => handlerClick(e, btn, isSameDay)}
						className={`day-btn ${isSameDay ? 'active' : ''}`}
						key={btn.date}
				>
					<div>{weekDay}</div>
					<img width={64} height={64} src={icon} alt={text}/>
					<br/>
					<span> {`${isMetric ? maxtemp_c : maxtemp_f}`}&deg; </span>
					<span className={'day-btn__f'}>{`${isMetric ? mintemp_c : mintemp_f}`}&deg;</span>
				</button>
		)
	}

	return (
			<div className="day-btns">
				{
					data.forecast.forecastday
						.map(btn => addBtns(btn))
				}
			</div>
	);
};

function areEqual(prevProps, currProps) {
	const sameDay = new Date(prevProps.currData.updTimeStamp).getDay() === new Date(currProps.currData.updTimeStamp).getDay()
	return (prevProps.isMetric === currProps.isMetric && sameDay)
}

export default memo(DaysBtns, areEqual);
