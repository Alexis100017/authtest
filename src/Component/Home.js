import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    //console.log(this.props);
    const { isAuthenticated, login } = this.props.auth;
    return (
      <div>
        <h1>
          {isAuthenticated() ? (
            <Link to="/profile">View profile</Link>
          ) : (
            <button onClick={login}>lOGEUAMOPS</button>
          )}
        </h1>
      </div>
    );
  }
}
export default Home;
