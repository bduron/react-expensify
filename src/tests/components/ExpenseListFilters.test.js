import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let wrapper, setStartDate, setEndDate, setTextFilter, sortByDate, sortByAmount; 

beforeEach(() => {
	setStartDate = jest.fn();
	setEndDate = jest.fn(); 
	setTextFilter = jest.fn();
	sortByDate = jest.fn();
	sortByAmount = jest.fn(); 
	wrapper = shallow(<ExpenseListFilters
		filters={filters}
		setStartDate={setStartDate} 
		setEndDate={setEndDate}
		setTextFilter={setTextFilter}
		sortByDate={sortByDate}
		sortByAmount={sortByAmount}
	/>);
});

test('should render ExpenseListFilters - default filters', () => {
	expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters - alt filters', () => {
	wrapper.setProps({ filters: altFilters });
	expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
	const e = {target: {value: 'b'}};

	wrapper.find('input').prop('onChange')(e);
	expect(setTextFilter).toHaveBeenCalledWith(e.target.value);
});

test('should sort by date', () => {
	const e = {target: {value: 'date'}};

	wrapper.find('select').prop('onChange')(e);
	expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
	const e = {target: {value: 'amount'}};

	wrapper.find('select').prop('onChange')(e);
	expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date change', () => {
	const dates = {
		startDate: 1,
		endDate: 2
	};

	wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')(dates);
	expect(setStartDate).toHaveBeenCalledWith(dates.startDate);
	expect(setEndDate).toHaveBeenCalledWith(dates.endDate);
});


test('should handle date focus change', () => {
	const focus = 'endDate';

	wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(focus);
	expect(wrapper.state('calendarFocused')).toBe(focus);
});
