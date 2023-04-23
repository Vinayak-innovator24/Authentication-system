const {User} = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/env')
const {INVALID_DETAILS} = require('../config/messages')

const resetPassword =  async (req, res) => {
	const token = req.headers['authorization'];
	const {newpassword: plainTextPassword } = req.body

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	try {
		const user = jwt.verify(token, JWT_SECRET)

		const _id = user._id

		const password = await bcrypt.hash(plainTextPassword, 10)

		await User.findOneAndUpdate(
			{ _id },
			{
				$set: { password }
			}
		)
		res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: ';))' })
	}
}

const login = async (req, res) => {
	const { emailId, password } = req.body
	const user = await User.findOne({ emailId: emailId });

	if (!user) {
		return res.json({ status: 'error', error: INVALID_DETAILS })
	}
	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				_id: user._id,
			},
			JWT_SECRET,
			{ expiresIn: '30s' }
		)

		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: INVALID_DETAILS})
}

const register = async (req, res) => {
	const { password: plainTextPassword, emailId } = req.body

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)
	// console.log(password);

	try {
		const response = await User.create({
			emailId,
			password
		})
		console.log(`User created successfully with EmailId: ${emailId}`, response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'EmailId already in use' })
		}
		throw error
	}

	console.log(req.body);

	res.json({ status: 'ok' })
}

module.exports = {
    resetPassword,
    login,
    register
}