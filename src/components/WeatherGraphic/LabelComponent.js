import React from 'react';
import {setForecastData} from "../../store/currWeatherSlice";
import {useDispatch, useSelector} from "react-redux";
import useGraphics from "../../hooks/useGraphics";

const LabelComponent = (props) => {
	const {datum, x, dx, y, dy, style} = props;

	const data = useSelector(state => state.data.data)
	const {currData} = useSelector(state => state.currWeather)
	const dispatch = useDispatch()
	const {getVisualY} = useGraphics()

	return (
			<g
					onClick={() => dispatch(setForecastData([datum.time, data]))}
					style={style}
					x={x}
					y={getVisualY(datum)}
			>
				<rect
						vectorEffect="non-scaling-stroke"
						height="85" width={650 / 24}
						x={x}
						fill={'transparent'}
						y={y - 25}
				/>
				<text
						style={{
							fill: new Date(currData.updTimeStamp).setMinutes(0) === datum.time
									? 'rgb(85, 85, 85)'
									: "inherit"
						}}
						x={x + dx}
						y={y}
						dy={dy}
				>
					<tspan>
						{getVisualY(datum)}
					</tspan>
				</text>
			</g>
	);
};

export default LabelComponent;