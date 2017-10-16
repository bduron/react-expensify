import { editExpense, addExpense } from '../../actions/expenses.js';

test('Testing editExpense', () => {
	const result = editExpense('123abc', {description: 'hello', amount: 123});

	expect(result).toEqual({
		type: 'EDIT_EXPENSE',
		id: '123abc',
		updates: {
			description: 'hello',
			amount: 123
		}
	});
});

test('Setup empty addExpense action object', () => {
	const result = addExpense();

	expect(result).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			id: expect.any(String),
			description: '',
			note: '',
			amount: 0,
			createdAt: 0
		}
	});
});

test('Setup full addExpense action object', () => {
	const expense = {
		description: 'hello',
		amount: 99,
		note: 'my note',
		createdAt: 1995
	};
	const action = addExpense(expense);

	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			id: expect.any(String),
			...expense
		}
	});
});

