import authReducer from '../../reducers/auth';

test('Auth reducer initilization', () => {

	const action = {type: '@@INIT'};	
	const state = authReducer(undefined, action);
	
	expect(state).toEqual({ });
});

test('Setting up LOGIN action', () => {

	const action = {
		type: 'LOGIN',
		uid: 'd98dhhd3'
	};	
	const state = authReducer({}, action);
	
	expect(state.uid).toBe(action.uid);
});

test('Setting up LOGOUT action', () => {

	const action = {
		type: 'LOGOUT',
	};	

	const state = authReducer({ uid: 'd382d23' }, action);
	expect(state).toEqual({});
});
