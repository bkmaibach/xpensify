import React from 'react';
import { shallow } from 'enzyme';
import ExpenseListItem from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses'

test('should render expense list item correctly ', () => {
  const wrapper = shallow(<ExpenseListItem {...expenses[0]} key={expenses[0].id} />);
  expect(wrapper).toMatchSnapshot();
});
