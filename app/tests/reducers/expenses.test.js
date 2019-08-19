import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test('should add an expense to the state', () => {
  const expense = {description: "test", amount: 1234, createdAt: 0, note: "note"}
  const state = expensesReducer([], { type: "ADD_EXPENSE", expense: expense });
  expect(state).toEqual([expense]);
});

test('should remove an expense from the state', () => {
  const state = expensesReducer(expenses, { type: "REMOVE_EXPENSE", id: '0'});
  expect(state).toEqual(expenses.slice(1, 4));
});

test('should not remove an expense from the state when the id does not match', () => {
  const state = expensesReducer(expenses, { type: "REMOVE_EXPENSE", id: '4' });
  expect(state).toEqual(expenses);
});

test('should edit an expense in the state', () => {
const updates = {
  description: "changed",
  amount: 6969,
  note: "changed",
  createdAt: 6969
}
  const state = expensesReducer(expenses, { type: "EDIT_EXPENSE", id: "0", updates });
  expect(state).toEqual([{id: "0", ...updates }, ...expenses.slice(1, expenses.length) ]);
});

test('should not edit a non-existing expense in the state', () => {
  const updates = {
    description: "changed",
    amount: 6969,
    note: "changed",
    createdAt: 6969
  }
    const state = expensesReducer(expenses, { type: "EDIT_EXPENSE", id: "4", updates });
    expect(state).toEqual(expenses);
  });
