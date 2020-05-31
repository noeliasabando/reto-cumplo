import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import Dates from '../Dates/Dates';
import styles from './HomeContainer.module.scss';
import Chart from '../Chart/Chart';


const HomeContainer = () => {
  const [startDate, setStartDate] = useState(moment().subtract(1, 'month'));
  const [endDate, setEndDate] = useState(moment());
  const [currentDate, setCurrentDate] = useState(moment().subtract(1, 'day'));
  const [dolarPrice, setDolarPrice] = useState();
  const [currentDolarPrice, setCurrentDolarPrice] = useState();

  const parseDate = (startDate, endDate) => {
    startDate = startDate.format('YYYY/MM/') + 'dias_i/' + startDate.format('DD')
    endDate = endDate.format('YYYY/MM/') + 'dias_f/' + endDate.format('DD')

    return `${startDate}/${endDate}`
  }

  const parseDateToday = (currentDate) => {
    currentDate = currentDate.format('YYYY/MM/') + 'dias/' + currentDate.format('DD')

    return `${currentDate}`
  }

  useEffect(() => {
    axios.get(`https://api.sbif.cl/api-sbifv3/recursos_api/dolar/periodo/${parseDate(startDate, endDate)}?apikey=9c84db4d447c80c74961a72245371245cb7ac15f&formato=json`)
      .then((response) => {
        setDolarPrice(response.data.Dolares)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [startDate, endDate])

  useEffect(() => {
    axios.get(`https://api.sbif.cl/api-sbifv3/recursos_api/dolar/${parseDateToday(currentDate)}?apikey=9c84db4d447c80c74961a72245371245cb7ac15f&formato=json`)
      .then((response) => {
        setCurrentDolarPrice(response.data.Dolares)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [currentDate])

  let dataDolar, add, average
  if (dolarPrice) {
    dataDolar = dolarPrice.map((data) => parseInt(data.Valor.split(',')[0]))
    add = dataDolar.reduce((previous, current) => current += previous);
    average = add / dataDolar.length
  }

  const minDolar = Math.min.apply(null, dataDolar)
  const maxDolar = Math.max.apply(null, dataDolar)

  return (
    <React.Fragment>
      <div className={styles.nav}>
        <div className={styles.titlePage}>Valor dólar hoy</div>
      </div>
      <p className={styles.priceToday}>${currentDolarPrice && currentDolarPrice[0].Valor}</p>
      <Dates
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      {dolarPrice &&
        <Chart
          data={dolarPrice}
        />
      }
      {dolarPrice &&
        <div className={styles.containerData}>
          <p className={styles.data}>Valor máximo <FontAwesomeIcon className={styles.iconUp} icon={faArrowUp}/> ${maxDolar}</p>
          <p className={styles.data}>Valor mínimo <FontAwesomeIcon className={styles.iconDown} icon={faArrowDown}/> ${minDolar}</p>
          <p className={styles.data}>Valor promedio ${average.toFixed()}</p>
        </div>
      }
    </React.Fragment>
  )
};
export default HomeContainer;
