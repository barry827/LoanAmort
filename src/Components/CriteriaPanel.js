import React, { Component } from "react";
import SimpleReactValidator from 'simple-react-validator';

/*
const required = (value) => {
    if (!value.toString().trim().length) {
      // We can return string or jsx as the 'error' prop for the validated Component
      return 'required';
    }
};

const currency = (value) => {
    if (value.toString().trim().length && !validator.isCurrency(value.toString().trim(), {allow_negatives: false}))
    {
        return "value must be a valid dollar amount";
    }
}

const integer = (value) => {
    if (value.toString().trim().length && !validator.isInt(value.toString().trim()))
    {
        return "value must be entered as an integer";
    }    
}

const rate = (value) => {
    if (value.toString().trim().length && !validator.isFloat(value.toString().trim(), {min:0.00, max: 100.00} ))
    {
        return "value must be entred as a decimal number between 0.00 and 100.00";
    }
}
*/

const defaultRate = '2.99';
const defaultTerm = '360';
const defaultAmount = '300000';


class CriteriaPanel extends Component{

    constructor(props){
        super(props);

        this.validator = new SimpleReactValidator();

        this.state = {
          loanAmount : defaultAmount,
          loanTerm: defaultTerm,
          monthlyPayment : '',
          interestRate: defaultRate
        }
        
        this.setLoanAmount = this.setLoanAmount.bind(this);
        this.setLoanTerm = this.setLoanTerm.bind(this);
        this.setMonthlyPayment = this.setMonthlyPayment.bind(this);
        this.setInterestRate = this.setInterestRate.bind(this);
        this.recalculate = this.recalculate.bind(this);
    }

    setLoanAmount(event){
        event.preventDefault();
        this.setState({
            loanAmount: event.target.value
        })
    }

    setLoanTerm(event){
        event.preventDefault();
        this.setState({
            loanTerm: event.target.value,
            monthlyPayment: event.target.value !== '' ? '' : '1'
        })
    }

    setMonthlyPayment(event){
        event.preventDefault();
        this.setState({
            monthlyPayment: event.target.value,
            loanTerm: event.target.value !== '' ? '' : defaultTerm
        })
    }

    setInterestRate(event){
        event.preventDefault();
        this.setState({
            interestRate: event.target.value
        })
    }

    recalculate(event){
        if (this.validator.allValid()) {
            this.props.CalculatePeriods(this.state);
          } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
          }

        //this.props.CalculatePeriods(this.state);
    }

    render(){
        return (
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>Loan Amount</td><td><input value={this.state.loanAmount} onChange={this.setLoanAmount} 
                                    onBlur={() => this.validator.showMessageFor('Loan Amount')}
                                 />
                                {this.validator.message('Loan Amount', this.state.loanAmount, 'required|currency')}
                                </td>
                            </tr>
                            <tr><td>Loan Term</td><td><input value={this.state.loanTerm} onChange={this.setLoanTerm} 
                                disabled={!this.state.loanTerm.toString().trim().length > 0} 
                                onBlur={() => this.validator.showMessageFor('Loan Term')}    
                                />
                                {this.validator.message('Loan Term', this.state.loanTerm, 'integer')}                                
                                </td></tr>
                            <tr>
                                <td>Monthly Payment</td>
                                <td><input value={this.state.monthlyPayment} onChange={this.setMonthlyPayment} 
                                disabled={this.state.loanTerm.toString().trim().length > 0} 
                                onBlur={() => this.validator.showMessageFor('Monthly Payment')}    
                                />
                                {this.validator.message('Monthly Payment', this.state.monthlyPayment, 'integer')}
                                </td>
                            </tr>
                            <tr>
                                <td>Interest Rate</td>
                                <td><input value={this.state.interestRate} onChange={this.setInterestRate} 
                                    onBlur={() => this.validator.showMessageFor('Interest Rate')} 
                                />
                                {this.validator.message('Interest Rate', this.state.interestRate, 'between:0,100,num')}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={this.recalculate}>Calculate</button>
                </div>

/*            
            <Form>
                
            </Form>
*/            
        )
    }

}

export default CriteriaPanel;