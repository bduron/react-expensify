import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
	<div>
		<li>
			<b>{description}</b> : {amount}$ | {createdAt} | <Link to={"/edit/" +  id}>Edit </Link>
		</li>
	</div>
);

export default ExpenseListItem;
