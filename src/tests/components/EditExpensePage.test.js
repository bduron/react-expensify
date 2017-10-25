import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let wrapper, expense, history, startRemoveExpense, editExpense; 

beforeEach(() => {
	expense = expenses[1];
	editExpense = jest.fn();
	startRemoveExpense = jest.fn();
	history = { push: jest.fn() };
	wrapper = shallow(<EditExpensePage 
		editExpense={editExpense} 
		startRemoveExpense={startRemoveExpense} 
		expense={expense}
		history={history}
	/>);   
});

test('should render EditExpensePage correctly', () => {
	expect(wrapper).toMatchSnapshot();
});

test('should handle EditExpense', () => {
	wrapper.find('ExpenseForm').prop('onSubmit')(expense);
	expect(editExpense).toHaveBeenLastCalledWith(expense.id, expense);
	expect(history.push).toHaveBeenCalledWith('/');
});

test('should handle startRemoveExpense', () => {
	wrapper.find('button').simulate('click');
	expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expense.id});
	expect(history.push).toHaveBeenCalledWith('/');
});
