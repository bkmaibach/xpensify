import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test('should render correctly with no expenses', () => {
  const wrapper = shallow(<ExpensesSummary count={0} expenses={[]} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render correctly with one expense', () => {
  const wrapper = shallow(<ExpensesSummary count={1} expenses={[expenses[2]]}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render correctly with expenses', () => {
  const wrapper = shallow(<ExpensesSummary count={4} expenses={expenses} />);
  expect(wrapper).toMatchSnapshot();
});