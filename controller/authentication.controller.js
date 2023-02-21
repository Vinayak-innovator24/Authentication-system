const {User} = require('../model/user')
const bcrypt = require('bcryptjs')
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
	const { username, password: plainTextPassword, emailId, num } = req.body

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	if(num.length != 10){
		return res.json({
			status: 'error',
			error: 'Mobile Number greater than 10 digits'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)
	// console.log(password);

	try {
		const response = await User.create({
			username,
			password,
			emailId,
			num
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

const updateDetails = async(req, res) => {
    const _id = req.body._id;
    const username = req.body.username;
    const num = req.body.num;
    try {
        const result = await User.findOneAndUpdate({_id: _id}, {username: username, num: num});
        res.send({status: 'ok'})
    } catch(error) {
        res.send({status: 'error' })
    }
    
}

const getDetails = async(req, res) => {
    const _id = req.body._id;
    try {
        const result = await User.findOne({_id: _id}, {_id: 0,username: 1, emailId: 1, num: 1});
        res.send({status: result});
    } catch(error) {
        res.send({status: 'error' })
    }
}
module.exports = {
    resetPassword,
    login,
    register,
    updateDetails,
    getDetails
}