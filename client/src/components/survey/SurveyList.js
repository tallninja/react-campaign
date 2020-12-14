import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../actions";

class SurveyList extends Component {
  componentDidMount = () => {
    this.props.fetchSurveys();
  };

  renderSurveys = (surveys) => {
    switch (surveys) {
      case null:
        return <div className="ui active centered inline loader"></div>;
      case false:
        return <h1>No Surveys Yet :(</h1>;

      default:
        return surveys.reverse().map((survey) => {
          return (
            <div className="item" key={survey._id}>
              <div className="content">
                <div className="header">{survey.title}</div>
                <a className="ui teal right ribbon label">
                  <div>Yes: {survey.yes}</div>
                  <div>No: {survey.no}</div>
                </a>
                {survey.body}
              </div>
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </div>
          );
        });
    }
  };

  render() {
    return (
      <div className="ui attached segment">
        <div className="ui ordered celled list">
          {this.renderSurveys(this.props.surveys)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ surveys }) => {
  return { surveys };
};

export default connect(mapStateToProps, actions)(SurveyList);
