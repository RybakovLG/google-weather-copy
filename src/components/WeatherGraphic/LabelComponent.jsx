import React from 'react';
import {useSelector} from "react-redux";
import useGraphics from "../../hooks/useGraphics";

const LabelComponent = (props) => {
	const {datum, x, dx, y, dy, style} = props;

	const {currData} = useSelector(state => state.currWeather)

	const {getVisualY} = useGraphics()

	return (
			<g
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
						data-time={datum.time}
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
					<tspan
							data-time={datum.time}
					>
						{getVisualY(datum)}
					</tspan>
				</text>
			</g>
	);
};

export default LabelComponent;