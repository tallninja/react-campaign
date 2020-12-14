import React, { Component } from "react";
import { reduxForm } from "redux-form";

import SurveyForm from "./SurveyForm";
import SurveyReview from "./SurveyReview";

class SurveyNew extends Component {
  state = { showReviewForm: false };

  handleFormSubmit = (formValues) => {
    this.setState({ showReviewForm: true });
  };

  renderContent = () => {
    if (this.state.showReviewForm) {
      return (
        <SurveyReview
          handleBack={() => this.setState({ showReviewForm: false })}
        />
      );
    } else {
      return <SurveyForm onSubmit={this.handleFormSubmit} />;
    }
  };

  render() {
    return this.renderContent();
  }
}

export default reduxForm({ form: "surveyForm" })(SurveyNew);
