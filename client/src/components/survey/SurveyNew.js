import React, { Component } from "react";
import SurveyForm from "./SurveyForm";

class SurveyNew extends Component {
  handleSubmit = (formValues) => {
    console.log(formValues);
  };

  render() {
    return <SurveyForm onSubmit={this.handleSubmit} />;
  }
}

export default SurveyNew;
