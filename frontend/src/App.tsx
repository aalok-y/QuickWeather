import { RecoilRoot } from "recoil";
import "./App.css";
import Home from "./Home";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RecoilRoot>
        <Home />
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
