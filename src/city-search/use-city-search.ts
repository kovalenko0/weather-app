import {useDebouncedState} from '../hooks/use-debounced-state'
import {useQuery} from '../hooks/use-query'
import {CitySearchResponse} from '../teleport-api/types'

export function useCitySearch() {
  const [search, setSearch, debouncedSearch] = useDebouncedState('', 1000)
  const references = [
    'city:search-results/city:item/city:urban_area/ua:images',
    'city:search-results/city:item/city:timezone/tz:offsets-now'
  ].join()
  const citySearchQuery = useQuery(
    (_search) => fetch(`https://api.teleport.org/api/cities/?search=${debouncedSearch}&embed=${encodeURIComponent(references)}`)
      .then<CitySearchResponse>(r => r.json())
      .then(r => {
        return r._embedded['city:search-results'].map(item => {
          const city = item._embedded['city:item']
          return ({
            id: city.geoname_id,
            name: city.name,
            fullName: city.full_name,
            pictures: city._embedded?.['city:urban_area']?._embedded?.['ua:images'],
            timeZone: city._embedded?.['city:timezone'].iana_name
          })
        })
      }),
    [debouncedSearch]
  )
  return {
    search,
    setSearch,
    query: citySearchQuery
  }
}