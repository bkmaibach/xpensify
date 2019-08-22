import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import expenses from '../fixtures/expenses';
import { filters, altFilters } from '../fixtures/filters';
import { DateRangePicker } from 'react-dates'

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
  />);
});

test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
  wrapper.setProps({ filters: altFilters });
  expect(wrapper).toMatchSnapshot();
});

test('should handle a text change', () => {
  const event = {target: { value: "expectMe" }};
  wrapper.find('input').simulate('change', event);
  expect(setTextFilter).toHaveBeenLastCalledWith(event.target.value);
});

test('should sort by date', () => {
  wrapper.setProps({ filters: altFilters });
  const event = {target: { value: "date" }};
  wrapper.find('select').simulate('change', event);
  expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
  const event = {target: { value: "amount" }};
  wrapper.find('select').simulate('change', event);
  expect(sortByAmount).toHaveBeenCalled();
});

test('should handle a date change', () => {
  const event = {target: { value: "amount" }};
  
  wrapper.find(DateRangePicker).prop('onDatesChange')({startDate: altFilters.startDate, endDate: altFilters.endDate});
  expect(setStartDate).toHaveBeenCalledWith(altFilters.startDate);
  expect(setEndDate).toHaveBeenCalledWith(altFilters.endDate);
});

test('should handle a focus change', () => {
  //assert something about the state
  const calendarFocused = 'endDate'
  wrapper.find(DateRangePicker).prop('onFocusChange')(calendarFocused);
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});





// Should render the ExpenseListFilters
