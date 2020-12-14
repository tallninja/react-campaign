import React, { Component } from "react";
import { Link } from "react-router-dom";

import SurveyList from "./survey/SurveyList";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <SurveyList />
        <Link
          to="/surveys/new"
          className="ui bottom attached grey button"
          tabIndex="0"
        >
          <i className="plus icon"></i>
          Create Survey
        </Link>
      </div>
    );
  }
}

export default Dashboard;
