import { Component } from "react";
import { Link } from "react-router-dom";

class Subjects extends Component {
  render() {
    return (
      <span>
        <Link to={`/subjects/${this.props.subject.id}`}>
          {this.props.subject.name}
        </Link>
      </span>
    );
  }
}

export default Subjects;
