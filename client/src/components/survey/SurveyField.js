import React, { Component } from "react";

class SurveyField extends Component {
  renderErrorMessage = (meta) => {
    if (meta.touched && meta.error) {
      return (
        <div className="ui error message">
          <p>{meta.error}</p>
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    const { fieldType, label, placeholder, input, type, meta } = this.props;
    switch (fieldType) {
      case "textarea":
        return (
          <div>
            <div
              className={`field ${meta.touched && meta.error ? "error" : ""}`}
            >
              <label>{label}</label>
              <textarea placeholder={placeholder} {...input}></textarea>
            </div>
            {this.renderErrorMessage(meta)}
          </div>
        );
      default:
        return (
          <div>
            <div
              className={`field ${meta.touched && meta.error ? "error" : ""}`}
            >
              <label>{label}</label>
              <input type={type} placeholder={placeholder} {...input} />
            </div>
            {this.renderErrorMessage(meta)}
          </div>
        );
    }
  }
}

export default SurveyField;
