import { atom } from "recoil";


export interface WeatherResponse {
    location: Location;
    current: CurrentWeather;
  }
  
  interface Location {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  }
  
  interface CurrentWeather {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: Condition;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
    air_quality: AirQuality
  }
  
  interface Condition {
    text: string;
    icon: string;
    code: number;
  }

  export interface AirQuality {
    "co": number;
    "no2": number;
    "o3": number;
    "so2": number;
    "pm2_5": number;
    "pm10": number;
    "us-epa-index": number;
    "gb-defra-index": number;
  }
  

  
  

export const locationAtom = atom({
    key : "location",
    default: "ip:auto"
})

export const themeAtom = atom({
    key: "theme",
    default: "light"
})

export const currentWeatherAtom = atom<WeatherResponse >({
    key: "currentWeather",
    default: undefined
})

export const timeAtom = atom({
    key: "time",
    default: ""
})


export const airQualityAtom = atom<string | undefined>({
    key: "airQuality",
    default: undefined
})

export const searchAtom = atom<string>({
  key: "search",
  default: ""
})