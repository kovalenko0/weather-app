import {LoaderFunction} from 'react-router-dom'
import {TeleportCity} from '../teleport-api/types'

export type WeatherResponse_ = {
  weather: WeatherResponse
  location: TeleportCity
}

type WeatherResponse = {
  cod: string
  message: number
  cnt: number
  list: WeatherResponseItem[]
  city: {
    id: number
    name: string
    coord: {
      lat: number
      lon: number
    }
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
  }
}

type WeatherResponseItem = {
  dt: number
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    sea_level: number
    grnd_level: number
    humidity: number
    temp_kf: number
  }
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  clouds: {
    all: number
  }
  wind: {
    speed: number
    deg: number
    gust: number
  },
  visibility: number
  pop: number
  rain?: {
    '3h': number
  }
  sys: {
    pod: 'd' | 'n'
  },
  dt_txt: string
}

const API_KEY = 'a4e3edb428bf75326bc37d0fcf6dd1a6'

export type WeatherLoaderData = {
  city: TeleportCity
  cityPicture?: string
  weather: WeatherResponse
  days: {
    date: Date,
    items: (WeatherResponseItem & { interval: number })[]
    minTemp: number
    maxTemp: number
  }[]
}

export const weatherLoader: LoaderFunction = async (params) => {
  const cityId = params.params.geoname_id
  const { weather, location } = await fetch(`/api/weather/${cityId}`)
    .then<WeatherResponse_>(r => r.json())
  const days: WeatherLoaderData['days'] = []
  for (const item of weather.list) {
    const date = new Date(item.dt * 1000)
    const interval = Math.floor(date.getHours() / 3)
    const temp = item.main.temp
    let day = days.find(d => d.date.toDateString() === date.toDateString())
    if (!day) {
      day = {
        date,
        items: [],
        minTemp: temp,
        maxTemp: temp,
      }
      days.push(day)
    }
    day.minTemp = Math.min(day.minTemp, temp)
    day.maxTemp = Math.max(day.maxTemp, temp)
    day.items.push({
      ...item,
      interval
    })
  }
  return {
    city: location,
    cityPicture: location._embedded?.['city:urban_area']?._embedded?.['ua:images']?.photos?.[0]?.image.web,
    weather,
    days
  }
}