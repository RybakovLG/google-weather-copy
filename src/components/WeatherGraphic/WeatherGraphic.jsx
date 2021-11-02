import React, {useEffect} from 'react';
import {batch, useDispatch, useSelector} from "react-redux";
import {VictoryArea, VictoryAxis, VictoryChart, VictoryContainer, VictoryLabel, VictoryScatter} from "victory";
import {getArrHours, getMinY, getXY, setSlideGraphics} from "../../store/graphSlice";

import useGraphics from "../../hooks/useGraphics";
import LabelComponent from "./LabelComponent";
import LabelAxis from "./LabelAxis";
import WindArrow from "./WindArrow";

const WeatherGraphic = ({data}) => {

	const {dataXY, typeY, tickValues, minY} =
			useSelector(state => state.graphics)

	const dispatch = useDispatch()

	const {getVisualY, chartsStyles, onClick} = useGraphics()

	useEffect(() => {
		batch(() => {
					dispatch(getXY({data}))
					dispatch(getArrHours())
					dispatch(setSlideGraphics(data.current.last_updated))
					dispatch(getMinY())
				}
		)
	}, [data])

	return (
			<VictoryChart
					width={1925}
					height={125}
					padding={chartsStyles.padding}
					domainPadding={chartsStyles.domainPadding}
					containerComponent={
						<VictoryContainer
								events={onClick}
								style={chartsStyles.VictoryContainer}
								responsive={false}/>}
			>
				<VictoryAxis
						name='VictoryAxis'
						crossAxis={false}
						tickValues={tickValues}
						tickFormat={(t) => `${new Date(t).getHours()}:00`}
						style={chartsStyles.VictoryAxis}
						tickLabelComponent={<LabelAxis y={123}/>}
				/>
				{typeY.includes('wind')
						? <VictoryScatter
								name='windChart'
								data={dataXY}
								x='time'
								style={{
									labels: {
										fontFamily: 'Arial, sans-serif',
										fontSize: 12, stroke: undefined
									}
								}}
								labels={({datum}) => getVisualY(datum)}
								dataComponent={<WindArrow dx={15}/>}
								labelComponent={
									<VictoryLabel dx={15} y={35}/>}
						/>
						: <VictoryArea
								name='chart'
								y0={() => minY}
								interpolation={typeY === 'humidity' ? 'step' : 'basis'}
								style={chartsStyles.VictoryArea}
								data={dataXY}
								x='time'
								y={typeY}
								labels={({datum}) => getVisualY(datum)}
								labelComponent={
									<LabelComponent
											y={typeY.includes('temp') ? undefined : 45}
											dx={typeY.includes('temp') ? 8 : 2}
											dy={-10}
									/>
								}
						/>
				}
			</VictoryChart>
	);
};

export default WeatherGraphic;