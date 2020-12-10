import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

const Header = () => <h1>Header</h1>;
const Landing = () => <h1>Landing</h1>;
const Surveys = () => <h1>Surveys</h1>;
const SurveyNew = () => <h1>Create Survey</h1>;

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Surveys} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
