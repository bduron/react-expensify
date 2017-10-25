import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, editExpense, addExpense, setExpenses, startSetExpenses } from '../../actions/expenses.js';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
	const expensesData = {};

	expenses.forEach(({ id, description, note, amount, createdAt }) => {
		expensesData[id] = { description, note, amount, createdAt };	
	});
	database.ref('expenses').set(expensesData).then(() => done());
});


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

test('Setup full addExpense action object', () => {
	const action = addExpense(expenses[2]);

	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: expenses[2]
	});
});

test('should add expense to database and store', (done) => {
	const store = createMockStore({});
	const expenseData = {
		description: 'facture',
		note: 'nothing',
		amount: 123.12,
		createdAt: 1000
	};
	
	store.dispatch(startAddExpense(expenseData)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...expenseData,
			}
		});
		return database.ref(`expenses/${actions[0].expense.id}`).once('value'); 
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData);
		done();
	});
});

test('should add expense with default to database and store', (done) => {
	const store = createMockStore({});
	const defaultExpense = {
		description: '',
		note: '',
		amount: 0,
		createdAt: 0
	};
	
	store.dispatch(startAddExpense({})).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...defaultExpense,
			}
		});
		return database.ref(`expenses/${actions[0].expense.id}`).once('value'); 
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(defaultExpense);
		done();
	});
});


test('should setup set expenses object with data', () => {
	const action = setExpenses(expenses);

	expect(action).toEqual({
		type: 'SET_EXPENSES',
		expenses
	});
});


test('should fetch the expenses from firebase', (done) => {
	const store = createMockStore({});
	
	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses
		});
		done();
	});
	

});

//test('Setup empty addExpense action object', () => {
//	const result = addExpense();
//
//	expect(result).toEqual({
//		type: 'ADD_EXPENSE',
//		expense: {
//			id: expect.any(String),
//			description: '',
//			note: '',
//			amount: 0,
//			createdAt: 0
//		}
//	});
//});
