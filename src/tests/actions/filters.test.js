import moment from 'moment';
import { setTextFilter, setStartDate, setEndDate, sortByAmount, sortByDate } from '../../actions/filters.js';


// SET_TEXT_FILTER
test('Setup setTextFilter action object - data', () => {
	const action = setTextFilter('my invoice'); 

	expect(action).toEqual({
		type: 'SET_TEXT_FILTER',
		text: 'my invoice'
	});
});

test('Setup setTextFilter action object - empty', () => {
	const action = setTextFilter(); 

	expect(action).toEqual({
		type: 'SET_TEXT_FILTER',
		text: ''
	});
});

// SET_START_DATE
test('Setup setStartDate action object', () => {
	const action = setStartDate(moment(0)); 

	expect(action).toEqual({
		type: 'SET_START_DATE',
		date: moment(0)
	});
});

// SET_END_DATE
test('Setup setEndDate action object', () => {
	const action = setEndDate(moment(0)); 

	expect(action).toEqual({
		type: 'SET_END_DATE',
		date: moment(0)
	});
});

//SORT_BY_AMOUNT
test('Setup sortByAmount action object', () => {
	const action = sortByAmount(); 

	expect(action).toEqual({
		type: 'SORT_BY_AMOUNT',
	});
});

// SORT_BY_DATE
test('Setup sortByDate action object', () => {
	const action = sortByDate(); 

	expect(action).toEqual({
		type: 'SORT_BY_DATE',
	});
});
