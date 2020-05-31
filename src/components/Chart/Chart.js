import React from 'react'
import styles from './Chart.module.scss';
import '../../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis} from 'react-vis';

const Chart = ({ data }) => {
  return (
    <div className={styles.containerChart}>
      <XYPlot
        height={400} 
        width={1000} 
        xType='time' 
        getX={d => new Date(d.Fecha)}
        getY={d => parseInt(d.Valor.split(',')[0])}>

        <XAxis 
          title='Fecha'
          tickSizeOuter={10}
          tickLabelAngle={-45}
          />
        <YAxis/>
        <VerticalGridLines/>
        <HorizontalGridLines/>

        <LineSeries data={data} />
      </XYPlot>
    </div>
  );
}

export default Chart