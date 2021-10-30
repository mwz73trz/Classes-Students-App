import { Component } from "react";
import { Link } from "react-router-dom";
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

  addStudent = async () => {
    try {
      let inputFirsName = document.getElementById("new-student-first_name");
      let inputLastName = document.getElementById("new-student-last_name");
      if (inputFirsName && inputLastName) {
        let newStudentParams = {
          subject: this.state.subject.id,
          first_name: inputFirsName.value,
          last_name: inputLastName.value,
          pass_fail: true,
        };
        let data = await schoolAPI.addStudent(newStudentParams);
        if (data) {
          this.getSubject();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getSubject();
  }

  renderStudents() {
    let studentElements = this.state.subject.students.map((student, index) => {
      return (
        <li key={`student-${index}`}>
          <Link
            to={`/subjects/${this.state.subject.id}/students/${student.id}`}
          >
            {student.first_name} {student.last_name}
          </Link>
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
        <hr />
        <input id="new-student-first_name" placeholder="first name" />
        <input id="new-student-last_name" placeholder="last name" />
        <button onClick={this.addStudent}>Add New Student</button>
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
