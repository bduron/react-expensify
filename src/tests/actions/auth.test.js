import { login, logout } from '../../actions/auth'; 

test('should return a Login action object', () => {
	const uid = '398hf23f';
	const action = login(uid);

	expect(action).toEqual({
		type: 'LOGIN',
		uid 
	});
});

test('should return a Logout action object', () => {
	const action = logout();

	expect(action).toEqual({
		type: 'LOGOUT'
	});
});

