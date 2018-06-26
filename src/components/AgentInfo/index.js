import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types'
import { firebaseConnect, isLoaded, isEmpty, getVal } from 'react-redux-firebase'

class AgentInfo extends Component {

    render() {
        return <div> Agent  Info({this.props.agentRefNo}) :  {JSON.stringify(this.props.agent)}</div>
    }

}

AgentInfo.propTypes = {
    agentRefNo: PropTypes.string
}


const mapStateToProps = ({ firebase }, props) => ({
    agent: getVal(firebase, `data/agents/registrations/${props.agentRefNo}`),
    ...props
});

const mapDispatchToProps = (dispatch) => ({
});

const authCondition = (authUser) => !!authUser;

export default compose(
    // withAuthorization(authCondition),
    firebaseConnect((props) => {
        console.log("Props 12", props)
        return [
            { path: `agents/registrations/${props.agentRefNo}` }
        ]
    }),
    connect(mapStateToProps, mapDispatchToProps),

)(AgentInfo);