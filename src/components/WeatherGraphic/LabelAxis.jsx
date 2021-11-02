import React from 'react';


const LabelAxis = ({x, y ,datum, text}) => {

	return (
			<text
					x={x}
					y={y}
			>
				<tspan
						data-time={datum}
						style={{fontSize: 12, fill: '#70757a'}}
						x={x}
				>
					{text}
				</tspan>
			</text>
	);
};

export default LabelAxis;