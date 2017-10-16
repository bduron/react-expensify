const book = {
	title: 'Ego is the enemy',
	author: 'Ryan Holiday',
	publisher: {
		name: 'Pinguin'
	}
};

const { name: publisherName = 'Self-published' } = book.publisher;

console.log(publisherName);
