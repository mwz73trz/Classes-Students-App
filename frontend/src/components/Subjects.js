import { Component } from "react";
import { Link } from "react-router-dom";

class Subjects extends Component {
  render() {
    return (
      <span>
        <Link to={`/subjects/${this.props.subject.id}`}>
          {this.props.subject.name}
        </Link>
        <button onClick={() => this.props.handleDelete(this.props.subject.id)}>
          Delete
        </button>
      </span>
    );
  }
}

export default Subjects;
