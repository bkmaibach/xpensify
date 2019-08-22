import React from 'react';
import ExpenseForm from "../ExpenseForm"
import { connect } from 'react-redux';
import { addExpense } from "../../actions/expenses";

export class AddExpensePage extends React.Component {
  onSubmit = (expense) => {
    // props.dispatch(addExpense(expense));
    this.props.addExpense(expense);
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(addExpense(expense))
});

// The second function param is called mapDispatchToProps and is needed because
// of the difficulty in sending a spy in place of addExpense
// (addExpense comes from an imoprt, not a prop)
// It basically turns two(functions(x)) into oneFunction(x)
export default connect(undefined, mapDispatchToProps)(AddExpensePage);
