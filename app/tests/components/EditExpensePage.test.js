import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpense, removeExpense, expense, history, wrapper;

beforeEach(() => {
  editExpense = jest.fn();
  removeExpense = jest.fn();
  expense = expenses[2];
  history = { push: jest.fn() };
  wrapper = shallow(
  <EditExpensePage
    editExpense={editExpense}
    removeExpense={removeExpense}
    expense={expense}
    history={history}
  />);
});

test('should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit for editing expense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expense)
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(editExpense).toHaveBeenLastCalledWith(expense.id, expense);
});

test('should handle onClickRemove for removing expense', () => {
  wrapper.find('button').simulate('click');
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(removeExpense).toHaveBeenLastCalledWith({id: expense.id});
});

// Should render the EditExpensePage
// Should handle editExpense (using spies)
// Should handle removeExpense (using spies)