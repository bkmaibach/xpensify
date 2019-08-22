import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from '../ExpenseForm';
import { editExpense, removeExpense } from "../../actions/expenses";

// Refactor as a class based component
// Map dispatch to props
export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
      this.props.editExpense(this.props.expense.id, expense);
      this.props.history.push('/');
      // console.log('updated', expense);
  }

  onClickRemove = (e) => {
    this.props.removeExpense({id: this.props.expense.id});
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <ExpenseForm
          expense={this.props.expense}
          onSubmit={this.onSubmit}
        />
        <button
          onClick={this.onClickRemove}>Remove</button>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find( (expense) => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  editExpense: (id, updates) => dispatch(editExpense(id, updates)),
  removeExpense: ({id}) => dispatch(removeExpense({id}))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
