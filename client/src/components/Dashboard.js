import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.fetchSurveys();
  };

  renderSurveys = (surveys) => {
    switch (surveys) {
      case null:
        // return <div class="ui active centered inline loader"></div>;
        return null;
      case false:
        return <h1>No Surveys Yet :(</h1>;

      default:
        surveys.map((survey) => {
          return (
            <div className="ui ordered celled list">
              <div className="item">
                <div className="content">
                  <div className="header">{survey.title}</div>
                  {survey.body}
                </div>
              </div>
            </div>
          );
        });
    }
  };

  render() {
    return (
      <div>
        <div className="ui attached segment">
          {this.renderSurveys(this.props.surveys)}
        </div>
        <Link
          to="/surveys/new"
          class="ui bottom attached green button"
          tabindex="0"
        >
          <i className="plus icon"></i>
          Create Survey
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ surveys }) => {
  return { surveys };
};

export default connect(mapStateToProps, actions)(Dashboard);
