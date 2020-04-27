import React from "react";
import { response } from "express";

class Public extends React.Component {
  state = {
    message: "",
  };
  componentDidMount() {
    fetch("/public")
      .then((response) => {
        if (response.ok) return response.json;
        throw new Error("Network response was not ok.");
      })
      .then((response) => this.setState({ message: response.message }))
      .catch((error) => this.setState({ message: error.message }));
  }
  render() {
    return <h1>{this.state.message}</h1>;
  }
}

export default Public;
