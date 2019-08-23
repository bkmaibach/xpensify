import React from 'react';
import { connect } from 'react-redux';
import expensesTotalSelector from '../../selectors/expenses-total';
import expensesSelector from '../../selectors/expenses';
import numeral from 'numeral';

export const ExpensesSummary = ({count, total}) => (
  <div>
    {count === 0 ? (
      <h3>Add expenses to begin</h3>
    ) : (
    <h3>Viewing {count} expense{ count > 1 ? ('s') : ('') } totalling {numeral(total/100).format('$0,0.00')}</h3>
    ) }
  </div>
);

const mapStateToProps = (state) => {
  const selectedExpenses = expensesSelector(state.expenses, state.filters);
  return {
    total: expensesTotalSelector(selectedExpenses),
    count: selectedExpenses.length
  }
}

export default connect(mapStateToProps)(ExpensesSummary);