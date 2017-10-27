import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, setStartDate, setEndDate } from '../actions/filters';
import { sortByAmount, sortByDate } from '../actions/filters';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';

export class ExpenseListFilters extends React.Component { 

	state = {
		calendarFocused: null
	};

	onDateChange = ({ startDate, endDate }) => {
		this.props.setStartDate(startDate); 	
		this.props.setEndDate(endDate); 	
	};

	onFocusChange = (focusedInput) => {
		this.setState(() => ({ calendarFocused: focusedInput }) );
	};

	onTextChange = (e) => {
		this.props.setTextFilter(e.target.value);		
	};

	onSortChange = (e) => {
		let action = e.target.value;

		if (action === 'date')
			this.props.sortByDate(); 
		if (action === 'amount')
			this.props.sortByAmount(); 
	};

	render() {
		return (
			<div className="content-container">
				<div className="input-group">
					<div className="input-group__item">
						<input 
							className="text-input" 
							type="text" 
							placeholder="Search expenses"
							value={this.props.filters.text} 
							onChange={this.onTextChange} 
						/>
					</div>
					<div className="input-group__item">
						<select 
							className="select"
							value={this.props.filters.sortBy}
							onChange={this.onSortChange}>
						<option value="date">Date</option>
						<option value="amount">Amount</option>
						</select>
					</div>
					<div className="input-group__item">
						<DateRangePicker
							startDate={this.props.filters.startDate} 
							endDate={this.props.filters.endDate} 
							onDatesChange={this.onDateChange} 
							focusedInput={this.state.calendarFocused} 
							onFocusChange={this.onFocusChange}
							numberOfMonths={1}
							isOutsideRange={() => false}
							showClearDates={true}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	setStartDate: (startDate) => dispatch(setStartDate(startDate)),
	setEndDate: (endDate) => dispatch(setEndDate(endDate)),
	setTextFilter: (char) => dispatch(setTextFilter(char)),
	sortByDate: () => dispatch(sortByDate()),
	sortByAmount: () => dispatch(sortByAmount())
});

const mapStateToProps = (state) => ({
	filters: state.filters
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
