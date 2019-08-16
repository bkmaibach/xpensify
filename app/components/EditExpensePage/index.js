import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from '../ExpenseForm';
import { editExpense, removeExpense } from "../../actions/expenses";

const EditExpensePage = (props) => (
  <div>
    <ExpenseForm
      expense={props.expense}
      onSubmit={(expense) => {
        props.dispatch(editExpense({id: props.expense.id, updates: expense}));
        props.history.push('/');
        console.log('updated', expense);
      }}
    />
    <button
      onClick={(e) => {
        props.dispatch(removeExpense({id: props.expense.id}));
        props.history.push('/');
      }
    }>Remove</button>
  </div>
  // <div>Editing expense with an ID of: {props.match.params.id}</div>
);

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find( (expense) => expense.id === props.match.params.id)
  };
};

export default connect(mapStateToProps)(EditExpensePage);
