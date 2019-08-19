import selectExpenses from '../../selectors/expenses';
import moment from 'moment';
import expenses from '../fixtures/expenses';

test('Should filter by text value', () => {
  const textFilter = {text: "test"}
  const result = selectExpenses(expenses, textFilter);
  expect(result).toEqual(expenses.slice(0,2));
  });
  
  test('Should sort by amount', () => {
    const sortByAmountFilter = {sortBy: "amount"};
    const result = selectExpenses(expenses, sortByAmountFilter);
    expect(result).toEqual(
      [
        expenses[3],
        expenses[2],
        expenses[1],
        expenses[0]
      ]
    );
  });
    
    
test('Should sort by date', () => {
  const sortByDateFilter = {sortBy: "date"};
  const result = selectExpenses(expenses, sortByDateFilter);
  expect(result).toEqual(
    [
      expenses[0],
      expenses[1],
      expenses[2],
      expenses[3]
    ]
  );
});

test('Should filter out expenses before a certain start date', () => {
  const removeBeforeDateFilter = {startDate: moment(7000000000)};
  const result = selectExpenses(expenses, removeBeforeDateFilter);
  expect(result).toEqual(
    [
      expenses[0],
      expenses[1],
      expenses[2],
    ]
  );
});

test('Should filter out expenses after a certain end date', () => {
  const removeAfterDateFilter = {endDate: moment(7000000000)};
  const result = selectExpenses(expenses, removeAfterDateFilter);
  expect(result).toEqual(
    [
      expenses[2],
      expenses[3]
    ]
  );
});