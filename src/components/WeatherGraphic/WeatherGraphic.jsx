import React, {useEffect, useState} from 'react';
import {VictoryArea, VictoryAxis, VictoryChart, VictoryContainer, VictoryLabel, VictoryScatter} from "victory";
import {useDispatch, useSelector} from "react-redux";
import {getArrHours, getMinY, getXY, setCurrUpdTime, setSlideGraphics, setType} from "../../store/graphSlice";
import WindArrow from "./WindArrow";
import LabelAxis from "./LabelAxis";
import useGraphics from "../../hooks/useGraphics";
import LabelComponent from "./LabelComponent";

const WeatherGraphic = () => {

	const {data} = useSelector(state => state.data)
	const {dataXY, slideGraphicsPx, typeY, tickValues, minY} =
			useSelector(state => state.graphics)
	const {isMetric} = useSelector(state => state.currWeather)
	const dispatch = useDispatch()
	const {getVisualY, chartsStyles} = useGraphics()

	useEffect(() => {
		dispatch(getXY({data}))
		dispatch(setCurrUpdTime({data}))
		dispatch(getArrHours())
		dispatch(setSlideGraphics(data.current.last_updated))
	}, [data])

	useEffect(() => {
		if (typeY.includes('temp')) {
			dispatch(setType(`${isMetric ? 'temp_c' : 'temp_f'}`))
		}
		if (typeY.includes('wind')) {
			dispatch(setType(`${isMetric ? 'wind_kph' : 'wind_mph'}`))
		}
	}, [isMetric])

	useEffect(() => {
		dispatch(getMinY())
	},[dataXY])

	return (
			<VictoryChart
					width={1925}
					height={125}
					padding={{bottom: 20, top: 25, left: 0, right: 0}}
					domainPadding={{y: [15, 25]}}
					containerComponent={
						<VictoryContainer
								style={{
									transform: `translateX(-${slideGraphicsPx}px)`,
									transition: 'all 1000ms cubic-bezier(.51,-0.17,0,1)'
								}}
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
										fontFamily: '"Arial", sans-serif',
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