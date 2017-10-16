import { createStore, combineReducers } from 'redux';


//const demoState = {
//	expenses: [{
//		id: 'dwdwwefwef',
//		description: 'January rent',
//		note: 'Sample description',
//		amount: 52000,
//		createdAt: 0
//	}],
//	filters: {
//		text: 'rent',
//		sortBy: 'amount', 
//		startDate: undefined,
//		endDate: undefined
//	}
//};



/***************** Data Retrieving ******************/




/***************** Actions creators ******************/



/***************** Default State ******************/



/***************** Reducers ******************/



/***************** Store creation ******************/


store.subscribe(() => {
	let state = store.getState();
	let visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
	
	console.log(visibleExpenses);
});


/***************** Actions  ******************/

console.log(store.getState());
const exp1 = store.dispatch(addExpense({ description: 'Lunch', note: 'yummy', amount: 1200, createdAt: 1000 }));
const exp2 = store.dispatch(addExpense({ description: 'Diner', note: 'tasty', amount: 4200, createdAt: -1000 }));

//store.dispatch(removeExpense(exp1.expense));
store.dispatch(setTextFilter('n'));
//store.dispatch(setTextFilter('diner'));
//store.dispatch(sortByAmount());
store.dispatch(sortByDate());
store.dispatch(setStartDate(-2123));
//store.dispatch(setStartDate());
store.dispatch(setEndDate(1456));



/////////////////////////////////////

const demoState = {
	expenses: [{
		id: 'dwdwwefwef',
		description: 'January rent',
		note: 'Sample description',
		amount: 52000,
		createdAt: 0
	}],
	filters: {
		text: 'rent',
		sortBy: 'amount', 
		startDate: undefined,
		endDate: undefined
	}
};
