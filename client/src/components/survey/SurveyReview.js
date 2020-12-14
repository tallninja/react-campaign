import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actions from "../../actions";

class SurveyReview extends Component {
  handleBack = () => {
    return this.props.handleBack();
  };

  handleReviewSubmit = () => {
    this.props.sendSurvey(this.props.surveyForm.values, this.props.history);
  };

  renderRecipients = (emails) => {
    return emails.split(",").map((email) => {
      return <li key={email}>{email.trim()}</li>;
    });
  };

  render() {
    const { title, subject, body, recipients } = this.props.surveyForm.values;
    return (
      <div>
        <h2>Please Review Your Survey Before Sending</h2>
        <div className="ui segment">
          <h3>Title: </h3> {title}
          <h3>Subject: </h3> {subject}
          <h3>Body</h3>
          <div className="ui segment">{body}</div>
          <h3>Recipients:</h3>
          <div className="ui segment">
            <ol className="ui list">{this.renderRecipients(recipients)}</ol>
          </div>
        </div>
        <button
          className="ui teal left floated button"
          onClick={this.handleBack}
        >
          <i className="angle left icon"></i>
          Back
        </button>
        <button
          className="ui green right floated button"
          onClick={this.handleReviewSubmit}
        >
          <i className="paper plane icon"></i>
          Send
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { surveyForm: state.form.surveyForm };
};

export default connect(mapStateToProps, actions)(withRouter(SurveyReview));
