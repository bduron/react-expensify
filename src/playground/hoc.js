import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
	<div>
		<h1>Info</h1>
		<p>This your info: {props.infos}</p>
	</div>
); 


const withAdminWarning = (WrappedComponent) => {
	return (props) => (
		<div>
			{props.isAdmin && <p>This message is for admins</p>}	
			<WrappedComponent {...props}/>	
		</div>
	);
};

const requireAuthentification = (WrappedComponent) => {
	return (props) => (
		<div>
			{props.isAuth 
				? <WrappedComponent {...props} />	 
				: <p>You must be logged to view this content</p>}	
		</div>
	);
}

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentification(Info);

//ReactDOM.render(<AdminInfo infos="sample informations" isAdmin={false} />, document.getElementById('app'));
ReactDOM.render(<AuthInfo infos="sample informations" isAuth={true} />, document.getElementById('app'));
