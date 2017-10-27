import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
	startAddExpense, 
	editExpense, 
	addExpense, 
	setExpenses, 
	startSetExpenses,
	startRemoveExpense,
	startEditExpense
} from '../../actions/expenses.js';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);
const uid = 'f8374yfn8';
const defaultAuthState = { auth: { uid }};

beforeEach((done) => {
	const expensesData = {};

	expenses.forEach(({ id, description, note, amount, createdAt }) => {
		expensesData[id] = { description, note, amount, createdAt };	
	});
	database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
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
	const store = createMockStore(defaultAuthState);
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
		return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value'); 
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData);
		done();
	});
});

test('should add expense with default to database and store', (done) => {
	const store = createMockStore(defaultAuthState);
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
		return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value'); 
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
	const store = createMockStore(defaultAuthState);
	
	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses
		});
		done();
	});
});


test('should remove expense from firebase', (done) => {
	const store = createMockStore(defaultAuthState);
	const id = expenses[0].id;

	store.dispatch(startRemoveExpense({ id })).then(() => {
		const action = store.getActions()[0];
		expect(action).toEqual({
			type: 'REMOVE_EXPENSE',
			id
		});
		return database.ref(`users/${uid}/expenses/${id}`).once('value'); 
	}).then((snapshot) => {
		expect(snapshot.val()).toBeFalsy();
		done();
	});
});

test('should edit expense from firebase', (done) => {
	const store = createMockStore(defaultAuthState);
	const id = expenses[2].id;
	const updates = {
		amount: 9900,
		note: 'updated note'
	};
	
	store.dispatch(startEditExpense(id, updates)).then(() => {
		const action = store.getActions()[0];
		expect(action).toEqual({
			type: 'EDIT_EXPENSE',
			id,
			updates
		});
		return database.ref(`users/${uid}/expenses/${id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.child('amount').val()).toBe(updates.amount); 	
		expect(snapshot.child('note').val()).toBe(updates.note); 	
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
