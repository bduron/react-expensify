import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import expensesReducer from '../reducers/expenses.js';
import filtersReducer from '../reducers/filters.js';
import authReducer from '../reducers/auth.js';
import thunk from 'redux-thunk';

// STORE CREATION

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
	const store = createStore(
		combineReducers({
			expenses: expensesReducer,
			filters: filtersReducer,
			auth: authReducer
		}),
		composeEnhancers(applyMiddleware(thunk))
	);

	return store;
}


