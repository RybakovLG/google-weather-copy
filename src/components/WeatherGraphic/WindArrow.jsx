import React from 'react';
import {useSelector} from "react-redux";

const WindArrow = ({x, y, dx, datum}) => {

	const {tickValues} = useSelector(state => state.graphics)

	let {wind_degree, wind_kph, time} = datum
	const isVisible = tickValues.includes(time)

	if (!isVisible) return null

	if (wind_kph < 10) wind_kph = 10

	return (
			<svg x={(x - (wind_kph + 5) / 2) + dx}
					 y={y}>
				<svg
						x="0px"
						y="0px"
						width={`${wind_kph}px`}
						height="42px"
						viewBox="0 0 42 42"
						enableBackground="new 0 0 42 42"
				>
					<polygon
							fill="#AEBFCF"
							style={{
								transformOrigin: '50% 50%',
								transform: `rotate(${wind_degree - 90}deg)`,
							}}
							points="27,37.5 42,20 27,4.5 18,4.5 30,16.5 0,16.5 0,23.5 30,23.5 18,37.5 "/>
				</svg>
			</svg>
	);
};

export default WindArrow;