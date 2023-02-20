const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const {db} = require('./model/connect.js');
const {router} = require('./routes/authentication.routes');
const {SERVER_CONNECTED} = require('./config/messages');
const {PORT} = require('./config/env');
const dotenv = require('dotenv')
dotenv.config();



const app = express()
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())

app.use('/api/', router);

db().then((dbResult) => {
	console.log(dbResult);
	app.listen(PORT, () => {
		console.log(SERVER_CONNECTED(PORT))
	})	
});
