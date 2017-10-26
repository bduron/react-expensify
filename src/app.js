import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import moment from 'moment';
import configureStore from './store/configureStore.js';
import { startSetExpenses } from './actions/expenses';
import { login, logout} from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';

const store = configureStore();

//store.dispatch(addExpense( { description: 'Water bill', amount: 1000, createdAt: 1997 }));
//store.dispatch(addExpense( { description: 'Gas bill', amount: 50, createdAt: 2005 } ));
//store.dispatch(addExpense( { description: 'Rent', amount: 4500 } ));
//store.dispatch(setStartDate(-10000));
//store.dispatch(setEndDate(1000000));


const state = store.getState();
const expenses = getVisibleExpenses(state.expenses, state.filters);
console.log(expenses);


const jsx = (
	<Provider store={store} >
		<AppRouter />
	</Provider>
);

let hasRendered = false;
const renderApp = () => {
	if (!hasRendered) {
		ReactDOM.render(jsx, document.getElementById('app'));
		hasRendered = true;
	}
};


ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));


firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		store.dispatch(login(user.uid));
		store.dispatch(startSetExpenses()).then(() => {
			renderApp();
			if (history.location.pathname === '/')
				history.push('/dashboard');
		});
	} else {
		store.dispatch(logout());
		renderApp();
		history.push('/');
	}
});
