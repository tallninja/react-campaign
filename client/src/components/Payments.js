import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Campaign"
        description="5 email credits"
        amount={500}
        token={(token) => console.log(token)}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
      >
        <button className="ui green button">
          <i className="add icon"></i>
          Add Credits
        </button>
      </StripeCheckout>
    );
  }
}

export default Payments;
