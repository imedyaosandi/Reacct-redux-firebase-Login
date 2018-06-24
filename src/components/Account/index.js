import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import withAuthorization from '../Session/withAuthorization';
import './index.css';

const AccountPage = ({ authUser }) =>
  <div className="acc">
    <h1>Account: {authUser.email} </h1> 
    <h2> PASSWORD FORGOT </h2>
    <PasswordForgetForm />
    <h2> PASSWORD CHANGE </h2>
    <PasswordChangeForm />
  </div>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(AccountPage);