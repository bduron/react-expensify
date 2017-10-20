import * as firebase from 'firebase';
import expenses from '../tests/fixtures/expenses';

const config = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const db = firebase.database();

export { firebase, db as default }; 



//expenses.forEach((expense) => {
//	db.ref('expenses').push(expense);
//});
//
//console.log(expenses);


//db.ref().set({
//	fname: 'Benjamin',
//	lname: 'Duron',
//	isSingle: true,
//	job: {
//		company: 'Google',
//		title: 'software engineer'
//	}
//}).then(() => {
//	console.log('Data Sent');
//});
//
//
//const onValueChange =  db.ref().on('value', (snapshot) => {
//	const val = snapshot.val();
//	console.log(`${val.fname} is a ${val.job.title} at ${val.job.company}`);
//}, (e) => {
//	console.log('err: ', e);
//});
//
//db.ref('job').update({
//	company: 'Amazon'
//});
