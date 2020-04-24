import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";
import { Home, Profile, Nav, Callback } from "./Component";
import Auth from "./Auth/Auth";

class App extends React.Component {
  constructor(props) {
    super(props); //funcional components dont allow constructor
    //   console.log(props);
    this.auth = new Auth(this.props.history); //because in index js, the app component is within a Route component give it special properties like history
  }
  render() {
    return (
      <>
        <Nav></Nav>
        <div className="body">
          <Route
            path="/"
            exact // if there is aneed to pass props throw the root app, it is done by adding the render propertie  render={(props) => <Home auth={this.auth} {...props} />}
            render={(props) => <Home auth={this.auth} {...props} />}
          ></Route>
          <Route path="/profile" component={Profile}></Route>
          <Route
            path="/callback"
            render={(props) => <Callback auth={this.auth} {...props} />}
          ></Route>
        </div>
      </>
    );
  }
}

export default App;
