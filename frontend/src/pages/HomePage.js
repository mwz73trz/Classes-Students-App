import { Component } from "react";
import schoolAPI from "../api/schoolAPI";
import Subjects from "../components/Subjects";

class HomePage extends Component {
  state = {
    subjects: [],
  };

  getSubjects = async () => {
    try {
      let subjectsData = await schoolAPI.getSubjects();
      this.setState({ subjects: subjectsData });
    } catch (error) {
      console.log(error);
    }
  };

  createSubject = async () => {
    try {
      let input = document.getElementById("new-subject-name");
      if (input) {
        let newSubjectParam = {
          name: input.value,
        };
        let data = await schoolAPI.addSubject(newSubjectParam);
        if (data) {
          let newSubjects = [...this.state.subjects, data];
          this.setState({ subjects: newSubjects });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteSubject = async (subjectId) => {
    try {
      if (subjectId > 0) {
        let result = await schoolAPI.deleteSubject(subjectId);
        if (result.success) {
          let newSubjects = this.state.subjects.filter((subject, index) => {
            return subject.id !== subjectId;
          });
          this.setState({ subjects: newSubjects });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getSubjects();
  }

  renderWelcome() {
    let subjectElements = this.state.subjects.map((subject, index) => {
      return (
        <li key={`subject-${index}`}>
          <Subjects subject={subject} handleDelete={this.deleteSubject} />
        </li>
      );
    });
    return (
      <div>
        <h2>Your Subject and Student Manager App</h2>
        <h2>Subjects</h2>
        <ul type="simple-list" style={{ listStyle: "none" }}>
          {subjectElements}
        </ul>
        <hr />
        <input id="new-subject-name" placeholder="new subject" />
        <button onClick={this.createSubject}>Add New Subject</button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        {this.renderWelcome()}
      </div>
    );
  }
}

export default HomePage;
