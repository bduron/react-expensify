import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('should render ExpensesSummary correctly - single expense', () => {
	const wrapper = shallow(<ExpensesSummary expensesCount={1} expensesTotal={2599} />);
	expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary correctly - multiple expenses', () => {
	const wrapper = shallow(<ExpensesSummary expensesCount={99} expensesTotal={259912938} />);
	expect(wrapper).toMatchSnapshot();
});
