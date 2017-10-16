const add = (a, b) => a + b;

const greetName = (name) => `Hello ${name}!`;

test('add function', () => {
	expect(add(3,4)).toBe(7);
});

test('greetings', ()=> {
	expect(greetName('Ben')).toBe('Hello Ben!');
});
