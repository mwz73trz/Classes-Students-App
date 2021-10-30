import { Component } from "react";
import schoolAPI from "../api/schoolAPI";

class SubjectStudentsPage extends Component {
  state = {
    subject: null,
  };

  async getSubject() {
    try {
      let subjectId = this.props.match.params.subjectId;
      let subjectData = await schoolAPI.getSubjectById(subjectId);
      if (subjectData) {
        this.setState({ subject: subjectData });
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getSubject();
  }

  renderStudents() {
    let studentElements = this.state.subject.students.map((student, index) => {
      return (
        <li key={`student-${index}`}>
          {student.first_name} {student.last_name}
        </li>
      );
    });
    return (
      <ul type="simple-list" style={{ listStyle: "none" }}>
        {studentElements}
      </ul>
    );
  }

  renderSubject() {
    if (!this.state.subject) {
      return <p>No Students Found!</p>;
    }
    return (
      <div>
        <h1>{this.state.subject.name}</h1>
        {this.renderStudents()}
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Students Page</h1>
        {this.renderSubject()}
      </div>
    );
  }
}

export default SubjectStudentsPage;
