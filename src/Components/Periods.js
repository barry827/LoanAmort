import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Period from './Period';

class Periods extends Component
{
    render(){
        return (        
        (
            this.props.periods.map( (period) => (
                <Period key={period.id} period={period} />)
            ))        
        )
    }
}

Periods.propTypes = {
    periods: PropTypes.array.isRequired
};

export default Periods;