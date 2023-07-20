import React, {useEffect, useRef} from 'react'
import {Link, useLoaderData} from 'react-router-dom'
import {WeatherLoaderData} from './weather-loader'
import {kelvinToC} from '../units/convertion'
import './weather.css'

const iconUrl = (iconId: string) => `https://openweathermap.org/img/wn/${iconId}.png`
const defaultIcon = '02'

export const Weather: React.FC = () => {
  const convert = kelvinToC
  const units = '°C'
  const temp = (value: number) => convert(value).toFixed(0)
  const {city, days, cityPicture} = useLoaderData() as WeatherLoaderData
  const originalTitle = useRef(window.document.title)

  useEffect(() => {
    if (city.name) window.document.title = `Weather in ${city.name}`
    return () => {
      window.document.title = originalTitle.current
    }
  }, [city.name])

  return <div className="weather">
    <div className="weather-heading">
      <div className="weather-heading-text">
        <span>Weather in </span>
        <span className="weather-heading-city">{city.full_name} </span>
        <Link to="/city" className="weather-heading-city-change-link">(Change)</Link>
        <span> for the next 5 days</span>
      </div>
    </div>
    <div className="forecast-wrapper">
      <div className="forecast">
        {days.map(day =>
          <div
            key={day.date.getTime()}
            className="forecast-day"
          >
            <div className="forecast-day-title">
              <div className="forecast-day-temp-range">
                {temp(day.minTemp)}
                {day.maxTemp !== day.minTemp && `-${temp(day.maxTemp)}`}
                <span className="temp-units">{units}</span>
              </div>
              <div className="forecast-day-weekday">
                {new Intl.DateTimeFormat('default', {
                  weekday: 'long'
                }).format(day.date)}
              </div>
              <div className="forecast-day-date">
                {new Intl.DateTimeFormat('default', {
                  day: 'numeric',
                  month: 'long'
                }).format(day.date)}
              </div>
            </div>
            <div className="forecast-day-items">
              {
                day.items.map(item => {
                  const date = new Date(item.dt * 1000)
                  const condition = item.weather[0]
                  return <div
                    key={item.dt}
                    className="forecast-item"
                    style={{
                      gridColumn: item.interval + 1
                    }}
                  >
                    <div className="forecast-item-icon-wrapper">
                      <img
                        className="forecast-item-icon"
                        title={condition?.description}
                        src={iconUrl(condition?.icon || defaultIcon + item.sys.pod)}
                        alt={condition?.description}
                      />
                      <div className="forecast-item-temp">
                        {temp(item.main.temp)}
                        <span className="temp-units">{units}</span>
                      </div>
                    </div>
                    <div className="forecast-item-time">
                      {Intl.DateTimeFormat('default', {hour: 'numeric', minute: '2-digit'}).format(date)}
                    </div>
                  </div>
                })
              }
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
}