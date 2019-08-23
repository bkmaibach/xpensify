import expensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses', () => {
  const value = expensesTotal([]);
  expect(value).toBe(0);
});

test('should correctly add up a single expense', () => {
  const value = expensesTotal([expenses[0]]);
  expect(value).toBe(expenses[0].amount);
});

test('should correctly add up multiple expenses', () => {
  const value = expensesTotal(expenses);
  expect(value).toBe(10000000000);
});