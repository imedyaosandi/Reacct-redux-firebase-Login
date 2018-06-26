import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types'
import { firebaseConnect, isLoaded, isEmpty, getVal } from 'react-redux-firebase'

class DriverList extends Component {

    render() {
        return <div> Agent  Info({this.props.agentRefNo}) :  {JSON.stringify(this.props.drivers)}</div>
    }

}

DriverList.propTypes = {
    agentRefNo: PropTypes.string
}

const mapStateToProps = ({ firebase }, props) => ({
    drivers: getVal(firebase, `data/driverRegistrations`),
    ...props
});

const mapDispatchToProps = (dispatch) => ({
});

export default compose(
    firebaseConnect((props) => {
        console.log("Props 13", props)
        return [
            {
                path: `driverRegistrations`,
                queryParams: ['orderByChild=agentRefNo', `startAt=1`]
            }
        ]
    }),
    connect(mapStateToProps, mapDispatchToProps),

)(DriverList);