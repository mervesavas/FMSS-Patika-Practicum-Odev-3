import React from 'react'
import dayjs from "dayjs";
import 'dayjs/locale/tr'

const CardComponents = ({item, className, onClick}) => {
    const weekday = dayjs(item.dt*1000).locale('tr').format('ddd'); // günlerin kısaltılmış hali
    const minTemp = Math.round(item.minTemp) //en düşük sıcaklık
    const maxTemp = Math.round(item.maxTemp) //en yüksek sıcaklık
    return (
        <li key={item.dt_txt} className={className} onClick={onClick}>
            <img className="day-icon"  alt=""
                 src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            />
            <span className="day-name">{weekday}</span>
            <span className="day-temp">{maxTemp}°C</span>
            <span className="day-temp">{minTemp}°C</span>

        </li>
    );
}

export default CardComponents;
