import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startRemoveExpense } from '../actions/expenses';
import { startEditExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
	onSubmit = (expense) => {
		this.props.startEditExpense(this.props.expense.id, expense);
		this.props.history.push('/');
	}

	onRemove = (e) => {
		this.props.startRemoveExpense({ id: this.props.expense.id});	
		this.props.history.push('/');	
	}

	render() {
		return (
			<div>
				<div className="page-header">
					<div className="content-container">
						<h1 className="page-header__title">Edit expense</h1>
					</div>
				</div>
				<div className="content-container">
					<ExpenseForm 
						expense={this.props.expense}
						onSubmit={this.onSubmit}
					/>
					<button className="button button--secondary" onClick={this.onRemove}>Remove expense</button>
				</div>
			</div>
		);
	}	
}

const mapDispatchToProps = (dispatch) => ({
	startRemoveExpense: (id) => dispatch(startRemoveExpense(id)),
	startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense))
});

const mapStateToProps = (state, props) => ({
	expense: state.expenses.find((expense) => props.match.params.id === expense.id)
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
