import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setForecastData} from "../../store/currWeatherSlice";

const LabelAxis = (props) => {

	const data = useSelector(state => state.data.data)
	const dispatch = useDispatch()

	return (
			<text
					x={props.x}
					y={props.y}
			>
				<tspan
						onClick={() => dispatch(setForecastData([props.datum, data]))}
						style={{fontSize: 12, fill: '#70757a'}}
						x={props.x}
				>
					{props.text}
				</tspan>
			</text>
	);
};

export default LabelAxis;