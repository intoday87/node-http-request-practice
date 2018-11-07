const Moment = require('moment');

function format(m) {
	return m.format('YYYYMMDDhhmmss');
}

function requestInterval(start = Moment('2018-10-26 03:29:00')) {
	const next = Moment(start).add(10, 'minutes');

	console.log('requst date start, end', format(start), format(next));

	const option = {
		hostname: 'www.example.com',
		port: 80,
		path: `/path?startDate=${format(start)}&endDate=${format(next)}`,
		method: 'PUT',
		headers: {
		 'accept' : 'application/json;charset=UTF-8',
		}
	};

	const req = require('http').request(option, (res) => {
		console.log(`STATUS: ${res.statusCode}`);
		console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
		res.setEncoding('utf8');
		res.on('data', (chunk) => {
			console.log(`BODY: ${chunk}`);
		});
	}) 
	.on('error', (e) => {
		console.error(`problem with request: ${e.message}`);
	});

	req.end();

 	if (next.isAfter(Moment('2018-10-26 03:39:00'))) {
	 	console.log('end', format(next));
		return;
	}

	setTimeout(requestInterval, 3000, next);
}

requestInterval();

