import React from "react";

class Private extends React.Component {
  state = {
    message: "",
  };

  componentDidMount() {
    fetch("/private", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }, // When we use `` it means is a string template
      //console.log("Quince es " + (a + b) + " y\nno " + (2 * a + b) + ".");        console.log(`Quince es ${a + b} y\nno ${2 * a + b}.`);
    }) //we are telling to go to /public to fetch all data available
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

export default Private;
