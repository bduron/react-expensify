import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export const ExpensesSummary = ({ expensesCount, expensesTotal }) => {
	const expenseWord = expensesCount === 1 ? 'expense' : 'expenses';
	const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');

	return (
		<div>
			<h2>Viewing {expensesCount} {expenseWord} totalling {formattedExpensesTotal}</h2>
		</div>
	)
};

const mapStateToProps = (state) => {
	const expenses = selectExpenses(state.expenses, state.filters);

	return {
		expensesCount: expenses.length,
		expensesTotal: selectExpensesTotal(expenses)
	};
};

export default connect(mapStateToProps)(ExpensesSummary); 
