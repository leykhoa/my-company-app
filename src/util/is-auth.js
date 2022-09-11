const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const token = req.headers.token;
	if (token) {
		const accessToken = token.split(' ')[1];
		return jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
			if (err) {
				return res
					.status(403)
					.json({ errorMessage: 'Token is not valid! Please login again!' });
			}
			req.user = user;
			return next();
		});
	}
	return res.status(401).json({ errorMessage: "You're not auth! Please login again!" });
};
