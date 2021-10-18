import {useSelector} from "react-redux";

const UseGraphics = () => {

	const {data} = useSelector(state => state.data)
	const {typeY} = useSelector(state => state.graphics)

	function getVisualY(datum) {

		function addPostfix() {
			if (typeY.includes('temp')) return datum[typeY]

			switch (typeY) {
				default:
					return datum[typeY]
				case 'humidity':
					return `${datum[typeY]}%`;
				case 'wind_kph':
					return `${datum[typeY]} км/ч`;
				case 'wind_mph':
					return `${datum[typeY]} ми/ч`;
			}
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
		}
	}
	return {getVisualY, chartsStyles};
};

export default UseGraphics;

