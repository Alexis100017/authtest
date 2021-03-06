import React from "react";

class Public extends React.Component {
  state = {
    message: "",
  };

  componentDidMount() {
    fetch("/public") //we are telling to go to /public to fetch all data available
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then((response) => this.setState({ message: response.message }))
      .catch((error) => this.setState({ message: error.message }));
  }

  render() {
    return <p>{this.state.message}</p>;
  }
}

export default Public;
