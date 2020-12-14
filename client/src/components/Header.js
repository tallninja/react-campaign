import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";
import Payments from "./Payments";

class Header extends Component {
  renderAuthContent = () => {
    switch (this.props.auth) {
      case null:
        return (
          <a className="ui item" href="/#">
            <div className="ui active tiny centered inline loader"></div>
          </a>
        );
      case false:
        return (
          <a className="ui item" href="/auth/google">
            <button className="ui google plus button">
              <i className="google icon"></i>
              Login
            </button>
          </a>
        );
      default:
        return [
          <Payments className="ui item" key="1" />,
          <a className="ui item" href="/auth/logout" key="2">
            <i className="sign-out icon"></i>
            Logout
          </a>,
        ];
    }
  };

  render() {
    return (
      <div className="ui secondary pointing menu">
        <Link to={this.props.auth ? "/surveys" : "/"} className="active item">
          Home
        </Link>
        <div className="right menu">{this.renderAuthContent()}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, actions)(Header);
