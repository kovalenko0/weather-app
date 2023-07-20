import {weatherLoader, CityWeatherResponse} from './weather-loader'
import fetch from 'jest-mock-fetch'
const nativeFetch = global.fetch
global.fetch = fetch as any
afterAll(() => {
  global.fetch = nativeFetch
})
afterEach(() => {
  fetch.reset()
})

describe(weatherLoader, () => {
  it('groups results by day', async () => {
    const timeStamp = (date: string) => new Date(date).getTime() / 1000
    const response: CityWeatherResponse = {
      location: {} as any,
      weather: {
        list: [
          // day one
          {
            dt: timeStamp('Thu, 20 Jul 2023 00:00:00 GMT'),
            main: { temp: 20 }
          },
          {
            dt: timeStamp('Thu, 20 Jul 2023 03:00:00 GMT'),
            main: { temp: 22 }
          },
          {
            dt: timeStamp('Thu, 20 Jul 2023 06:00:00 GMT'),
            main: { temp: 18 }
          },
          // day two
          {
            dt: timeStamp('Thu, 21 Jul 2023 00:00:00 GMT'),
            main: { temp: 15 }
          },
          {
            dt: timeStamp('Thu, 21 Jul 2023 03:00:00 GMT'),
            main: { temp: 13 }
          },
          // day three
          {
            dt: timeStamp('Thu, 22 Jul 2023 00:00:00 GMT'),
            main: { temp: 10 }
          }
        ]
      } as Partial<CityWeatherResponse['weather']> as any
    }
    fetch.mockResolvedValueOnce({ json: () => response })
    const result = await weatherLoader({ params: { geoname_id: '123' } } as any)
    expect(result.days).toEqual([
      {
        'date': new Date('Thu, 20 Jul 2023 00:00:00 GMT'),
        'items': [
          {
            'dt': 1689811200,
            'interval': 1,
            'main': {
              'temp': 20
            }
          },
          {
            'dt': 1689822000,
            'interval': 2,
            'main': {
              'temp': 22
            }
          },
          {
            'dt': 1689832800,
            'interval': 3,
            'main': {
              'temp': 18
            }
          }
        ],
        'maxTemp': 22,
        'minTemp': 18
      },
      {
        'date': new Date('Thu, 21 Jul 2023 00:00:00 GMT'),
        'items': [
          {
            'dt': 1689897600,
            'interval': 1,
            'main': {
              'temp': 15
            }
          },
          {
            'dt': 1689908400,
            'interval': 2,
            'main': {
              'temp': 13
            }
          }
        ],
        'maxTemp': 15,
        'minTemp': 13
      },
      {
        'date': new Date('Thu, 22 Jul 2023 00:00:00 GMT'),
        'items': [
          {
            'dt': 1689984000,
            'interval': 1,
            'main': {
              'temp': 10
            }
          }
        ],
        'maxTemp': 10,
        'minTemp': 10
      }
    ])
  })
})