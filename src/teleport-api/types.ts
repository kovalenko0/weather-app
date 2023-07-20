export type CitySearchResponse = {
  _embedded: {
    'city:search-results': CitySearchResult[]
  }
  _links: unknown
  count: number
}
export type TeleportCity = {
  _embedded?: {
    'city:timezone': TeleportTimeZone
    'city:urban_area'?: {
      ua_id: string
      _embedded?: {
        'ua:images'?: {
          photos?: {
            attribution: unknown
            image: {
              mobile: string
              web: string
            }
          }[]
          [key: string]: unknown
        }
      }
      [key: string]: unknown
    }
  }
  _links: {
    'city:urban_area': {
      href: string
      name: string
    }
    [key: string]: {
      href: string
      name?: string
    }
  },
  full_name: string
  geoname_id: number,
  name: string,
  population?: number
  location: {
    geohash: string
    latlon: {
      latitude: number
      longitude: number
    }
  }
}
type CitySearchResult = {
  _embedded: {
    'city:item': TeleportCity
  }
  _links: unknown
  matching_alternate_names: {
    name: string
  }[],
  matching_full_name: string
}
type TeleportTimeZone = {
  _embedded: {
    'tz:offsets-now': {
      short_name: string
      [key: string]: unknown
    }
  }
  _links: unknown
  iana_name: string
}