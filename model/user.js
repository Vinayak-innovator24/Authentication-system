const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true },
		password: { type: String, required: true },
		emailId: { type: String, required: true, unique: true },
		num: { type: String, required: true}
	},
	{ collection: 'users' }
)

const User = mongoose.model('UserSchema', UserSchema)

module.exports = {User} 
