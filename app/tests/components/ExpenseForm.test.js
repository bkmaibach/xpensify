import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses'
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm using the expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>);
  expect(wrapper).toMatchSnapshot();
})

// Each event should be simulated and tested accordingly
test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />);
  // Note that event arguments must be passed in next to the event name string
  // In this case, e.preventDefault is used.
  // Provide it as as and object with an empty function.
  wrapper.find('form').simulate('submit', {preventDefault: () => {}});
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
})

test('should set description on input change', () => {
  const wrapper = shallow(<ExpenseForm />);
  // 1. Render the expense form
  // 2. Change the input
  // 3. Make an assertion
  const value = "New Description";
  wrapper.find('input').at(0).simulate('change', { target: { value } });
  expect(wrapper.state('description')).toBe(value);
  expect(wrapper).toMatchSnapshot();
})

test('should set note on textare change', () => {
  const wrapper = shallow(<ExpenseForm />);
  // 1. Render the expense form
  // 2. Change the input
  // 3. Make an assertion
  const value = "New Note";
  wrapper.find('textarea').simulate('change', { target: { value },  persist: () => {} } );
  expect(wrapper.state('note')).toBe(value);
  expect(wrapper).toMatchSnapshot();
});

// Two tests for changing amount, one for valid, one for invalid. Check state.

test('should set amount if valid input', () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = "12.12";
  wrapper.find('input').at(1).simulate('change', { target: { value } });
  expect(wrapper.state('amount')).toBe(value);
  expect(wrapper).toMatchSnapshot();
});

test('should not set amount if invalid input', () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = "12.121";
  wrapper.find('input').at(1).simulate('change', { target: { value } });
  expect(wrapper.state('amount')).toBe("");
  expect(wrapper).toMatchSnapshot();
});

test('should call onSubmit prop for valid form submissin', () => {
  // The spy give us access to a brnad new set of assertions
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  // onSubmitSpy();
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt
  });
});

test('should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find(SingleDatePicker).prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toEqual(now);
});

// Should set calendar focus on change
test('should set calendar focus on change', () => {
  const focused = { focused: true }
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find(SingleDatePicker).prop('onFocusChange')(focused);
  expect(wrapper.state('calendarFocused')).toBe(true);
});