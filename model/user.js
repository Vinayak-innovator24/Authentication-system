const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
		emailId: { type: String, required: true, unique: true },
		password: { type: String, required: true }

	},
	{ collection: 'users' }
)

const User = mongoose.model('UserSchema', UserSchema)

module.exports = {User} 
