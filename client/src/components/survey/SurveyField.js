import React, { Component } from "react";

class SurveyField extends Component {
  render() {
    const { fieldType, label, placeholder, input, type } = this.props;
    switch (fieldType) {
      case "textarea":
        return (
          <div className="field">
            <label>{label}</label>
            <textarea placeholder={placeholder} {...input}></textarea>
          </div>
        );
      default:
        return (
          <div className="field">
            <label>{label}</label>
            <input type={type} placeholder={placeholder} {...input} />
          </div>
        );
    }
  }
}

export default SurveyField;
