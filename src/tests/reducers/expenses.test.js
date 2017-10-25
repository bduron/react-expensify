import expensesReducer from '../../reducers/expenses';
import moment from 'moment';
import expenses from '../fixtures/expenses';


test('Setting up default expenses state', () => {
	const action = {type: '@@INIT'};	
	const state = expensesReducer(undefined, action);
	
	expect(state).toEqual([]);
})

test('Setting up ADD_EXPENSE', () => {
	const expense = {
		id: '4',
		description: 'Meal',
		note: '',
		amount: 109500,
		createdAt: moment(0).subtract(4, 'days').valueOf()
	};

	const action = {
		type: 'ADD_EXPENSE',
		expense
	};

	const state = expensesReducer(expenses, action);

	expect(state).toEqual([...expenses, expense]);
});

test('Setting up REMOVE_EXPENSE - valid ID', () => {

	const action = {
		type: 'REMOVE_EXPENSE',
		id: expenses[1].id
	};

	const state = expensesReducer(expenses, action);

	expect(state).toEqual([expenses[0], expenses[2]]);
});

test('Setting up REMOVE_EXPENSE - invalid ID', () => {

	const action = {
		type: 'REMOVE_EXPENSE',
		id: -1
	};

	const state = expensesReducer(expenses, action);

	expect(state).toEqual(expenses);
});

test('Setting up EDIT_EXPENSE - valid ID', () => {

	const updates = {
		note: 'test'	
	};

	const action = {
		type: 'EDIT_EXPENSE',
		id: expenses[1].id,
		updates
	};

	const state = expensesReducer(expenses, action);

	expect(state[1].note).toBe('test');
});

test('Setting up EDIT_EXPENSE - invalid ID', () => {

	const updates = {
		note: 'test'	
	};

	const action = {
		type: 'EDIT_EXPENSE',
		id: -1,
		updates
	};

	const state = expensesReducer(expenses, action);

	expect(state).toEqual(expenses);
});


test('should SET EXPENSES', () => {

	const action = {
		type: 'SET_EXPENSES',
		expenses
	};

	const state = expensesReducer(expenses, action);

	expect(state).toEqual(expenses);
});

