import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm  from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('should display ExpenseForm - empty', () => {
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper).toMatchSnapshot();
});

test('should display ExpenseForm - w/ data', () => {
	const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
	expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
	const wrapper = shallow(<ExpenseForm />);
	
	expect(wrapper).toMatchSnapshot();
	wrapper.find('form').simulate('submit', {
		preventDefault: () => {}
	});
	expect(wrapper.state('error').length).toBeGreaterThan(0);
	expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
	const wrapper = shallow(<ExpenseForm />);
	const value = 'This is a description';

	wrapper.find('input').at(0).simulate('change', {
		target: { value }
	});
	expect(wrapper.state('description')).toBe(value);
});

test('should set note on input change', () => {
	const wrapper = shallow(<ExpenseForm />);
	const value = 'This is a note';

	wrapper.find('textarea').simulate('change', {
		target: { value }
	});
	expect(wrapper.state('note')).toBe(value);
});

test('should set amount on input change - valid', () => {
	const wrapper = shallow(<ExpenseForm />);
	const value = '25.22';

	wrapper.find('input').at(1).simulate('change', {
		target: { value }
	});
	expect(wrapper.state('amount')).toBe(value);
});

test('should set amount on input change - invalid', () => {
	const wrapper = shallow(<ExpenseForm />);
	const value = '25.221111111111';

	wrapper.find('input').at(1).simulate('change', {
		target: { value }
	});
	expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit props for valid form submission', () => {
	const onSubmitSpy = jest.fn();
	const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);

	wrapper.find('form').simulate('submit', {
		preventDefault: () => {}
	});

	expect(wrapper.state('error').length).toBe(0);
	expect(onSubmitSpy).toHaveBeenLastCalledWith({
		description: expenses[0].description,
		note: expenses[0].note,
		createdAt: expenses[0].createdAt,
		amount: expenses[0].amount,
	});
});


test('should call onDateChange for valid form submission', () => {
	const now = moment();
	const wrapper = shallow(<ExpenseForm />);

	wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now); 
	expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendarFocused when calling onFocusChange', () => {
	const focused = true;
	const wrapper = shallow(<ExpenseForm />);

	wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused }); 
	expect(wrapper.state('calendarFocused')).toBe(focused);
});

