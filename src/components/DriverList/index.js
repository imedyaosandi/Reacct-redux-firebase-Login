import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import * as routes from '../../constants/routes';
import {
    Link,
    withRouter,
  } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty, getVal } from 'react-redux-firebase'


  
class DriverList extends Component {

    render() {
        return (
            <div >
                <h2>Your Driver List </h2>
                <br />
                ({this.props.agentRefNo}) :  {JSON.stringify(this.props.drivers)}
            </div>
        
        
        )
    }

}

DriverList.propTypes = {
    agentRefNo: PropTypes.string
}

const mapStateToProps = ({ firebase }, props) => ({
    drivers: getVal(firebase, `ordered/driverRegistrations`),
    ...props
});

const mapDispatchToProps = (dispatch) => ({
});

const DriversListLink = (props) =>
  <p>
    {' '}
    <Link to={routes.DRIVERS}> Your Drivers List</Link>
  </p>

export default compose(
    firebaseConnect((props) => {
        console.log("Props 13", props)
        return [
            {
                path: `driverRegistrations`,
                queryParams: ['orderByChild=agentRefNo','equalTo=1']
            }
        ]
    }),
    connect(mapStateToProps, mapDispatchToProps),

)(DriverList);

export{
    DriversListLink,
}