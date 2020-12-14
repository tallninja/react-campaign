import _ from "lodash";
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";

import formValidator from "../../utils/formValidator";
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
      <div>
        <h1>Create Your Survey</h1>
        <form
          className="ui form error"
          onSubmit={this.props.handleSubmit(this.props.onSubmit)}
        >
          {this.renderFields()}
          <div style={{ marginTop: "10px" }}>
            <Link to="/surveys" className="ui red left floated button">
              <i className="reply icon"></i>
              Cancel
            </Link>

            <button type="submit" className="ui teal right floated button">
              Next
              <i className="angle right icon"></i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  validate: formValidator,
  destroyOnUnmount: false,
  form: "surveyForm",
})(SurveyForm);
