import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem'
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
	<div>
		{
			props.expenses.length !== 0 ? (
				props.expenses.map((expense) => <ExpenseListItem key={expense.id} {...expense} />)
			) : (
				<p>No expense to display</p>
			) 
		}
	</div>
);

const mapStateToProps = (state) => ({
	expenses: selectExpenses(state.expenses, state.filters)
});

export default connect(mapStateToProps)(ExpenseList); 
