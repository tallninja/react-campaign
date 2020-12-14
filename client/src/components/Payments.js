import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";

import * as actions from "../actions";

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Campaign"
        description="5 email credits"
        amount={500}
        token={(token) => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
      >
        <div className="ui left labeled button" tabIndex="0">
          <a className="ui basic right pointing label" href="/#">
            {this.props.credits} credits
          </a>
          <div className="ui green button">
            <i className="plus icon"></i> Add Credits
          </div>
        </div>
      </StripeCheckout>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { credits: auth.credits };
};

export default connect(mapStateToProps, actions)(Payments);
