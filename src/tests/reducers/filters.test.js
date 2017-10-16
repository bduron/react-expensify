import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('Filter reducer initilization', () => {

	const action = {type: '@@INIT'};	
	const state = filtersReducer(undefined, action);
	
	expect(state).toEqual({
		text: '',
		sortBy: 'date',
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month')
	});

});

test('Setting up SET_TEXT_FILTER - FiltersReducer', () => {

	const text = 'test';
	const action = {
		type: 'SET_TEXT_FILTER',
		text
	};	
	const state = filtersReducer(undefined, action);
	
	expect(state.text).toBe(text);
});

test('Setting up SORT_BY_DATE - FiltersReducer', () => {

	const action = {
		type: 'SORT_BY_DATE'
	};	
	const previousState = {
		text: '',
		sortBy: 'amount',
		startDate: undefined, 
		endDate: undefined 
	};
	const state = filtersReducer(undefined, action);
	
	expect(state.sortBy).toBe('date');
});

test('Setting up SORT_BY_AMOUNT - FiltersReducer', () => {

	const action = {
		type: 'SORT_BY_AMOUNT'
	};	
	const state = filtersReducer(undefined, action);
	
	expect(state.sortBy).toBe('amount');
});

test('Setting up SET_START_DATE - FiltersReducer', () => {


	const date = moment(1000).valueOf();
	const action = {
		type: 'SET_START_DATE',
		date
	};	
	const state = filtersReducer(undefined, action);
	
	expect(state.startDate).toBe(date);
});

test('Setting up SET_END_DATE - FiltersReducer', () => {

	const date = moment(1000).valueOf();
	const action = {
		type: 'SET_END_DATE',
		date
	};	
	const state = filtersReducer(undefined, action);
	
	expect(state.endDate).toBe(date);
});
 
