import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Redirect } from "react-router-dom";
import { Home, Profile, Nav, Callback } from "./Component";
import Auth from "./Auth/Auth";
import Public from "./Public";
import Private from "./Private";
import Courses from "./Courses";
class App extends React.Component {
  constructor(props) {
    super(props); //funcional components dont allow constructor
    //   console.log(props);
    this.auth = new Auth(this.props.history); //because in index js, the app component is within a Route component give it special properties like history
  }
  render() {
    return (
      <>
        <Nav auth={this.auth}></Nav>
        <div className="body">
          <Route
            path="/"
            exact // if there is aneed to pass props throw the root app, it is done by adding the render propertie  render={(props) => <Home auth={this.auth} {...props} />}
            render={(props) => <Home auth={this.auth} {...props} />}
          ></Route>
          <Route
            path="/profile"
            render={(props) =>
              this.auth.isAuthenticated() ? (
                <Profile auth={this.auth} />
              ) : (
                <Redirect to="/" />
              )
            }
          ></Route>
          <Route
            path="/callback"
            render={(props) => <Callback auth={this.auth} {...props} />}
          ></Route>
          <Route path="/public" component={Public}></Route>
          <Route
            path="/private"
            render={(props) =>
              this.auth.isAuthenticated() ? (
                <Private auth={this.auth} {...props} />
              ) : (
                this.auth.login
              )
            }
          ></Route>
          <Route
            path="/courses"
            render={(props) => <Courses auth={this.auth} {...props} />}
          ></Route>
        </div>
      </>
    );
  }
}

export default App;
