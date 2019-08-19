import { addExpense, editExpense, removeExpense } from '../../actions/expenses'

test("Should setup remove expense action object", () => {
  const action = removeExpense({id: "123abc"});
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: "123abc"
  });
});

test("Should setup edit expense action object", () => {
  const action = editExpense({id: "123abc", updates: {note: "test value"}});
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: "123abc",
    updates: {note: "test value"}
  });

});

test("Should setup add expense action object", () => {
  const expenseData = {description: "test", note: "test", amount: 1337, createdAt: 1234};
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
       id: expect.any(String)
    }
  });
});

test("Should setup add expense action object", () => {
  const defaultExpenseData = {description: "", note: "", amount: 0, createdAt: 0};
  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...defaultExpenseData,
       id: expect.any(String)
    }
  });
});