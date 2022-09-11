const fileHelper = require('../util/file');
const User = require('../models/user');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

class UserController {
	// [POST] /user/edit-image
	async postImage(req, res, next) {
		const userId = req.user._id;
		const image = req.file;
		if (!image) {
			return res.status(422).render('user', {
				user: req.user,
				path: '/user',
				pageTitle: 'User Infomation',
				errorMessage: 'Attached file is not an image!',
			});
		}
		const filePath = await User.findOne({ _id: userId }).then((user) => {
			return 'src/public' + user.imageUrl;
		});
		fileHelper.deleteFile(filePath);
		req.user.imageUrl = '/images/' + image.filename;
		return req.user
			.save()
			.then((user) => res.redirect('/user'))
			.catch((err) => {
				const error = new Error(err);
				error.httpStatusCode = 500;
				return next(error);
			});
	}

	// [GET] /user
	index(req, res, next) {
		const userId = req.user._id;
		User.find().then((users) => {
			if (userId) {
				const user = users.filter((user) => {
					const id = ObjectId(user._id).toString();
					return id === userId;
				});
				return res.json({ allUsers: users, user: user });
			}
			return res.json("You're not authenticated!");
		});
	}

	// [GET] /user/all-members
	allMembers(req, res, next) {
		User.find().then((users) => {
			console.log('check users', users);
			return res.json([...users]);
		});
	}
	async update(req, res, next) {
		const newUser = req.body;
		const userId = newUser._id;
		User.findOneAndUpdate(
			{ _id: userId },
			{ ...newUser },
			{
				new: true,
			},
		)
			.then((user) => {
				const { password, ...rest } = user._doc;
				return res.status(200).json({ ...rest, accessToken: newUser.accessToken });
			})
			.catch((err) => res.status(500));
	}
}
module.exports = new UserController();
