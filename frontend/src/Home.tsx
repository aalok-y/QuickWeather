import { ModeToggle } from "./components/mode-toggle";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      {/* <ModeToggle /> */}
      <SearchBar/>
      <WeatherCard/>
    </div>
  );
}

export default Home;
