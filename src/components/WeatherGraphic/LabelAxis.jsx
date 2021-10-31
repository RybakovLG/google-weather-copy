import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setForecastData} from "../../store/currWeatherSlice";

const LabelAxis = ({x, y ,datum, text}) => {

	const data = useSelector(state => state.data.data)
	const dispatch = useDispatch()

	return (
			<text
					x={x}
					y={y}
			>
				<tspan
						onClick={() => dispatch(setForecastData([datum, data]))}
						style={{fontSize: 12, fill: '#70757a'}}
						x={x}
				>
					{text}
				</tspan>
			</text>
	);
};

export default LabelAxis;