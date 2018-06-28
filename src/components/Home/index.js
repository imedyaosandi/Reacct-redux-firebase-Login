import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from '../Session/withAuthorization';
import AgentInfo from "../AgentInfo"
import DriverList, { DriversListLink } from "../DriverList"
import { db } from '../../firebase';
import './index.css';
import { firebaseConnect } from 'react-redux-firebase'

class HomePage extends Component {
  componentDidMount() {
    const { onSetUsers } = this.props;

    db.onceGetUsers().then(snapshot =>
      onSetUsers(snapshot.val())
    );
  }

  render() {
    const { users } = this.props;

    return (
      <div className="hmm">
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        <p> {JSON.stringify(this.props.profile)}</p>
        {this.props.profile ? <AgentInfo agentRefNo={ String(this.props.profile.agentRefNo)} /> : null}
        {this.props.profile ? <DriversListLink agentRefNo={ String(this.props.profile.agentRefNo)} /> : null}
        { !!users && <UserList users={users} /> }
      </div>
    );
  }
}

const UserList = ({ users }) =>
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].name}</div>
    )}
  </div>

const mapStateToProps = (state,  props) => ({
  users: state.userState.users,
  profile: state.firebase.profile,
});

const mapDispatchToProps = (dispatch) => ({
  onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition), 
  firebaseConnect([
    // 'todos' // { path: '/todos' } // object notation
  ]),
  connect(mapStateToProps, mapDispatchToProps),

)(HomePage);
