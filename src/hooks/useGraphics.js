import {useDispatch, useSelector} from "react-redux";
import {setForecastData} from "../store/currWeatherSlice";

const UseGraphics = () => {

	const {data} = useSelector(state => state.data)
	const {typeY, slideGraphicsPx} = useSelector(state => state.graphics)

	const dispatch = useDispatch()

	function getVisualY (datum) {

		function addPostfix() {
			if (typeY.includes('temp')) return datum[typeY]

			const postfix =
					typeY === 'humidity'
							? '%'
							: typeY === 'wind_kph'
							? ' км/ч'
							: typeY === 'wind_mph'
									? ' ми/ч'
									: ''

			return datum[typeY] + `${postfix}`
		}

		let currHour = new Date(data.current.last_updated).getHours()
		let hourX = new Date(datum.time).getHours()

		if (!typeY.includes('temp')) ++currHour

		for (let i = currHour; i < 27; i += 3) {
			if (hourX === i) {
				return addPostfix()
			}
			for (let j = currHour; j >= 0; j -= 3) {
				if (hourX === j) {
					return addPostfix()
				}
			}
		}
	}

	function clickHandler(e) {
		if (!e.target.dataset.time) return
		dispatch(setForecastData([+e.target.dataset.time, data]))
	}

	const chartsStyles = {
		VictoryAxis: {
			tickLabels: {
				fontFamily: 'Arial',
				fontSize: 12,
				fill: '#70757a',
			},
			axis: {stroke: null},
		},
		VictoryArea: {
			data: {
				fill: `${typeY === 'humidity' ? "#e8f0fe" : '#fff5cc'}`,
				stroke: `${typeY === 'humidity' ? '#1a73e8' : "#ffcc00"}`,
				strokeWidth: 2,
			},
			labels: {
				fontFamily: 'Arial',
				fontSize: 11,
				fontWeight: 700,
				fill: `${typeY === 'humidity' ? '#1a73e8' : 'rgb(181, 181, 181)'}`,
				cursor: 'pointer',
			}
		},
		padding: {bottom: 20, top: 25, left: 0, right: 0},
		domainPadding: {y: [15, 25]},
		VictoryContainer: {
			transform: `translateX(-${slideGraphicsPx}px)`,
			transition: 'all 1000ms cubic-bezier(.51,-0.17,0,1)'
		}
	}

	const onClick = {onClick: clickHandler}

	return {getVisualY, chartsStyles, onClick};
};

export default UseGraphics;

