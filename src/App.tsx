import React ,{useState,useEffect}from "react";
import CityTable from "./components/CityTable";
import { BrowserRouter , Route,Routes } from "react-router-dom";
import CityWeather from "./components/CityWeather";

// App.tsx
function App() {

  return <>
 <BrowserRouter>
      <Routes>
      <Route path="/"  element={<CityTable />}/>
      <Route path="/rooms/new" element={<CityWeather/>}/>
      </Routes>
  </BrowserRouter>
  </>
};

export default App;
