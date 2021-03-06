import "./App.css";
import { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SubjectStudentsPage from "./pages/SubjectStudentsPage";
import StudentDetailPage from "./pages/StudentDetailPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route path="/" exact component={HomePage} />
            <Route
              path="/subjects/:subjectId"
              exact
              component={SubjectStudentsPage}
            />
            <Route
              path="/subjects/:subjectId/students/:studentId"
              exact
              component={StudentDetailPage}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
