import { Component } from "react";
import schoolAPI from "../api/schoolAPI";

class StudentDetailPage extends Component {
  static MODE_TYPE = {
    VIEW: 1,
    UPDATE: 2,
  };

  state = {
    student: null,
    mode: StudentDetailPage.MODE_TYPE.VIEW,
  };

  async getStudent() {
    try {
      let studentId = this.props.match.params.studentId;
      let studentData = await schoolAPI.getStudentById(studentId);
      if (studentData) {
        this.setState({ student: studentData });
      }
    } catch (error) {
      console.log(error);
    }
  }

  changeMode = (newMode) => {
    this.setState({ mode: newMode });
  };

  updateStudent = async () => {
    try {
      let inputFirstName = document.getElementById("student-first_name");
      let inputLastName = document.getElementById("student-last_name");
      let inputPassFail = document.getElementById("student-pass_fail");

      let studentId = this.state.student.id;
      if (inputFirstName && inputLastName && inputPassFail && studentId > 0) {
        let updatedStudent = {
          subject: this.state.student.subject,
          first_name: inputFirstName.value,
          last_name: inputLastName.value,
          pass_fail: inputPassFail.checked,
        };
        let data = await schoolAPI.updateStudent(studentId, updatedStudent);
        if (data) {
          this.setState({ student: data });
          this.changeMode(StudentDetailPage.MODE_TYPE.VIEW);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteStudent = async () => {
    try {
      let subjectId = this.state.student.subject;
      let studentId = this.state.student.id;
      if (studentId > 0) {
        let result = await schoolAPI.deleteStudent(studentId);
        if (result.success) {
          this.props.history.push(`/subjects/${subjectId}/`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getStudent();
  }

  renderStudent() {
    if (!this.state.student) {
      return <p>No Student Found!</p>;
    }
    if (this.state.mode === StudentDetailPage.MODE_TYPE.UPDATE) {
      return (
        <div>
          <div>
            <h1 className="nonbreak">First Name: </h1>
            <input
              id="student-first_name"
              placeholder="first name"
              defaultValue={this.state.student.first_name}
            />
          </div>
          <div>
            <h1 className="nonbreak">Last Name: </h1>
            <input
              id="student-last_name"
              placeholder="last name"
              defaultValue={this.state.student.last_name}
            />
          </div>
          <div>
            <h1 className="nonbreak">Pass: </h1>
            <input
              id="student-pass_fail"
              type="checkbox"
              defaultChecked={this.state.student.first_name}
            />
          </div>
          <br />
          <button onClick={this.updateStudent}>Save</button>
          <button
            onClick={() => this.changeMode(StudentDetailPage.MODE_TYPE.VIEW)}
          >
            Cancel
          </button>
        </div>
      );
    }
    return (
      <div>
        <h1>
          Student: {this.state.student.first_name}{" "}
          {this.state.student.last_name}
        </h1>
        <h3>Pass: {this.state.student.pass_fail ? "YES" : "NO"}</h3>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Student Page</h1>
        {this.renderStudent()}
        <hr />
        <button
          onClick={() => this.changeMode(StudentDetailPage.MODE_TYPE.UPDATE)}
        >
          Update
        </button>
        <button onClick={this.deleteStudent}>Delete</button>
      </div>
    );
  }
}

export default StudentDetailPage;
