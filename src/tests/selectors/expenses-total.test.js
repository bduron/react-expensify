import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if the expense array is empty', () => {
	let sum = selectExpensesTotal([]);
	expect(sum).toBe(0);
});

test('should correctly add up a single expense', () => {
	let sum = selectExpensesTotal([expenses[0]]);
	expect(sum).toBe(expenses[0].amount);
});

test('should correctly add up multiple expenses', () => {
	let sum = selectExpensesTotal(expenses);
	expect(sum).toBe(114195);
});
