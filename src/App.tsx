import React from "react";
import CityTable from "./components/CityTable";
import { BrowserRouter , Route,Routes } from "react-router-dom";
import CityWeather from "./components/CityWeather";
import 'bootstrap/dist/css/bootstrap.css';

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
