import React, {Component} from 'react';
import Periods from './Periods';
import CriteriaPanel from './CriteriaPanel';
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
      let monthlyPayment = loanAmount/((Math.pow((1+(rate*.01/12)), loanTerm))-1)*((rate*.01/12)*Math.pow((1+(rate*.01/12)), loanTerm));
      
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

      return calcPeriods;
    };

    CalculatePeriodsByMonthlyPayment = (loanAmount, rate, monthlyPayment) => {
      var calcPeriods = [];
      let newAmount = parseFloat(loanAmount);
      let loanTerm = -1*Math.log( 1- (loanAmount*rate*.01/(12*monthlyPayment)) )/Math.log(1+(rate*.01/12));

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

      return calcPeriods;
    }


    CalculatePeriods = (criteria) => {
        console.log('Calculating periods');
        var loanAmount = criteria.loanAmount;
        var rate = parseFloat(criteria.interestRate);                

        if (criteria.loanTerm !== '')
        {
          var term = parseInt(criteria.loanTerm);          

          this.setState(
            {periods: this.CalcuatePeriodsByTerm(loanAmount, rate, term)}
          );
          
        }
        else{
          var payment = parseFloat(criteria.monthlyPayment);
          this.setState(
            {periods: this.CalculatePeriodsByMonthlyPayment(loanAmount, rate, payment)}
          );  

          //console.log('term not set');
        }
        
    };  

    render(){
        return (
            <div>
            <h1>Simple Loan Amortization Calculator</h1>
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
        console.log('I was triggered during componentDidMount')
    }

}

export default AmortCalculator;

