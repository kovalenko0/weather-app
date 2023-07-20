import React, {useRef} from 'react'
import {useCitySearch} from './use-city-search'
import './city-search.css'
import {useNavigate} from 'react-router-dom'

export type Props = {}

export const CitySearch: React.FC<Props> = props => {
  const navigate = useNavigate()
  const search = useCitySearch()
  const now = useRef(new Date())
  return <div className="city-search-page">
    <div className="search-input-wrapper">
      <input
        className="search-input"
        value={search.search}
        onChange={e => search.setSearch(e.target.value)}
        placeholder="Search Locations"
      />
    </div>
    <>{
      search.query.loading && <div>'Loading...'</div>
    }</>
    <>{
      search.query.error && <div>Failed to search: {search.query.error + ''}</div>
    }</>
    <div className="search-results-wrapper">
      <div className="search-results">{
        search.query.result?.map(item => {
          const picture = item.pictures?.photos?.[0].image.mobile
          return <button
              key={item.id}
              className="search-result"
              onClick={() => navigate(`/weather/${item.id}`)}
            >
              <img
                src={picture || '/architecture-and-city.png'}
                className={'search-result-picture ' + (!picture && 'search-result-picture-default')}
                alt={item.fullName}
              />
              <div className="search-result-city-name">
                {item.fullName}
              </div>
              <div className="search-result-city-time">
                {
                  Intl
                    .DateTimeFormat('default', {
                      hour: 'numeric',
                      minute: '2-digit',
                      timeZone: item.timeZone
                    })
                    .format(now.current)
                }
              </div>
            </button>
          }
        )
      }</div>
    </div>
  </div>
}