// selectExpensesTotal

export default (expenses) => {
	return expenses.reduce((sum, { amount }) => sum + amount, 0);
};
