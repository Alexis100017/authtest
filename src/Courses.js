import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

class Courses extends React.Component {
  state = {
    courses: [],
  };

  componentDidMount() {
    fetch("/courses", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }, // When we use `` it means is a string template
      //console.log("Quince es " + (a + b) + " y\nno " + (2 * a + b) + ".");        console.log(`Quince es ${a + b} y\nno ${2 * a + b}.`);
    }) //we are telling to go to /public to fetch all data available
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then((response) => this.setState({ courses: response.courses }))
      .catch((error) => this.setState({ courses: error.message }));
  }
  render() {
    return (
      <ul>
        {this.state.courses.map((course) => (
          <li key={course.key}> {course.tittle}</li>
        ))}
      </ul>
    );
  }
}

export default Courses;
