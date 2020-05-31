import React from 'react';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './Dates.module.scss';

const Dates = ({ startDate, endDate, setStartDate, setEndDate }) => {
  return (
    <React.Fragment>
      <div className={styles.container}>
        <p className={styles.text}>Desde</p>
        <DatePicker
          selected={new Date(startDate.format())}
          onChange={date => setStartDate(moment(date))}
          dateFormat="yyyy/MM/dd"
          selectsStart
          startDate={new Date(startDate.format())}
          endDate={new Date(endDate.format())}
        />
        <p className={styles.text}>al</p>
        <DatePicker
          selected={new Date(endDate.format())}
          onChange={date => setEndDate(moment(date))}
          dateFormat="yyyy/MM/dd"
          selectsEnd
          startDate={new Date(startDate.format())}
          endDate={new Date(endDate.format())}
          minDate={new Date(startDate.format())}
        />
      </div>
    </React.Fragment>
  )
};
export default Dates;