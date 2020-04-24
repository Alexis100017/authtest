import React from "react";

class Home extends React.Component {
  render() {
    //console.log(this.props);
    return (
      <div>
        <h1>
          <button onClick={this.props.auth.login}>lOGEUAMOPS</button>
        </h1>
      </div>
    );
  }
}
export default Home;
