import emailValidator from "./emailValidator";

const formValidator = (values) => {
  const errors = {};
  errors.recipients = emailValidator(values.recipients || "");
  if (!values.title) errors.title = "Please provide a Title";
  if (!values.subject) errors.subject = "Please provide a subject";
  if (!values.body) errors.body = "Please Enter the survey content";
  if (!values.recipients) errors.recipients = "Please provide recipient(s)";
  return errors;
};

export default formValidator;
