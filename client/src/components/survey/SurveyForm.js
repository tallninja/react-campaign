import _ from "lodash";
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";

import history from "../../history";
import SurveyField from "./SurveyField";

const FIELDS = [
  {
    name: "title",
    fieldType: "text",
    label: "Survey Title",
    placeholder: "Survey Title",
  },
  {
    name: "subject",
    fieldType: "text",
    label: "Subject",
    placeholder: "Survey Subject",
  },
  {
    name: "body",
    fieldType: "textarea",
    label: "Body",
    placeholder: "Enter your survey here...",
  },
  {
    name: "recipients",
    fieldType: "text",
    label: "Recipients",
    placeholder: "john@doe.com, jane@doe.com",
  },
];

class SurveyForm extends Component {
  renderFields = () => {
    return _.map(FIELDS, ({ name, fieldType, label, placeholder }) => {
      return (
        <Field
          key={name}
          name={name}
          component={SurveyField}
          type="text"
          fieldType={fieldType}
          label={label}
          placeholder={placeholder}
        />
      );
    });
  };

  render() {
    return (
      <form
        className="ui form"
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        {this.renderFields()}

        <Link to="/surveys" className="ui red left floated button">
          Cancel
        </Link>

        <button type="submit" className="ui teal right floated button">
          Submit
        </button>
      </form>
    );
  }
}

export default reduxForm({ form: "surveyForm" })(SurveyForm);
