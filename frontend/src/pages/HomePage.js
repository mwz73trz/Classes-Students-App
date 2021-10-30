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

  componentDidMount() {
    this.getSubjects();
  }

  renderWelcome() {
    let subjectElements = this.state.subjects.map((subject, index) => {
      return (
        <li key={`subject-${index}`}>
          <Subjects subject={subject} />
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
