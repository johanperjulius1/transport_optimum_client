import React from "react";
import RouteForm from "./components/RouteForm";
import Map from './components/Map'
import Navbar from "./components/NavBar";

const App = () => {
  return (
    <>
    <Navbar/>
    <RouteForm />
    <Map />
    </>
  )
};

export default App;
