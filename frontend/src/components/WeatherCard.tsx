import { CloudMoon, Wind } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import axios from "axios";
import { currentWeatherAtom,timeAtom, airQualityAtom, searchAtom} from "@/Atoms";
import { useRecoilState } from "recoil";
import { currentTime } from "@/utils";
import { AirQuality } from "@/Atoms";


const WeatherCard = () => {

    const [weatherData, setWeatherData] = useRecoilState(currentWeatherAtom);
    const [time, setTime] = useRecoilState(timeAtom);
    const [airQuality, setAirQuality] = useRecoilState(airQualityAtom);
    const [searchTerm, setSearchTerm] = useRecoilState(searchAtom);
    const apiServer = import.meta.env.VITE_SERVER;

    function getAirQualityStatus(data: AirQuality ): string {
      const usEpaIndex = data["us-epa-index"];
    
      if (usEpaIndex <= 3) {
        return "Good";
      } else if (usEpaIndex <= 5) {
        return "Moderate";
      } else if (usEpaIndex <= 7) {
        return "Unhealthy for Sensitive Groups";
      } else if (usEpaIndex <= 10) {
        return "Unhealthy";
      }
    
      return "Unknown";  // Just in case the index is out of range
    }
    

    useEffect(()=>{
        (async function(){
            try{
              
              const searchQuery: string = searchTerm ? searchTerm : "auto:ip"
              console.log("search: ",searchQuery);
              console.log("apiServer:  ",apiServer);
            const fetchurl =  `${apiServer}/current?location=${searchQuery}`
            console.log("fetchUrl: ",fetchurl);
            
            const res = await axios.get(fetchurl);
            setWeatherData(res.data)
            // console.log(res.data.current.air_quality);
            
            const air =  getAirQualityStatus(res.data.current.air_quality)
            setAirQuality(air) 
            }catch(e){
                console.log("error fetching: ",e);
            }
            
        })()
        console.log("weatherData: ",weatherData);

        const currTime =  currentTime();
        setTime(currTime);
    },[searchTerm,setAirQuality,setWeatherData])

    useEffect(()=>{
      const intervalId = setInterval(() => {
        const currTime = currentTime();
        setTime(currTime);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };

    },[time])

    




  return (
    <Card className="w-full max-w-md p-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-medium text-muted-foreground uppercase">Current Weather</h2>
        <span className="text-sm text-muted-foreground">{time}</span>
      </div >
      <div className="flex">
        <div>
          {weatherData && <h3>{`${weatherData?.location.name}, ${weatherData?.location.region}, ${weatherData?.location.country}`}</h3>}
        </div>

      </div>
      
      <div className="flex items-start gap-4 mb-6">
        {/* <CloudMoon className="w-12 h-12 text-muted-foreground" /> */}
        <img src={`https:${weatherData?.current.condition.icon}`} alt="img" />
        <div>
          <div className="flex items-start">
            <span className="text-6xl font-semibold text-foreground">{`${weatherData?.current.temp_c}°`}</span>
            <span className="text-lg text-muted-foreground mt-1">C</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">{`RealFeel ${weatherData?.current.feelslike_c}°`}</span>
            <div className="flex items-center gap-1">
              <span className="text-foreground">{weatherData?.current.condition.text}</span>
              {/* <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                MORE DETAILS
              </button> */}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Wind className="w-5 h-5 text-muted-foreground" />
            <span className="text-muted-foreground">Wind</span>
          </div>
          <span className="text-foreground">{`${weatherData?.current.wind_dir} ${weatherData?.current.wind_kph} km/h`}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Wind className="w-5 h-5 text-muted-foreground" />
            <span className="text-muted-foreground">Wind Gusts</span>
          </div>
          <span className="text-foreground">{`${weatherData?.current.gust_kph} km/h`}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Air Quality</span>
          <span className="text-destructive font-medium">{airQuality}</span>
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;