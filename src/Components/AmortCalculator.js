import React, {Component} from 'react';
import Periods from './Periods';
import CriteriaPanel from './CriteriaPanel';
import ErrorPanel from './ErrorPanel';
import {Table} from 'react-bootstrap';

class AmortCalculator extends Component{

  constructor(props){
    super(props);

    this.state = {
      periods: [
        
      ]
    };    
  }

    CalcuatePeriodsByTerm = (loanAmount, rate, term) => {

      var calcPeriods = [];

      let newAmount = parseFloat(loanAmount);
      let loanTerm = parseInt(term);

      let errorMessage = '';

      let monthlyPayment = loanAmount/((Math.pow((1+(rate*.01/12)), loanTerm))-1)*((rate*.01/12)*Math.pow((1+(rate*.01/12)), loanTerm));
      if (isNaN(monthlyPayment)){
        errorMessage = 'Invalid criteria resulted in loan that could not be calculated or loan that does not terminate.';      
      }
      else
      {
        for (var i=1; i <= loanTerm; i++ ){
          let interest = newAmount*rate*.01/12;
          calcPeriods.push({
            id: i,
            previousbalance: newAmount,
            payment: monthlyPayment,
            principalPaid: monthlyPayment - interest,
            interestPaid: interest,
            newbalance: newAmount = (newAmount + interest - monthlyPayment)
          });
        }  
      }      

      return {
        periods: calcPeriods,
        errorMessage:  errorMessage
      };
    }

    CalculatePeriodsByMonthlyPayment = (loanAmount, rate, monthlyPayment) => {
      var calcPeriods = [];
      let newAmount = parseFloat(loanAmount);
      let loanTerm = -1*Math.log( 1- (loanAmount*rate*.01/(12*monthlyPayment)) )/Math.log(1+(rate*.01/12));

      let errorMessage = '';

      if (isNaN(loanTerm)){
        errorMessage = 'Invalid criteria resulted in loan that could not be calculated or loan that does not terminate.'        
      }
      else{
        for (var i=1; i <= loanTerm; i++ ){
          let interest = newAmount*rate*.01/12;
          calcPeriods.push({
            id: i,
            previousbalance: newAmount,
            payment: monthlyPayment,
            principalPaid: monthlyPayment - interest,
            interestPaid: interest,
            newbalance: newAmount = (newAmount + interest - monthlyPayment)
          });
        }         
      } 

      return {
        periods: calcPeriods,
        errorMessage: errorMessage
      }
    }


    CalculatePeriods = (criteria) => {
        var loanAmount = criteria.loanAmount;
        var rate = parseFloat(criteria.interestRate);
        
        let results = null;

        if (criteria.loanTerm !== '')
        {
          var term = parseInt(criteria.loanTerm); 
          results = this.CalcuatePeriodsByTerm(loanAmount, rate, term);         

          
          
        }
        else{
          var payment = parseFloat(criteria.monthlyPayment);
          results = this.CalculatePeriodsByMonthlyPayment(loanAmount, rate, payment);        
        }

        this.setState(
          { errorMessage: results.errorMessage,
            periods: results.periods
          }
        );
        
    };  

    render(){
        return (
            <div>
            <h1>Simple Loan Amortization Calculator</h1>
            <ErrorPanel errorMessage={this.state.errorMessage}/>
            <CriteriaPanel CalculatePeriods={this.CalculatePeriods}/>
            <Table striped bordered hover size="sm"> 
            <thead>
                <tr>
                    <th>Period</th>
                    <th>Previous Balance</th>
                    <th>Payment</th>
                    <th>Principal</th>
                    <th>Interest</th>
                    <th>New Balance</th>
                </tr> 
            </thead>
            <tbody>
                <Periods periods={this.state.periods}></Periods>
            </tbody>            
           </Table>
           </div>         
        );
    }

    componentDidMount() {
        
    }

}

export default AmortCalculator;

