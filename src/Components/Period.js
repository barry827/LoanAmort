import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Period extends Component{
    render(){
        return (
            <tr>
                <td>{this.props.period.id}</td>
                <td>{this.props.period.previousbalance?.toFixed(2)}</td>
                <td>{this.props.period.payment?.toFixed(2)}</td>
                <td>{this.props.period.principalPaid?.toFixed(2)}</td>
                <td>{this.props.period.interestPaid?.toFixed(2)}</td>
                <td>{this.props.period.newbalance?.toFixed(2)}</td>
            </tr>
        );
    }
}


Period.propTypes = {
    period: PropTypes.object.isRequired
}

export default Period;

