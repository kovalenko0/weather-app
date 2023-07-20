import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import {RecoilRoot} from 'recoil'
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom'
import {Root} from './components/root'
import {CitySearch} from './city-search/city-search'
import {Weather} from './weather/weather'
import {weatherLoader} from './weather/weather-loader'
import {ErrorPage} from './components/error-page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage error="An error has occured" />,
    children: [
      {
        index: true,
        element: <Navigate to="/city" replace={true} />
      },
      {
        path: 'city/',
        element: <CitySearch />
      },
      {
        path: 'weather/:geoname_id',
        loader: weatherLoader,
        element: <Weather />,
        errorElement: <ErrorPage error="Failed to load weather" />
      }
    ]
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
