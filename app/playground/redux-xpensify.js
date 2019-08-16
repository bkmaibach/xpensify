import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const addExpense = ({description = '', note = '', amount = 0, createdAt = 0 } = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

const editExpense = ({ id, updates } = {}) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

const expensesReducerDefaultState = [];

// Expenses reducer
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter( ({id}) => id !== action.id );
    case 'EDIT_EXPENSE':
      return state.map( (expense) => expense.id === action.id ? { ...expense, ...action.updates } : expense );
    default:
      return state;
  }
};

const setTextFilter = ({text = ''} = {}) => ({
  type: "SET_TEXT_FILTER",
  text
});
const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT",
});
const sortByDate = () => ({
  type: "SORT_BY_DATE",
});
const setStartDate = (startDate) => ({
  type: "SET_START_DATE",
  startDate
});
const setEndDate = (endDate) => ({
  type: "SET_END_DATE",
  endDate
});



const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date', //Date or amount
  startDate: undefined,
  endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
    return {...state, text: action.text };
    case 'SORT_BY_AMOUNT':
      return {...state, sortBy: 'amount'};
    case 'SORT_BY_DATE':
      return {...state, sortBy: 'date'};
    case 'SET_START_DATE':
      return {...state, startDate: action.startDate};
    case 'SET_END_DATE':
        return {...state, endDate: action.endDate};
    default:
      return state;
  }
};

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate}) => {

  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    return startDateMatch && endDateMatch && textMatch;
  }).sort( (a, b) => {
    if (sortBy === 'amount'){
      return a.amount < b.amount ? 1 : -1;
    } else if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    }
  } );
};

// Store creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe( () => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
} );

const action1 = store.dispatch(addExpense({description: "Rent", createdAt: 100, amount: 200}));
const action2 = store.dispatch(addExpense({description: "Coffee", createdAt: 300, amount: 300}));
// const action3 = store.dispatch(removeExpense({id: action1.expense.id}));
// const action4 = store.dispatch(editExpense({id: action2.expense.id, updates: {amount: 500} }));

store.dispatch(setTextFilter({text: 'Spoon'}));
store.dispatch(sortByAmount());
store.dispatch(setStartDate(150));
store.dispatch(setEndDate(400));
// store.dispatch(setTextFilter());

// console.log(store.getState());

const demoState = {
  expenses: [
    {
      id: 'asdfasdf',
      description: 'January rent',
      note: 'This was the final payment',
      amount: 54500,
      createdAt: 0
    }
  ],
  filters: {
    text: 'rent',
    sortBy: 'amount', //Date or amount
    startDate: undefined,
    endDate: undefined
  }
};