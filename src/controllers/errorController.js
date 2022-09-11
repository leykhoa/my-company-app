exports.get404 = (req, res, next) => {
	res.status(404).render('404', {
		pageTitle: 'Page Not Found',
		path: '/404',
		user: req.user,
	});
};

exports.get500 = (req, res, next) => {
	res.status(500).render('500', {
		pageTitle: 'Access denied',
		path: '/500',
		user: req.user,
	});
};