import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";
import { Home, Profile, Nav } from "./Component";
function App() {
  return (
    <>
      <Nav></Nav>
      <div className="body">
        <Route path="/" exact component={Home}></Route>
        <Route path="/profile" component={Profile}></Route>
      </div>
    </>
  );
}

export default App;
